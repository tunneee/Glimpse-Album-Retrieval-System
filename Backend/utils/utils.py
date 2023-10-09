import time

init_time = time.time()

import os

import cv2

import firebase_admin
from firebase_admin import credentials, storage

import warnings
import exiftool

import uuid

from BLIP.models.blip_itm import blip_itm

import torch
from torch import nn
import torch.nn.functional as F
from PIL import Image
import requests
from torchvision import transforms
from torchvision.transforms.functional import InterpolationMode


from BLIP.models.blip import create_vit, init_tokenizer, load_checkpoint

from BLIP.models.med import BertConfig, BertModel
from transformers import BertTokenizer

import numpy as np
from PIL import Image, ImageOps
import requests
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

from PIL import Image
from dateutil import parser
import datetime

from qdrant_client import QdrantClient
from qdrant_client.http import models

from tqdm.auto import tqdm

from key_frame_extraction import extracting_candidate_frames, clustering_with_hdbscan

from io import BytesIO

from hachoir.parser import createParser
from hachoir.metadata import extractMetadata

from config.configs import *
from config import qdrant_config

print(f"Time to import libraries: {time.time() - init_time} seconds")
inti_time = time.time()

curdir = os.getcwd()
exiftool.ExifTool(f'{curdir}/exiftool.exe')

model = blip_itm(pretrained=model_url, image_size=IMAGE_SIZE, vit='base')
model.eval()
model = model.to(device=device)

print(f"Time to load model: {time.time() - init_time} seconds")
inti_time = time.time()

client = QdrantClient(
    url=qdrant_config.url, 
    api_key=qdrant_config.api_key,
)

cred = credentials.Certificate("./config/firebase.json")
firebase_admin.initialize_app(cred, {'storageBucket': 'glimpse-compai.appspot.com'})

print(f"Time to initialize firebase: {time.time() - init_time} seconds")
inti_time = time.time()

vd = extracting_candidate_frames.FrameExtractor()

print(f"Time to initialize video frame extractor: {time.time() - init_time} seconds")

def create_collection(collection_name=collection_name, size=256):
    # Create collection with specified dimension
    #check if collection exists
    collections = client.get_collections()
    if collection_name in collections:
        print(f"Collection {collection_name} already exists")
        return
    else:
        client.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(size=size, distance=models.Distance.DOT)
        )
        print(f"Collection {collection_name} created")


def upload_file_to_firebase(local_path, filename, make_public=MAKE_FIREBASE_PUBLIC):
    # Reference to your Firebase Storage bucket
    bucket = storage.bucket()
    
    # Local path to the image file you want to upload
    local_image_path = os.path.join(local_path, filename)
    print(local_image_path)
    
    # Destination path in Firebase Storage (where you want to store the image)
    firebase_storage_path = f"images/{filename}"
    
    # Upload the image to Firebase Storage
    blob = bucket.blob(firebase_storage_path)
    blob.upload_from_filename(local_image_path)

    if make_public == True:
        blob.make_public()
    # Get the public URL of the uploaded file
    file_url = blob.public_url
    
    print("File uploaded to Firebase Storage and URL:", file_url)
    return file_url

from GPSPhoto import gpsphoto
# Get the data from image file and return a dictionary

def get_GPS_info(file_path):
    data = gpsphoto.getGPSData(file_path)
    # print(data)
    if 'Latitude' not in data or 'Longitude' not in data:
        return -1, {}
    return 1, {'lon': data['Longitude'], 'lat': data['Latitude']}
    # print(data['Latitude'], data['Longitude'])

