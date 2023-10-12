import os
import cv2



data_folder ="video"

for video_path in os.listdir(data_folder):
    # Noi full path
    video_path_full = os.path.join(data_folder, video_path)

    # Mở video
    cap = cv2.VideoCapture(video_path_full)

    # Số lượng khung hình trong video
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    # Đường dẫn đến thư mục lưu các khung hình
    output_folder = 'frames_input/'

    # Lặp qua từng khung hình và lưu chúng
    print("Processing...")
    for frame_number in range(frame_count):
        ret, frame = cap.read()
        if not ret:
            break
        frame_filename = f"{output_folder}{frame_number}.jpg"
        
        cv2.imwrite(frame_filename, frame)

    print("Done")
    # Đóng video
    cap.release()