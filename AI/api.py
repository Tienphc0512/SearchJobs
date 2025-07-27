# api.py
from flask import Flask, request, jsonify, send_file
import joblib
from flask_cors import CORS
from functools import wraps

# Load model AI
vec, model = joblib.load("job_model.pkl")

app = Flask(__name__)
CORS(app)

def extract_fields(text):
    text = text.lower()
    result = {}

    # Gợi ý ngành nghề (đã có sẵn)
    if "cntt" in text or "lập trình" in text or "backend" in text or "ai" in text:
        result["category"] = "it"
    elif "thiết kế" in text or "photoshop" in text or "đồ họa" in text:
        result["category"] = "design"
    elif "kế toán" in text or "hành chính" in text:
        result["category"] = "office"
    elif "giáo viên" in text or "dạy học" in text or "gia sư" in text:
        result["category"] = "tutor"
    elif "xây dựng" in text or "thợ xây" in text or "điện nước" in text:
        result["category"] = "construction"
    elif "giao hàng" in text or "shipper" in text:
        result["category"] = "delivery"
    elif "bán hàng" in text or "sale" in text:
        result["category"] = "sales"
    elif any(kw in text for kw in [
        "việc vặt", "giúp việc", "chạy sự kiện", "ngày", "1 ngày", "2 ngày",
        "bê đồ", "trông trẻ", "việc nhà", "đóng gói", "lau nhà", "phụ việc"
    ]):
        result["category"] = "odd_jobs"  # <-- bổ sung nhóm công việc vặt

    # Dò thời gian
    if "sáng" in text:
        result["time_hint"] = "sáng"
    elif "tối" in text:
        result["time_hint"] = "tối"
    elif "cuối tuần" in text or "thứ 7" in text or "chủ nhật" in text:
        result["time_hint"] = "cuối tuần"

    if any(x in text for x in ["1 ngày", "2 ngày", "3 ngày", "vài ngày", "ngắn hạn", "1 tuần", "tạm thời", "ít ngày"]):
        result["duration_hint"] = "short-term"


    # Có bằng cấp?
    result["has_degree"] = "bằng" in text or "đại học" in text or "cao đẳng" in text

    return result



# --- Routes ---
@app.route("/")
def home():
    return "Job Suggestion API is running! Endpoints: /predict (POST), /admin/query (POST)"

@app.route('/test')
def test():
    return send_file('test.html')

def is_list_all_jobs_query(text):
    return any(kw in text for kw in [
        "bao nhiêu", "tổng số", "tất cả công việc", "liệt kê công việc", "toàn bộ công việc", "có bao nhiêu"
    ])

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        query = data.get("query", "").lower()
        
        if is_list_all_jobs_query(query):
            return jsonify({
                "success": True,
                "list_all_jobs": True,
                "query": query
            })

        x = vec.transform([query])
        job_type = model.predict(x)[0]

        fields = extract_fields(query)

        return jsonify({
            "success": True,
            "job_type": job_type,
            "time_hint": fields.get("time_hint"),
            "category": fields.get("category"),
            "has_degree": fields.get("has_degree"),
            "query": query
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/admin/query", methods=["POST", "OPTIONS"])
def admin_query():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
    
    try:
        data = request.get_json()
        query = data.get("query", "").lower()

        # Dùng model AI phân tích
        x = vec.transform([query])
        action = model.predict(x)[0]

        # Map action sang câu trả lời tương ứng
        ACTION_MESSAGES = {
           "completed_jobs": "Hiển thị danh sách các job đã hoàn thành",
            "taken_jobs": "Hiển thị job đã có người nhận",
            "pending_jobs": "Hiển thị job chưa có người nhận",
            "waiting_confirmation": "Hiển thị job đang chờ xác nhận",
            "rejected_jobs": "Hiển thị job bị từ chối/hủy",
            "cleanup_completed": "Đánh dấu xóa các bài đã hoàn thành",
            "check_specific": "Kiểm tra trạng thái của job cụ thể",
            "count_all_jobs": "Truy vấn tổng số lượng job hiện tại",
        }

        if action in ACTION_MESSAGES:
            return jsonify({
                "action": action,
                "message": ACTION_MESSAGES[action]
            })
        else:
            return jsonify({
                "action": "unrecognized",
                "message": "Yêu cầu admin không xác định"
            })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
    
