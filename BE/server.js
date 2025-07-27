const express = require("express");
const axios = require("axios");
const mysql = require("mysql2/promise");  
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
const SECRET_KEY = "sdfggdfgdfgdfgwerewrtyytua2342";

// Kết nối CSDL
const db = mysql.createPool({
  host: 'localhost', //ip chạy app nha
  user: 'root',
  password: '123456',
  database: 'TTNT'
});

// Middleware xác thực JWT (để bv cho các api cần đăng nhập thì mới truy cạp đc)
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer abc" → lấy abc
  if (!token) return res.status(403).send("No token provided");
//xài jsonwebtoken để xác thực token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token");
    req.userId = decoded.id; // gán userId vào req để dùng sau này
    next();
  });
}

// xem toàn bộ ds acc dành cho admin
app.get('/api/all/profile', verifyToken, async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM NguoiDung");
    res.json({ success: true, users });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách người dùng:", err);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
});

//xem lscv all user dành cho admin
app.get('/api/all/job-history', verifyToken, async (req, res) => {
  try {
    const [jobHistories] = await db.query("SELECT * FROM LichSuLamViec");
    res.json({ success: true, jobHistories });
  } catch (err) {
    console.error("Lỗi khi lấy lịch sử công việc:", err);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
});

// sử dụng mysql2/promise thường là [rows, fields] nên const [rows] hoặc thay rows = tên nào đó trong []
app.post("/api/register", async (req, res) => {
  const { ho_ten, mat_khau, email, so_dien_thoai } = req.body;
  try {
    const [userExists] = await db.query("SELECT * FROM NguoiDung WHERE ho_ten = ?", [ho_ten]);
    if (userExists.length > 0) {
      return res.status(400).json({ success: false, message: "Tên đăng nhập đã tồn tại" });
    }

    const [emailExists] = await db.query("SELECT * FROM NguoiDung WHERE email = ?", [email]);
    if (emailExists.length > 0) {
      return res.status(400).json({ success: false, message: "Email đã được sử dụng." });
    }

    const hashedPassword = await bcrypt.hash(mat_khau, 10);

    await db.query(
      "INSERT INTO NguoiDung (ho_ten, mat_khau, email, so_dien_thoai) VALUES (?, ?, ?, ?)",
      [ho_ten, hashedPassword, email, so_dien_thoai]
    );

    return res.json({ success: true, message: "Đăng ký thành công" });
  } catch (err) {
    console.error("Lỗi đăng ký:", err);
    return res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
});

app.post("/api/login", async (req, res) => {
  const { ho_ten, mat_khau } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM NguoiDung WHERE ho_ten = ?", [ho_ten]);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Tên đăng nhập hoặc mật khẩu không đúng" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Tên đăng nhập hoặc mật khẩu không đúng" });
    }
    // Tạo JWT token
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, userId: user.id  }); // Trả về token và userId

  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    return res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
  
});

//quên mk gửi otp và reset mật khẩu
// Mã OTP tạm thời lưu trong RAM
// OTP lưu tạm trong RAM
let otpStore = {}; 

// Gửi mã OTP
app.post("/api/sendotp", async (req, res) => {
  const { identifier } = req.body;

  if (!identifier) {
    return res.status(400).json({ error: "Thiếu thông tin định danh (email/sđt)" });
  }

  let rows;
  if (identifier.includes('@')) {
    [rows] = await db.query("SELECT * FROM NguoiDung WHERE email = ?", [identifier]);
  } else {
    [rows] = await db.query("SELECT * FROM NguoiDung WHERE so_dien_thoai = ?", [identifier]);
  }

  if (rows.length === 0) {
    return res.status(404).json({ error: "Không tìm thấy người dùng" });
  }

  // Tạo mã OTP ngẫu nhiên 6 chữ số
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[identifier] = { otp, createdAt: Date.now() };

  console.log(`[FAKE] Gửi OTP đến ${identifier}: ${otp}`);
  res.json({ message: "OTP đã được gửi", otp }); // terminal
});

