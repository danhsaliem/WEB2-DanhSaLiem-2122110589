import { toast } from "react-toastify";
import Api from "../Service/Api";

const UserService = {
  login: async (email, password) => {
    try {
      // Gửi request đăng nhập
      const response = await Api.post('http://localhost:8081/api/users/login', {
        email,
        password,
      });

      console.log("API Response:", response);  // Kiểm tra phản hồi từ API

      // Kiểm tra nếu response có token và email
      if (response && response && response.token && response.email) {
        const { token, message, email, userId } = response;

        // Lưu thông tin vào localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('userId', userId); // Nếu cần lưu userId

        return { token, message, email, userId };
      } else {
        // Thông báo lỗi nếu không có dữ liệu hợp lệ
        toast.error('Dữ liệu không hợp lệ từ server');
        throw new Error('Dữ liệu không hợp lệ từ server');
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.message || 'Đã xảy ra lỗi khi đăng nhập');
      throw new Error('Dữ liệu không hợp lệ từ server');
    }
  },
};

export default UserService;