def load_image_from_file(filepath, image_size, device):
    # img_url = 'https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/317750535_1448079772267900_6312352035179194879_n.jpg?stp=cp6_dst-jpg_p480x480&_nc_cat=110&ccb=1-7&_nc_sid=a3d323&_nc_ohc=ec7dNLVC4XsAX_TeDAT&_nc_ht=scontent.fdad3-1.fna&oh=00_AfCfjHRBjTPd3x_HraFkx1JDCggnLmxtfZYrZXOqdcedzA&oe=650A1209' 
    # img_url = 'https://static.scientificamerican.com/sciam/cache/file/9097719F-9951-42CC-AC84E68BFCB50358_source.jpg' 
    
    raw_image = Image.open(filepath).convert('RGB')   
    raw_image = ImageOps.exif_transpose(raw_image)

    transform = transforms.Compose([
        transforms.Resize((image_size,image_size),interpolation=InterpolationMode.BICUBIC),
        transforms.ToTensor(),
        transforms.Normalize((0.48145466, 0.4578275, 0.40821073), (0.26862954, 0.26130258, 0.27577711))
        ]) 
    image = transform(raw_image).unsqueeze(0).to(device)   
    return image

def get_img_embed_from_file(filepath, image_size = 384):
    image = load_image_from_file(filepath, image_size=IMAGE_SIZE,device=device)
    img_emb = model.get_img_emb(image)
    return img_emb[0]

def get_date_taken(path):
    exif = Image.open(path)._getexif()
    if not exif:
        return ''
        raise Exception('Image {0} does not have EXIF data.'.format(path))
    # return parser.parse(exif[36867]).timestamp()
    exif_time = exif.get(36867, -1)
    if exif_time == -1:
        return -1
    else:
        return datetime.datetime.strptime(exif[36867], '%Y:%m:%d %H:%M:%S').timestamp()
    
def upload_new_image_to_db(path, file):
    url = upload_file_to_firebase(path, file, make_public=True)
    abs_path = os.path.join(path, file)
    (_, GPS_info) = get_GPS_info(abs_path)
    date_time = get_date_taken(abs_path)
    emb_vec = get_img_embed_from_file(abs_path)
    client.upsert(
        collection_name=collection_name,
        points=[
            models.PointStruct(
                id=str(uuid.uuid4()),
                payload={
                    "filetype": 'image',
                    "timestamp": date_time,
                    "url": url,
                    "locations": GPS_info
                },
                vector=emb_vec,
            )
        ]
    )

def search_with_query(query):
    cap_emb = model.get_caption_emb(query, device)[0]
    res = client.search(
        collection_name=collection_name,
        query_vector=cap_emb,
        limit=3
    )
    return res
    
def upload_keyframe_to_firebase(file, filename, make_public=MAKE_FIREBASE_PUBLIC):
    # Reference to your Firebase Storage bucket
    bucket = storage.bucket()
    
    # Destination path in Firebase Storage (where you want to store the image)
    firebase_storage_path = f"keyframes/{filename}"
    
    # Upload the image to Firebase Storage
    image = Image.fromarray(file.astype('uint8'))
    image_stream = BytesIO()
    image.save(image_stream, format='JPEG')
    image_stream.seek(0)
    
    blob = bucket.blob(firebase_storage_path)
    blob.upload_from_file(image_stream, content_type='image/jpg')

    if make_public == True:
        blob.make_public()
    # Get the public URL of the uploaded file
    file_url = blob.public_url
    
    print("File uploaded to Firebase Storage and URL:", file_url)
    image_stream.close()
    return file_url

def get_keyframe_embedding(keyframe, device, image_size = 384):
    # raw_image = Image.fromarray(keyframe).convert('RGB')   
    raw_image = Image.fromarray(keyframe)

    transform = transforms.Compose([
        transforms.Resize((image_size,image_size),interpolation=InterpolationMode.BICUBIC),
        transforms.ToTensor(),
        transforms.Normalize((0.48145466, 0.4578275, 0.40821073), (0.26862954, 0.26130258, 0.27577711))
        ]) 
    image = transform(raw_image).unsqueeze(0).to(device)   

    img_emb = model.get_img_emb(image)
    return img_emb[0]

