# BT3_Web-IOT
1. Cài đặt môi trường linux: SV chọn 1 trong các phương án
 - enable wsl: cài đặt ubuntu

 
Cài đặt môi trường 
Đặt tên cho môi trường 
 



























Cài cho ubuntu
 




2. Cài đặt Docker (nếu dùng docker desktop trên windows thì nó có ngay)
Cài Docker 
 


3. Sử dụng 1 file docker-compose.yml để cài đặt các docker container sau: 
   mariadb (3306), phpmyadmin (8080), nodered/node-red (1880), influxdb (8086), grafana/grafana (3000), nginx (80,443)

Cấu trúc các file, cho docker-compose.yml để khởi chạy các container trong file yml
 

Để làm gì :
· docker-compose.yml định nghĩa dịch vụ nào chạy (nginx, grafana, phpmyadmin, v.v.)
· nginx/conf.d/default.conf định nghĩa nginx phục vụ nội dung gì và route request đi đâu








4. Lập trình web frontend+backend:
 SV chọn 1 trong các web sau:
  4.2 Web IOT: Giám sát dữ liệu IOT.
 - Tạo web dạng Single Page Application (SPA), chỉ gồm 1 file index.html, toàn bộ giao diện do javascript sinh động.
 
 - Có tính năng login, lưu phiên đăng nhập vào cookie và session

   Thông tin login lưu trong cơ sở dữ liệu của mariadb, được dev quản trị bằng phpmyadmin, yêu cầu sử dụng mã hoá khi gửi login.
   Chỉ cần login 1 lần, bao giờ logout thì mới phải login lại.









 - hiển thị giá trị mới nhất của các thông số đang giám sát, khi click vào thì hiển thị đồ thị lịch sử quá trình thay đổi (gọi grafana iframe để hiển thị)
 






 - backend: Sử dụng nodered để đọc dữ liệu từ các cảm biến (có thể dùng api online để lấy dữ liệu theo giời gian thực), 
   nodered sẽ lưu dữ liệu mới nhất (dạng update) vào cơ sở dữ liệu mariadb (sử dụng phpmyadmin để tạp table và quản trị lần đầu)

 
   nodered sẽ lưu dữ liệu (insert) vào influxdb để lưu giá trị lịch sử, để cho grafana dùng để hiển thị biểu đồ
msg.topic = "SELECT * FROM sensor_data ORDER BY id DESC LIMIT 1";
return msg;
 








5. Nginx làm web-server
 - Cấu hình nginx để chạy được website qua url http://fullname.com  (thay fullname bằng chuỗi ko dấu viết liền tên của bạn)
 
 - Cấu hình nginx để http://fullname.com/nodered truy cập vào nodered qua cổng 80, (dù nodered đang chạy ở port 1880)
 
 - Cấu hình nginx để http://fullname.com/grafana truy cập vào grafana qua cổng 80, (dù grafana đang chạy ở port 3000)
 
Cấu hình để chạy được với host riêng 
 


















Cấu hình cho myphp
 

Thành phần	Vai trò	Cổng
Node-RED backend	API xử lý và truy xuất dữ liệu IoT (MySQL + InfluxDB)	8087
Web Frontend (index.html)	SPA hiển thị dữ liệu và login	8088 (Nginx phục vụ)
MariaDB (phpMyAdmin quản lý)	Lưu thông tin login và giá trị mới nhất	3306
InfluxDB	Lưu dữ liệu lịch sử	8086
Grafana	Hiển thị biểu đồ (iframe)	3000


CHẠY

Ok chạy  
 



Các kết quả nhận được 

Insert 5s data liên tục 
 

 
