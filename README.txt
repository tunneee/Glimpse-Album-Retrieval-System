Folder gồm 2 phần: Chuyển video sang frame và xử lý frames tìm các frames "tiêu biểu"

I/Chuyển video sang frame
	Input: Các video được lưu trong folder video
	Output: Toàn bộ frame của các video( Nếu anh muốn nó được chia theo từng video thì anh có thể thêm) được lưu trong frames_input(là input của phần II)

II/Xử lý frames tìm các frames tiêu biểu:
	1/ dataset( các frame được tách từ video) sẽ được lưu vào "frames_input"
	2/ Chạy file theo thứ tự store_vector.py -> mark_img.py
	3/ Kết quả ( Các frame "tiêu biểu") sẽ được lưu vào result_frames

	**************************
		+store_vector.py: Vector hóa các frame từ frames_input thành vector được lưu vào vectors.pkl và path của farme đó được lưu trong paths.pkl

		+mark_input.py: Dùng dictionary có key là tên của frame 
			Dùng kĩ thuật mảng đánh dấu vào dictionary trên để đánh dấu, tạo value là 0 hoặc 1 (0 nếu frame là frame "tiêu biểu")

			-> Độ phức tạp của phương pháp này là O(n^2)