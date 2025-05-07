import Api from "../Service/Api";
import { toast } from "react-toastify";

const CategoryService = {
  getList: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      throw new Error("No token found");
    }

    console.log("Token sent for categories:", token);

    try {
      const response = await Api.get("/categories", {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Get categories response:", response);
      return response; // Trả về mảng danh mục trực tiếp
    } catch (error) {
      console.error("Error fetching categories:", error.response || error);
      handleError(error);
      throw error;
    }
  },

  getCategoryById: async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      throw new Error("No token found");
    }
    try {
      const response = await Api.get(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          "Content-Type": "application/json",
        },
      });
      console.log(`Get category ${id} response:`, response);
      return response;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  addCategory: async (categoryData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      throw new Error("No token found");
    }
    try {
      const response = await Api.post("/categories", categoryData, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Add category response:", response);
      return response;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  updateCategory: async (id, categoryData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      throw new Error("No token found");
    }
    try {
      const response = await Api.put(`/categories/${id}`, categoryData, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          "Content-Type": "application/json",
        },
      });
      console.log(`Update category ${id} response:`, response);
      return response;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  deleteCategory: async (categoryId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      throw new Error("No token found");
    }
    try {
      const response = await Api.delete(`/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          "Content-Type": "application/json",
        },
      });
      console.log(`Delete category ${categoryId} response:`, response);
      return response;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
};

const handleError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    console.error("API error:", status, data);
    if (status === 403) {
      toast.error(data.message || "Bạn không có quyền truy cập. Vui lòng kiểm tra lại.");
    } else if (status === 401) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else if (status === 404) {
      toast.error("Danh mục không tồn tại.");
    } else if (status === 400) {
      toast.error(data.message || "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.");
    } else {
      toast.error(data.message || "Lỗi server. Vui lòng thử lại sau.");
    }
  } else if (error.message.includes("Network Error")) {
    toast.error("Không thể kết nối đến server. Kiểm tra backend hoặc CORS.");
  } else {
    toast.error("Lỗi không xác định: " + error.message);
  }
};

export default CategoryService;