import os
import shutil


from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from tensorflow.keras.models import Model

from PIL import Image
import pickle
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity
# Ham tao model

def get_extract_model():
    vgg16_model = VGG16(weights="imagenet")
    extract_model = Model(inputs= vgg16_model.input, outputs = vgg16_model.get_layer("fc1").output)
    return extract_model

# Ham tien xu ly, chuyen doi hinh anh thanh tensor

def image_preprocess(img):
    img = img.resize((224,224))
    img = img.convert("RGB")
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis = 0)
    x = preprocess_input(x)
    return x

def extract_vector(model, image_path):
    print("Xu ly: ", image_path)
    img = Image.open(image_path)
    img_tensor = image_preprocess(img)

    #Trich dac trung
    vector = model.predict(img_tensor)[0]

    #Chuan hoa vector = chia cho L2 norm
    vector= vector/np.linalg.norm(vector)

    return vector

def processing_img_search(search_image_path):

    #Khoi tao model
    model = get_extract_model()

    #Trich dac trung cua anh can tim kiem
    search_vector = extract_vector(model, search_image_path)

    return search_vector

if "__main__"==__name__:

    #Load all vector tu vectors.pkl ra bien
    vectors = pickle.load(open("vectors.pkl","rb"))
    paths = pickle.load(open("paths.pkl","rb"))

    dic={}
    mark_path = []
    for i in range(len(paths)):
        index=paths[i].split("\\")[-1].split('.')[0]
        dic[index]=dic.get(index,0)
        mark_path.append(index)

    threshold = 0.9

    for i in range(len(paths)-1):
        if  dic[mark_path[i]] == 0:
            search_vector= vectors[i]

            # Tinh khoang cach tu anh thu i va cac anh con lai
            cosine_sim = cosine_similarity([search_vector], vectors)    
            distance = cosine_sim[0]
            # Xét khoảng cách từ ảnh thư i đến các ảnh còn lại, nếu độ giống nhau ()
            for j in range(i+1, len(paths)):
                if distance[j] >= threshold:
                    dic[mark_path[j]]=1
    
    # Kiểm tra nếu thư mục đích không tồn tại, thì tạo nó
    if not os.path.exists("result_frame"):
        os.mkdir("result_frame")

    
    for i in range(len(paths)):
        if dic[mark_path[i]]==0:
            shutil.copy(paths[i],"result_frame")
    
        