def generate_keyframes_and_upload_to_db(path, filename, vid_id, vid_url, framerate, geo_location={}):
    imgs, frame_indexes=vd.extract_candidate_frames(os.path.join(path, filename))
    final_images= clustering_with_hdbscan.ImageSelector()
    imgs_final, selected_images_index = final_images.select_best_frames(imgs)
    selected_frames = frame_indexes[selected_images_index]
    keyframes_url = []
    keyframes_uuid = []
    
    for idx, image in enumerate(imgs_final):
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        keyframe_uuid = str(uuid.uuid4())
        keyframe_filename = f"{'.'.join(filename.split('.')[:-1])}_{selected_frames[idx]}.jpg"
        print(keyframe_filename)
        url = upload_keyframe_to_firebase(image, keyframe_filename, make_public=True)

        # Create embedding for each keyframes
        emb_vec =  get_keyframe_embedding(image, device)
        
        client.upsert(
            collection_name=collection_name,
            points=[
                models.PointStruct(
                    id= keyframe_uuid,
                    payload={
                        "filetype": 'keyframe',
                        "url": url,
                        "fps": framerate,
                        "video_id": vid_id,
                        "video_url": vid_url,
                        "locations": geo_location
                    },
                    vector=emb_vec,
                )
            ],
            
        )
        
        keyframes_url.append(url)
        keyframes_uuid.append(keyframe_uuid)
    return keyframes_url, keyframes_uuid

def upload_video_to_firebase(local_path, filename, make_public=MAKE_FIREBASE_PUBLIC):
    # Reference to your Firebase Storage bucket
    bucket = storage.bucket()
    
    # Local path to the image file you want to upload
    local_image_path = os.path.join(local_path, filename)
    print(local_image_path)
    
    # Destination path in Firebase Storage (where you want to store the image)
    firebase_storage_path = f"videos/{filename}"
    
    # Upload the image to Firebase Storage
    blob = bucket.blob(firebase_storage_path)
    blob.upload_from_filename(local_image_path)

    
    
    if make_public == True:
        blob.make_public()
    # Get the public URL of the uploaded file
    file_url = blob.public_url
    
    print("File uploaded to Firebase Storage and URL:", file_url)
    return file_url

def get_video_date_taken(filename):
    parser = createParser(filename)
    metadata = extractMetadata(parser)
    return metadata.get('creation_date').timestamp()

def get_video_gps_info(video_file):
    with exiftool.ExifToolHelper() as et:
        metadata = et.get_metadata(video_file)
        gps_info = {
            "lat": metadata[0]["Composite:GPSLatitude"],
            "lon": metadata[0]["Composite:GPSLongitude"],
        }
        return gps_info

def upload_new_videos_to_db(path, file):
    url = upload_video_to_firebase(path, file, make_public=True)
    abs_path = os.path.join(path, file)
    vid_id = str(uuid.uuid4())
    date_time = get_video_date_taken(abs_path)
    geo_location = {}
    try:
        geo_location=get_video_gps_info(abs_path)
    except:
        print("exiftool not installed or video has no gps info. Please check https://exiftool.org/ for installation instructions")
        warnings.warn("exiftool not installed or video has no gps info. Please check https://exiftool.org/ for installation instructions", DeprecationWarning)

    vidcap = cv2.VideoCapture(abs_path)
    fps = vidcap.get(cv2.CAP_PROP_FPS)
    keyframes_url, keyframes_uuid = generate_keyframes_and_upload_to_db(path, file, vid_id, url, fps, geo_location)
    client.upsert(
        collection_name=collection_name,
        points=[
            models.PointStruct(
                id= vid_id,
                payload={
                    "filetype": 'video',
                    "timestamp": date_time,
                    "fps": fps,
                    "url": url,
                    "keyframes_uuid": keyframes_uuid,
                    "keyframes_url": keyframes_url,
                    "locations": geo_location
                },
                vector=np.zeros((256)) # These are placeholder vectors since we don't have real vectors
            )
        ]        
    )