from PIL import Image
from io import BytesIO
from firebase_admin import credentials, initialize_app, storage
# Init firebase with your credentials
cred = credentials.Certificate("fdetest-691a0-firebase-adminsdk-q5msf-edba472ace.json")
initialize_app(cred, {'storageBucket': 'fdetest-691a0.appspot.com'})

def upload_file_to_firebase(file, filename, is_public=True):
    filename = filename + ".jpg"
    bucket = storage.bucket()
    firebase_storage_path = f"images/{filename}"

    image = Image.fromarray(file.astype('uint8'))
    image_stream = BytesIO()
    image.save(image_stream, format='JPEG')
    image_stream.seek(0)
    
    blob = bucket.blob(firebase_storage_path)
    blob.upload_from_file(image_stream, content_type='image/jpg')

    blob.make_public()

    if is_public:
        file_url = blob.public_url
    
    # print("File uploaded to Firebase Storage and URL:", file_url)

    image_stream.close()
    return file_url
