# Import necessary libraries
import math
import numpy as np
import uuid
from PIL import Image, ImageOps
from scipy.spatial import distance
from mtcnn import MTCNN
import requests
from tqdm import tqdm
from keras_facenet import FaceNet

# Import functions and classes from other modules
from firebase_uploadfile import upload_file_to_firebase
from qdrant_client import QdrantClient, models
from config.qdrant_config import url, api_key, collection_name, face_collection_name
from tensorflow.python.framework.errors_impl import ResourceExhaustedError

# Initialize MTCNN face detection, FaceNet embedding, and Qdrant client
detector = MTCNN()
embedder = FaceNet()
client = QdrantClient(url=url, prefer_grpc=True, api_key=api_key)

ENDPOINT = {
    'image': 'https://ik.imagekit.io/tunne/images',
    'keyframe': 'https://ik.imagekit.io/tunne/keyframes',
    'video': 'https://ik.imagekit.io/tunne/videos'
}


# Function to detect faces, embed them, and update databases
def detect_faces_embed_update(id_url):
    img_id = id_url[0]
    img_url = id_url[1]
    img = load_img_from_url(img_url)
    raw_image = Image.fromarray(np.array(img))
    detections = detector.detect_faces(img=np.array(img))
    num_faces = len(detections)  # Get the number of detected faces
    face_data_list = []
    if num_faces == 0:
        face_ids = dict()
        client.set_payload(
            collection_name=collection_name,
            payload={
                'face_id': face_ids,
            },
            points=[str(img_id)],
        )
        print("Update face_id to glimpseDB")
    # Iterate through detected faces
    for i, detection in enumerate(detections):
        score = detection["confidence"]
        if score > 0.95:
            x, y, w, h = detection["box"]
            width, height = raw_image.size
            bbox = [width, height, x, y, w, h]
            detected_face = img.crop((int(x), int(y), int(x+w), int(y+h)))
            # Get facial keypoints
            keypoints = detection["keypoints"]
            left_eye = keypoints["left_eye"]
            right_eye = keypoints["right_eye"]

            # Calculate Yolo bbox 
            yolo_bbox = calculate_yolo_bbox(bbox)

            # Align the face
            aligned_face = alignment_procedure(detected_face, left_eye, right_eye)
            #embedded_face = face_embedding(Image.fromarray(aligned_face))
            embedded_face = embedder.embeddings(np.expand_dims(aligned_face, axis=0))[0]
            # Compare the face with the database
            res = get_cp_data(face_collection_name, embedded_face, 1, 0.95)
            
            
            if res:                # If the face is in the database, update the face_id to glimpseDB
                res = dict(res[0])
                id = res['id']
                id_list = []
                id_list.append(img_id)
                client.set_payload(
                    collection_name=face_collection_name,
                    payload={
                        'image': id_list,
                        'Image URL': img_url,
                    },
                    points=[str(id)],
                )
                print(f'Update New Image_ID {img_id} to FaceDB at point: {id}')

   
            elif not res:            # If not, add new face to faceDB 
                face_id = str(uuid.uuid4())
                face_url = upload_file_to_firebase(np.array(detected_face), face_id)
                face_data = {
                    'face_id': face_id,
                    'bbox': yolo_bbox,
                }
                face_data_list.append(face_data)
                client.upsert(
                        collection_name=face_collection_name,
                        points=[
                            models.PointStruct(
                                    id=str(face_id),
                                    payload={"name": '',
                                            "image_uuid": [img_id],
                                            "image_url": [img_url],
                                            "url": face_url},
                                    vector=embedded_face,
                            ),
                        ],
                    )
                print(f'Add Image_ID: {img_id} to FaceDB at New Point: {face_id}')

                # update face_id to glimpseDB
                client.set_payload(
                collection_name=collection_name,
                payload={
                    'face_id': face_data_list,
                },
                points=[str(img_id)],
                )
                
                print(f'Update Face_ID: {face_id} to GlimpseDB at Point: {img_id}')

# Function to embed the face
def embed_face(img):
    return embedder.embeddings(np.expand_dims(img, axis=0))[0]

# Function to calculate YOLO-style bounding box
def calculate_yolo_bbox(bbox):
    width, height, x, y, w, h = bbox
    x_center = x + (w / 2)
    y_center = y + (h / 2)

    x_yolo = x_center / width
    y_yolo = y_center / height
    w_yolo = w / width
    h_yolo = h / height

    return [x_yolo, y_yolo, w_yolo, h_yolo]

