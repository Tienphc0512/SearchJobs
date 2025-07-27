data = [
    # --- Part‑time ---
    ("Làm theo ca linh hoạt", "part-time"),
    ("Cần việc buổi tối 4 tiếng", "part-time"),
    ("Tìm việc thứ 7 chủ nhật", "part-time"),
    ("Phục vụ quán ăn part-time", "part-time"),
    ("Làm bảo vệ ca tối", "part-time"),
    ("Tìm việc bán hàng buổi chiều", "part-time"),

    # --- Remote ---
    ("Viết content tại nhà", "remote"),
    ("Vẽ truyện - Thiết kế đồ họa", "remote"),
    ("Ghi âm giọng nói quảng cáo", "remote"),
    ("Thiết kế banner freelance", "remote"),
    ("Chỉnh sửa video online", "remote"),
    ("Tư vấn tâm lý từ xa", "remote"),

    # --- Việc vặt ---
    ("Giúp việc nhà theo giờ", "việc vặt"),
    ("Thuê người chạy bàn 1 buổi", "việc vặt"),
    ("Mang đồ đi giặt ủi quần áo theo kg", "việc vặt"),
    ("Rửa bát tại nhà hàng", "việc vặt"),
    ("Giao quà sinh nhật", "việc vặt"),

    # --- Full‑time ---
    ("Tuyển dụng nhân viên văn phòng hành chính", "full-time"),
    ("Ứng tuyển vị trí developer 8 tiếng/ngày", "full-time"),
    ("Cần kỹ sư xây dựng làm toàn thời gian", "full-time"),
    ("Tìm việc 8 tiếng/ngày tại công ty", "full-time"),
    ("Tuyển kế toán full-time", "full-time"),

    # --- Giao hàng (delivery) ---
    ("Tìm việc giao hàng part-time", "delivery"),
    ("Cần làm shipper buổi tối", "delivery"),
    ("Giao đồ ăn 4h/ngày", "delivery"),
    ("Shipper ô tô ban đêm", "delivery"),
    ("Giao hàng siêu tốc buổi sáng", "delivery"),
    ("Chạy grab giao đồ", "delivery"),

    # --- Gia sư (tutor) ---
    ("Cần tìm việc dạy Toán", "tutor"),
    ("Gia sư tiếng Anh buổi tối", "tutor"),
    ("Dạy kèm online", "tutor"),
    ("Tôi muốn dạy cấp 1 Toán và Tiếng Việt", "tutor"),
    ("Nhận dạy tại nhà buổi tối", "tutor"),

    # --- IT ---
    ("Cần dev part-time", "it"),
    ("Lập trình web tại nhà", "it"),
    ("Làm app mobile freelance", "it"),
    ("Xử lý dữ liệu part-time", "it"),
    ("Train AI model freelance", "it"),
    ("Backend developer cần việc", "it"),
    ("Cần dự án ReactJS làm freelance", "it"),
    ("Tester cho dự án game", "it"),

    # --- Sales ---
    ("Tuyển nhân viên bán quần áo", "sales"),
    ("Bán điện thoại part-time", "sales"),
    ("Trực shop online", "sales"),
    ("Bán hàng tại siêu thị", "sales"),
    ("Livestream bán mỹ phẩm", "sales"),

    # --- Xây dựng ---
    ("Cần thợ phụ xây", "construction"),
    ("Làm công trình thứ 7", "construction"),
    ("Thợ điện nước part-time", "construction"),
    ("Thợ sơn nhà theo mét vuông", "construction"),
    ("Lắp đặt cửa cuốn", "construction"),
    ("Xây nhà phần thô", "construction"),

    # --- Văn phòng ---
    ("Kế toán thực tập", "office"),
    ("Nhập liệu tại nhà", "office"),
    ("Tuyển thư ký 4h/ngày", "office"),
    ("Trợ lý hành chính", "office"),
    ("Soạn thảo văn bản part-time", "office"),

    # --- Công việc vặt (odd jobs) ---
    ("Cần người chạy sự kiện 2 ngày", ("part-time", "odd_jobs")),
    ("Cần người dọn nhà cuối tuần", ("part-time", "odd_jobs")),
    ("Tìm người bê đồ lên tầng", ("part-time", "odd_jobs")),
    ("Thuê người lau nhà", ("part-time", "odd_jobs")),
    ("Cần thợ sửa ống nước nhỏ", ("part-time", "odd_jobs")),
    ("Tìm người đóng gói đồ", ("part-time", "odd_jobs")),
    ("Cần người trông trẻ 3 tiếng", ("part-time", "odd_jobs")),
    ("Thuê người chuyển nhà", ("part-time", "odd_jobs")),
    ("Gắn bóng đèn giúp", ("part-time", "odd_jobs")),
    ("Sửa bếp gas mini", ("part-time", "odd_jobs")),
    ("Xách đồ phụ", ("part-time", "odd_jobs")),
    ("Tôi muốn làm việc nhà 1 ngày", ("part-time", "odd_jobs")),
    ("Cần người phụ bê đồ 2 ngày", ("part-time", "odd_jobs")),
    ("Tôi có thể giúp chạy sự kiện", ("part-time", "odd_jobs")),
    ("Có công việc vặt nào không?", ("part-time", "odd_jobs")),
    ("Tôi muốn tìm việc vặt linh hoạt", ("part-time", "odd_jobs")),
    ("Tôi muốn làm việc vặt khoảng 1-2 ngày", ("part-time", "odd_jobs")),
    ("Làm sự kiện 1 tuần", ("part-time", "odd_jobs")),
    ("Phụ bưng bê 1 ngày", ("part-time", "odd_jobs")),
    ("Giúp việc theo giờ", ("part-time", "odd_jobs")),
    ("Tôi muốn việc gì đó làm 3-4 ngày", ("part-time", "odd_jobs")),

    # --- Remote _ IT ---
    ("Tôi có bằng CNTT muốn làm từ xa", ("remote", "it")),
    ("Làm backend ở nhà", ("remote", "it")),
    ("Nhận freelance lập trình React", ("remote", "it")),
    ("Viết phần mềm quản lý từ xa", ("remote", "it")),

    # --- Remote _ Design ---
    ("Tôi có bằng đh thiết kế đồ họa cần việc remote", ("remote", "design")),
    ("Thiết kế logo tại nhà", ("remote", "design")),
    ("Freelancer thiết kế banner online", ("remote", "design")),

    # --- Time‑specific (part‑time) ---
    ("Tôi rảnh 2 4 6 buổi tối", ("part-time", "time_specific")),
    ("Chỉ đi làm thứ 3 và thứ 5", ("part-time", "time_specific")),
    ("Có thể làm từ 6h đến 9h tối", ("part-time", "time_specific")),
    ("Rảnh cuối tuần", ("part-time", "time_specific")),

    # --- Admin Commands ---
    ("Bài post nào đã hoàn thành rồi?", ("admin", "completed_jobs")),
    ("Hiển thị các công việc đã có người nhận", ("admin", "taken_jobs")),
    ("Tôi muốn xóa các bài đã xong việc", ("admin", "cleanup_completed")),
    ("Danh sách công việc đã hoàn thành", ("admin", "completed_jobs")),
    ("Bài viết số 5 đã xong chưa?", ("admin", "check_specific")),
    ("Ẩn các bài đã hoàn thành", ("admin", "hide_completed")),
    ("Xoá các job đã xong", ("admin", "cleanup_completed")),
    ("Lọc các bài đã hoàn tất", ("admin", "completed_jobs")),
    ("Danh sách công việc đã giao", ("admin", "taken_jobs")),

    # --- Việc ngắn hạn / thời vụ tiếp ---
    ("Tôi muốn kiếm việc gì đó 2-3 ngày", ("part-time", "odd_jobs")),
    ("Tìm việc tạm thời 5 ngày", ("part-time", "odd_jobs")),
    ("Tôi có thể bê hàng, phụ quán vài ngày", ("part-time", "odd_jobs")),
    ("Giúp chuẩn bị tiệc cưới 1 ngày", ("part-time", "odd_jobs")),
    ("Dọn dẹp kho hàng 2 buổi", ("part-time", "odd_jobs")),
    ("Phụ chăm sóc người già buổi tối", ("part-time", "odd_jobs")),
    ("Cần người nấu ăn theo giờ", ("part-time", "odd_jobs")),
    ("Tìm việc đi phát tờ rơi", ("part-time", "odd_jobs")),
    ("Tôi có thể chạy sự kiện marketing ngắn hạn", ("part-time", "odd_jobs")),
    ("Tôi muốn việc gì đó đơn giản vài hôm", ("part-time", "odd_jobs")),
    ("Cần người lắp ráp đồ chơi", ("part-time", "odd_jobs")),

    # --- Giao hàng + Part‑time ---
    ("Tôi rảnh chiều tối muốn chạy grab", ("delivery", "part-time")),
    ("Tôi muốn giao đồ ăn buổi sáng", ("delivery", "part-time")),
    ("Tôi có xe máy muốn nhận đơn giao hàng", ("delivery", "part-time")),
    ("Cần việc giao hàng nội thành", ("delivery", "part-time")),
    ("Có thể làm shipper ngắn hạn", ("delivery", "odd_jobs")),

    # --- Remote / làm tại nhà (bổ sung) ---
    ("Tôi muốn vẽ minh họa online", ("remote", "design")),
    ("Làm voice over cho quảng cáo tại nhà", ("remote", "it")),
    ("Tôi viết truyện tranh freelance", ("remote", "design")),
    ("Tôi có thể dịch văn bản từ xa", ("remote", "office")),
    ("Làm data entry online", ("remote", "office")),

    # --- Tutor bổ sung ---
    ("Dạy kèm cấp 2 theo buổi", ("tutor", "part-time")),
    ("Nhận dạy vẽ thiếu nhi", ("tutor", "design")),
    ("Gia sư tiếng Trung cuối tuần", ("tutor", "part-time")),
    ("Có thể dạy Excel tại nhà", ("tutor", "office")),
    ("Tôi dạy lập trình cơ bản online", ("tutor", "it")),

    # --- Xây dựng / cơ khí / thợ ---
    ("Cần thợ sửa quạt điện", ("construction", "odd_jobs")),
    ("Tôi làm phụ hồ thời vụ", ("construction", "part-time")),
    ("Tôi có thể sơn cửa sắt", ("construction", "odd_jobs")),
    ("Cần thợ lắp điện dân dụng", ("construction", "part-time")),

    # --- Sales bổ sung ---
    ("Bán hàng online tại nhà", ("sales", "remote")),
    ("Tôi trực page bán mỹ phẩm", ("sales", "remote")),
    ("Cần nhân viên bán cà phê theo ca", ("sales", "part-time")),
    ("Tôi livestream bán quần áo", ("sales", "remote")),
    ("Tôi có thể tư vấn khách hàng từ xa", ("sales", "remote")),

    # --- Văn phòng / soạn thảo bổ sung ---
    ("Tôi làm trợ lý online", ("office", "remote")),
    ("Soạn văn bản part-time", ("office", "part-time")),
    ("Nhập dữ liệu trên Excel", ("office", "part-time")),
    ("Có thể viết báo cáo giúp", ("office", "remote")),

    # --- Time‑specific bổ sung ---
    ("Rảnh từ 7h đến 11h sáng", ("part-time", "time_specific")),
    ("Rảnh từ 8h tối tới khuya", ("part-time", "time_specific")),
    ("Chỉ làm được thứ 2 đến thứ 4", ("part-time", "time_specific")),
    ("Muốn làm vào khung 14h-18h", ("part-time", "time_specific")),

    # --- Admin: Trạng thái Job ---
    ("Xem các job chưa nhận", ("admin", "pending_jobs")),
    ("Job nào chưa có người nhận?", ("admin", "pending_jobs")),
    ("Hiển thị job đang chờ người làm", ("admin", "pending_jobs")),
    ("Danh sách các job chưa được nhận", ("admin", "pending_jobs")),

    ("Job nào đã có người nhận rồi?", ("admin", "taken_jobs")),
    ("Liệt kê các công việc đã nhận", ("admin", "taken_jobs")),
    ("Hiển thị job đã được phân công", ("admin", "taken_jobs")),

    ("Công việc nào đang chờ xác nhận?", ("admin", "waiting_confirmation")),
    ("Các job đang chờ duyệt", ("admin", "waiting_confirmation")),
    ("Danh sách job pending", ("admin", "waiting_confirmation")),

    ("Job nào bị từ chối?", ("admin", "rejected_jobs")),
    ("Xem các job bị hủy", ("admin", "rejected_jobs")),
    ("Danh sách job đã cancel", ("admin", "rejected_jobs")),

    # --- Admin hỏi tổng số job ---
    ("Có bao nhiêu công việc đang có?", ("admin", "count_all_jobs")),
    ("Tổng số công việc hiện tại là bao nhiêu?", ("admin", "count_all_jobs")),
    ("Tôi muốn biết có bao nhiêu job?", ("admin", "count_all_jobs")),
    ("Admin hỏi: hiện có tất cả bao nhiêu việc?", ("admin", "count_all_jobs")),
    ("Bao nhiêu bài post công việc đang tồn tại?", ("admin", "count_all_jobs")),
    ("Tổng số job đã đăng là bao nhiêu?", ("admin", "count_all_jobs")),
]