// Reset mật khẩu
app.post("/api/resetpassword", async (req, res) => {
  const { identifier, otp, newPassword } = req.body;

  if (!identifier || !otp || !newPassword) {
    return res.status(400).json({ error: "Thiếu thông tin" });
  }

  const isEmail = identifier.includes('@');
  const query = isEmail
    ? "SELECT * FROM NguoiDung WHERE email = ?"
    : "SELECT * FROM NguoiDung WHERE so_dien_thoai = ?";

  const [rows] = await db.query(query, [identifier]);
  if (rows.length === 0) {
    return res.status(404).json({ error: "Không tìm thấy người dùng" });
  }

  const storedOtp = otpStore[identifier];
  if (!storedOtp || storedOtp.otp !== otp) {
    return res.status(400).json({ error: "OTP không đúng" });
  }

  if (Date.now() - storedOtp.createdAt > 5 * 60 * 1000) {
    delete otpStore[identifier];
    return res.status(400).json({ error: "OTP đã hết hạn" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updateQuery = isEmail
    ? "UPDATE NguoiDung SET mat_khau = ? WHERE email = ?"
    : "UPDATE NguoiDung SET mat_khau = ? WHERE so_dien_thoai = ?";

  await db.query(updateQuery, [hashedPassword, identifier]);

  delete otpStore[identifier];
  res.json({ message: "Mật khẩu đã được đặt lại thành công" });
});

// xem thông tin acc của mình
// Middleware verifyToken đã gắn req.userId

// Xem thông tin tài khoản của chính mình
app.get('/api/users/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const [rows] = await db.query("SELECT id, ho_ten, email, so_dien_thoai FROM NguoiDung WHERE id = ?", [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy người dùng" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Lỗi khi lấy thông tin người dùng:", err);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});


// Cập nhật thông tin tài khoản
app.put('/api/users/profile', verifyToken, async (req, res) => {
  const { ho_ten, email, so_dien_thoai, mat_khau } = req.body;

  try {
    let query = '';
    let values = [];

    if (mat_khau) {
      const hashedPassword = await bcrypt.hash(mat_khau, 10);
      query = `
        UPDATE NguoiDung 
        SET ho_ten = ?, email = ?, so_dien_thoai = ?, mat_khau = ? 
        WHERE id = ?
      `;
      values = [ho_ten, email, so_dien_thoai, hashedPassword, req.userId];
    } else {
      query = `
        UPDATE NguoiDung 
        SET ho_ten = ?, email = ?, so_dien_thoai = ? 
        WHERE id = ?
      `;
      values = [ho_ten, email, so_dien_thoai, req.userId];
    }

    await db.query(query, values);

    res.json({ message: 'Cập nhật thông tin thành công' });
  } catch (err) {
    console.error("Lỗi khi cập nhật người dùng:", err);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});


//xóa acc
// app.delete('/api/users/profile', verifyToken, async (req, res) => {
//   try {
//     // Xóa tất cả tin nhắn liên quan đến người dùng này trước
//     await pool.query('DELETE FROM messages WHERE sender_id = $1 OR receiver_id = $1', [req.userId]);

//     // Sau đó xóa người dùng
//     await pool.query('DELETE FROM users WHERE id = $1', [req.userId]);

//     res.json({ message: 'User deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error deleting user' });
//   }
// });

//xem ds job trong app
app.get("/api/all/jobs", async (req, res) => {
  try {
    const [jobs] = await db.query("SELECT * FROM Job");
    res.json({ success: true, jobs });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách công việc:", err);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
});

//thêm job mới
app.post("/api/add-job", verifyToken, async (req, res) => {
  const { title, description, salary_per_hour, category, type, thoi_gian, requirements, location, sdt, ho_ten_nguoi_dang, trang_thai, posted_by } = req.body;
  try {
    const [result] = await db.query("INSERT INTO Job (title, description, salary_per_hour, category, type, thoi_gian, requirements, location, sdt, ho_ten_nguoi_dang, trang_thai, posted_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [title, description, salary_per_hour, category, type, thoi_gian, requirements, location, sdt, ho_ten_nguoi_dang, trang_thai, posted_by]
    );
    res.json({ success: true, jobId: result.insertId });
  } catch (err) {
    console.error("Lỗi khi thêm công việc:", err);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
});


//xem ls công việc 
app.get("/api/job-history", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const [jobs] = await db.query("SELECT * FROM LichSuLamViec WHERE user_id = ?", [userId]);
    res.json({ success: true, jobs });
  } catch (err) {
    console.error("Lỗi khi lấy lịch sử công việc:", err);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
});

// API cho user - gợi ý công việc
app.post("/api/user/suggest-jobs", verifyToken, async (req, res) => {
  try {
    const { query } = req.body;

    // Gửi query đến Flask
    const response = await axios.post("http://192.168.100.7:5000/predict", { query });

 if (response.data.list_all_jobs) {
      const [titles] = await db.query("SELECT title FROM job");
      return res.json({
        success: true,
        list_all_jobs: true,
        jobs: titles
      });
    }

const {
  job_type: jobType,
  time_hint: timeHint,
  category,
  has_degree,
  duration_hint, // kiểu cv vặt
  list_all_jobs
} = response.data;
if (duration_hint) {
  sql += " AND (description LIKE ? OR title LIKE ?)";
  params.push(`%1 ngày%`);
  params.push(`%1 ngày%`);
}
let sql = "SELECT * FROM job";
let params = [];

if (!list_all_jobs) {
  sql += " WHERE type = ?";
  params.push(jobType);

  if (timeHint) {
    sql += " AND time LIKE ?";
    params.push(`%${timeHint}%`);
  }

  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

  if (has_degree) {
    sql += " AND requirements LIKE ?";
    params.push(`%bằng%`);
  }
}

const [jobs] = await db.query(sql, params);

res.json({
  success: true,
  list_all_jobs: !!list_all_jobs,
  job_type: jobType || null,
  time_hint: timeHint || null,
  category: category || null,
  has_degree: !!has_degree,
  jobs
});


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
});


//chatbot admin
// app.post("/api/admin/analyze-query", async (req, res) => {
//   try {
//     const { query } = req.body;
//     const token = req.headers.authorization || ""; // nếu cần xác thực

//     const response = await axios.post("http://192.168.100.7:5000/admin/query", { query }, {
//       headers: { Authorization: token }
//     });
//   const action = response.data.action;

//     if (action === "count_all_jobs") {
//       const [rows] = await db.query("SELECT COUNT(*) AS total FROM job");
//       return res.json({
//         success: true,
//         action,
//         total_jobs: rows[0].total,
//         message: `Tổng số job hiện tại là ${rows[0].total}`
//       });
//     }
    
//     return res.json(response.data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Lỗi phân tích yêu cầu admin" });
//   }
// });

app.post("/api/admin/analyze-query", verifyToken, async (req, res) => {
  try {
    const { query } = req.body;

    // Gửi sang Flask để phân tích
    const response = await axios.post("http://localhost:5000/admin/query", { query });

    const { action, message } = response.data;

    let sql = "";
    let jobs = [];
    let total = 0;

    switch (action) {
      case "count_all_jobs":
        [[{ count: total }]] = await db.query("SELECT COUNT(*) AS count FROM job");
        return res.json({ success: true, action, total, message });

      case "completed_jobs":
        [jobs] = await db.query("SELECT * FROM job WHERE trang_thai = 'Đã hoàn thành'");
        break;

      case "pending_jobs":
        [jobs] = await db.query("SELECT * FROM job WHERE trang_thai = 'Chưa nhận'");
        break;

      case "taken_jobs":
        [jobs] = await db.query("SELECT * FROM job WHERE trang_thai = 'Đã có người nhận'");
        break;

      case "rejected_jobs":
        [jobs] = await db.query("SELECT * FROM job WHERE trang_thai = 'Bị từ chối'");
        break;

      case "waiting_confirmation":
        [jobs] = await db.query("SELECT * FROM job WHERE trang_thai = 'Chờ xác nhận'");
        break;

      case "cleanup_completed":
        const [completedJobs] = await db.query("SELECT * FROM job WHERE trang_thai = 'Đã hoàn thành'");
        // Xóa job đã hoàn thành
        await db.query("DELETE FROM job WHERE trang_thai = 'Đã hoàn thành'");
        // return res.json({ success: true, action, message: "Đã xóa các job hoàn thành." });
         return res.json({
    success: true,
    action,
    message: `${completedJobs.length} job đã được xóa.`,
    deleted_jobs: completedJobs // Trả về danh sách các job đã xóa
  });


      default:
        return res.json({ success: false, message: "Không nhận dạng được yêu cầu admin" });
    }

    res.json({
      success: true,
      action,
      message,
      jobs
    });

   
  } catch (err) {
    console.error("Lỗi xử lý admin query:", err);
    res.status(500).json({ success: false, error: "Lỗi hệ thống" });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server đang chạy tại http://192.168.100.7:3000');
});

