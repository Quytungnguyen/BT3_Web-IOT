# BT3_Web-IOT
1. Cài đặt môi trường linux: SV chọn 1 trong các phương án
 - enable wsl: cài đặt ubuntu
<img width="611" height="103" alt="image" src="https://github.com/user-attachments/assets/47de4f8a-367d-4124-b02c-d7218959fa5b" />

 
Cài đặt môi trường 
Đặt tên cho môi trường 
 
<img width="864" height="465" alt="image" src="https://github.com/user-attachments/assets/8ac4b2b7-6056-4da1-b082-31dd6954bd94" />



























Cài cho ubuntu
 <img width="864" height="609" alt="image" src="https://github.com/user-attachments/assets/ad15ce48-98ec-4391-b362-0d4553296847" />





2. Cài đặt Docker (nếu dùng docker desktop trên windows thì nó có ngay)
Cài Docker 
 <img width="964" height="508" alt="image" src="https://github.com/user-attachments/assets/1324bb13-daaa-426a-811a-2327fe3df627" />



3. Sử dụng 1 file docker-compose.yml để cài đặt các docker container sau: 
   mariadb (3306), phpmyadmin (8080), nodered/node-red (1880), influxdb (8086), grafana/grafana (3000), nginx (80,443)

Cấu trúc các file, cho docker-compose.yml để khởi chạy các container trong file yml
 <img width="865" height="297" alt="image" src="https://github.com/user-attachments/assets/bdbd4e95-27c4-4bbd-80a5-c1790a4aebf6" />


Để làm gì :
· docker-compose.yml định nghĩa dịch vụ nào chạy (nginx, grafana, phpmyadmin, v.v.)
· nginx/conf.d/default.conf định nghĩa nginx phục vụ nội dung gì và route request đi đâu








4. Lập trình web frontend+backend:
 SV chọn 1 trong các web sau:
  4.2 Web IOT: Giám sát dữ liệu IOT.
 - Tạo web dạng Single Page Application (SPA), chỉ gồm 1 file index.html, toàn bộ giao diện do javascript sinh động.
 <img width="864" height="100" alt="image" src="https://github.com/user-attachments/assets/bbffcd13-c3ce-4417-b12b-a2b0801d2e2f" />

 - Có tính năng login, lưu phiên đăng nhập vào cookie và session

   Thông tin login lưu trong cơ sở dữ liệu của mariadb, được dev quản trị bằng phpmyadmin, yêu cầu sử dụng mã hoá khi gửi login.
   Chỉ cần login 1 lần, bao giờ logout thì mới phải login lại.









 - hiển thị giá trị mới nhất của các thông số đang giám sát, khi click vào thì hiển thị đồ thị lịch sử quá trình thay đổi (gọi grafana iframe để hiển thị)
 
<img width="864" height="968" alt="image" src="https://github.com/user-attachments/assets/09b72efa-83a7-4957-b93d-b65f0a1ccd7a" />






 - backend: Sử dụng nodered để đọc dữ liệu từ các cảm biến (có thể dùng api online để lấy dữ liệu theo giời gian thực), 
   nodered sẽ lưu dữ liệu mới nhất (dạng update) vào cơ sở dữ liệu mariadb (sử dụng phpmyadmin để tạp table và quản trị lần đầu)
<img width="864" height="398" alt="image" src="https://github.com/user-attachments/assets/cb68e779-1cb9-46e7-a4de-6ef3d372868e" />

 
   nodered sẽ lưu dữ liệu (insert) vào influxdb để lưu giá trị lịch sử, để cho grafana dùng để hiển thị biểu đồ
msg.topic = "SELECT * FROM sensor_data ORDER BY id DESC LIMIT 1";
return msg;
 <img width="864" height="74" alt="image" src="https://github.com/user-attachments/assets/2bb79238-31a9-4172-9d62-02b09bf21369" />









5. Nginx làm web-server
 - Cấu hình nginx để chạy được website qua url http://fullname.com  (thay fullname bằng chuỗi ko dấu viết liền tên của bạn)
 <img width="865" height="146" alt="image" src="https://github.com/user-attachments/assets/6c51b216-664f-4c1f-ab3c-bf2da107323b" />

 - Cấu hình nginx để http://fullname.com/nodered truy cập vào nodered qua cổng 80, (dù nodered đang chạy ở port 1880)
 <img width="865" height="283" alt="image" src="https://github.com/user-attachments/assets/7dc3c22f-c1ef-45df-8580-a686025f2314" />

 - Cấu hình nginx để http://fullname.com/grafana truy cập vào grafana qua cổng 80, (dù grafana đang chạy ở port 3000)
 <img width="865" height="321" alt="image" src="https://github.com/user-attachments/assets/a496b25b-9fef-4fa7-beb4-be299fc2581f" />

Cấu hình để chạy được với host riêng 
 
<img width="865" height="450" alt="image" src="https://github.com/user-attachments/assets/021bad05-e1fa-42f9-b778-fe1fad4758f4" />


















Cấu hình cho myphp
 <img width="864" height="963" alt="image" src="https://github.com/user-attachments/assets/18723463-e621-450e-a891-bcc98f421709" />


Thành phần	Vai trò	Cổng
Node-RED backend	API xử lý và truy xuất dữ liệu IoT (MySQL + InfluxDB)	8087
Web Frontend (index.html)	SPA hiển thị dữ liệu và login	8088 (Nginx phục vụ)
MariaDB (phpMyAdmin quản lý)	Lưu thông tin login và giá trị mới nhất	3306
InfluxDB	Lưu dữ liệu lịch sử	8086
Grafana	Hiển thị biểu đồ (iframe)	3000


CHẠY
<img width="576" height="585" alt="image" src="https://github.com/user-attachments/assets/87fb87fb-f4ea-45d2-a2b3-e6c8b035f019" />

Ok chạy  
 <img width="865" height="748" alt="image" src="https://github.com/user-attachments/assets/b490d24d-1847-4513-b629-3128da4e7d73" />




Các kết quả nhận được 

Insert 5s data liên tục 
 <img width="864" height="286" alt="image" src="https://github.com/user-attachments/assets/415cba4c-9847-4680-b3ad-2299e4e779d5" />


 