# Function to align the face based on eye positions
def alignment_procedure(img, left_eye, right_eye):
    left_eye_x, left_eye_y = left_eye
    right_eye_x, right_eye_y = right_eye
    
    if left_eye_y > right_eye_y:
        point_3rd = (right_eye_x, left_eye_y)
        direction = -1
    else:
        point_3rd = (left_eye_x, right_eye_y)
        direction = 1
    
    a = distance.euclidean(np.array(left_eye), np.array(point_3rd))
    b = distance.euclidean(np.array(right_eye), np.array(point_3rd))
    c = distance.euclidean(np.array(right_eye), np.array(left_eye))
    
    if b != 0 and c != 0:
        cos_a = (b*b + c*c - a*a)/(2*b*c)
        angle = np.arccos(cos_a)
        angle = (angle * 180) / math.pi
        
        if direction == -1:
            angle = 90 - angle
        img_size = img.size
        width, height = img_size
        width = width * 0.7
        height = height * 0.7
        img = img.resize((int(width), int(height)), Image.LANCZOS)
        img = Image.fromarray(np.uint8(img))
        img = np.array(img.rotate(direction * angle))

    return img
def return_thumbnail_url(url, filetype, url_endpoints):
    '''
    url: firebase url
    filetype: [image, keyframe]
    '''
    assert filetype in ['image', 'keyframe', 'video']

    filename = url.split('/')[-1]
    thumbnail_url = ''
        
    if filetype == 'image':
        thumbnail_url += url_endpoints['image'] + '/' + filename 
    if filetype == 'keyframe':
        thumbnail_url += url_endpoints['keyframe'] + '/' + filename 
    if filetype == 'video':
        thumbnail_url += url_endpoints['video'] + '/' + filename
    return thumbnail_url
# Function to load an image from a URL
def load_img_from_url(img_url):
    img_url = return_thumbnail_url(img_url, 'image', ENDPOINT)
    raw_image = Image.open(requests.get(img_url, stream=True).raw).convert('RGB')   
    raw_image = ImageOps.exif_transpose(raw_image)
    return raw_image

# Function to retrieve similar faces from the database
def get_cp_data(colection_name, query_vector, limit, score_threshold):
    res = client.search(
        collection_name=colection_name,
        query_vector=query_vector,
        limit=limit,
        score_threshold=score_threshold
    )
    return res

# Function to create a collection
def create_collection(collection_name, size):
    # Create collection with specified dimension
    #check if collection exists
    collections = client.get_collections()
    if collection_name in collections:
        print(f"Collection {collection_name} already exists")
        return
    else:
        client.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(size=size, distance=models.Distance.COSINE)
        )
        print(f"Collection {collection_name} created")

# Function to delete a collection
def delete_collection(collection_name):
    # Delete collection
    client.delete_collection(collection_name=collection_name)
    print(f"Collection {collection_name} deleted")

# Function to get id and url of each point
def get_id_url(all_points):
    id_url = []
    for res in all_points:
        url = dict(res)['payload']['url']
        id = dict(res)['id']
        id_url.append([id,url])
    return id_url


# Function to get all id and url
def get_all_id_url(fist_point_ID, colection_name, limit_point):
    all_id_url = []
    res = client.scroll(
                offset= fist_point_ID,
                collection_name=colection_name, 
                scroll_filter=models.Filter(
                    must=[
                        models.FieldCondition(
                            key="filetype", 
                            match=models.MatchAny(any=['image', 'keyframe'])
                        ),
                    ]
                ),
                limit=limit_point,
                with_payload=True,
                with_vectors=False,
        )
    next_offset = res[1]
    all_id_url.extend(res[0])
    print(f"Crawled {len(all_id_url)} points of {colection_name}")
    return all_id_url, next_offset

# Function to update name in FaceDB
def update_name(uuid, name):
    client.set_payload(
        collection_name=face_collection_name,
        payload={
            'name': name,
        },
        points=[str(uuid)],
    )
    print(f"Update name: {name} to FaceDB at point: {uuid}")

# Function to process all images in a collection
def recursive_for_loop(all_id_url, next_offset):
    id_urls = get_id_url(all_id_url)

    for id_url in tqdm(id_urls):
        try:
            print(f"Processing Image_ID: {id_url[0]} ")
            detect_faces_embed_update(id_url)
            print(f"Completed processing Image_ID: {id_url[0]} ")
            print('--------------------------------------------------------------------------------')
        except ResourceExhaustedError: 
            # Log the error and skip the file
            print(f"Failed to process Image_ID: {id_url[0]} due to ResourceExhaustedError")

    # Recursively call the function with the next_offset value
    if next_offset:
        recursive_for_loop(all_id_url, next_offset)