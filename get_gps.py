import os
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS


# Chức năng này sẽ chuyển mã số của Tag thành tên của Tag
def get_tag_name(tag):
    return TAGS.get(tag, tag)

# Chức năng này sẽ chuyển mã số của Tag GPS thành tên của Tag
def get_gps_tag_name(tag):
    return GPSTAGS.get(tag, tag)

def get_gps_to_tuple(image_path):
    # Mở ảnh
    image = Image.open(image_path)

    # Lấy dữ liệu EXIF
    exif_data = image._getexif()

    # Kiểm tra xem có thông tin GPS trong EXIF không
    try:
        if 0x8825 in exif_data:

            gps_info = exif_data[0x8825]

            latitude = None
            longitude = None

            if 0x1 in gps_info and 0x2 in gps_info and 0x3 in gps_info and 0x4 in gps_info:
                latitude = float(gps_info[0x2][0] + gps_info[0x2][1]/60 + gps_info[0x2][2]/3600 )
                longitude = float(gps_info[0x4][0] + gps_info[0x4][1]/60 + gps_info[0x4][2]/3600)

                lat_ref = gps_info[0x1]
                lon_ref = gps_info[0x3]

                if lat_ref == 'S':
                    latitude = -latitude
                if lon_ref == 'W':
                    longitude = -longitude

            # In tọa độ nếu có
            if latitude is not None and longitude is not None:
                return (latitude,longitude)
            else:
                return 
                
        else:
            return 
    except:
        return
    

if __name__=="__main__":

    # Đường dẫn đến thư mục chứa ảnh
    folder_path = 'Album_data'

    lst_gps=[]
    # Duyệt qua tất cả các tệp trong thư mục
    for filename in os.listdir(folder_path):
        if filename.endswith(('.jpg', '.jpeg', '.png','.JPEG','.JPG','.PNG')):  # Chỉ xử lý các tệp ảnh
            image_path = os.path.join(folder_path, filename)
            lst_gps.append(get_gps_to_tuple(image_path))
    
    res_gps_file=open("res_gps.txt", "wt")
    for element in lst_gps:
        if element is not None:
            res=str(element[0])+" "+str(element[1])+"\n"
            res_gps_file.write(res)
    res_gps_file.close()

    

