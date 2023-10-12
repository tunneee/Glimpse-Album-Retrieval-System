from sklearn.cluster import KMeans
import numpy as np

if __name__=="__main__":

    data_gps=open("res_gps.txt")
    gps_tuple=[]
    for line in data_gps:
        latitude, longitude=line.split()
        gps_tuple.append((float(latitude),float(longitude)))

    # Tạo một mảng numpy chứa các cặp vĩ độ và kinh độ của các điểm
    data_arr = np.array([(latitude, longitude) for (latitude, longitude) in gps_tuple])

    # Xác định số nhóm bạn muốn tạo (k)
    k = 3


    # Sử dụng thuật toán K-Means để nhóm các điểm
    kmeans = KMeans(n_clusters=k)
    kmeans.fit(data_arr)

    # Lấy nhãn của từng điểm, cho biết điểm thuộc nhóm nào
    labels = kmeans.labels_

    # Hiển thị nhãn cho từng điểm
    for i, label in enumerate(labels):
        print(f"Điểm {i + 1} thuộc nhóm {label}")