import Api from "../Service/Api";
import { toast } from "react-toastify";

const ProductService = {
  getList: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      throw new Error("No token found");
    }

    console.log("Token sent for products:", token);

    try {
      const response = await Api.get("products", {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Get products response:", response);
      return response; // Trả về mảng sản phẩm trực tiếp
    } catch (error) {
      console.error("Error fetching products:", error.response || error);
      handleError(error);
      throw error;
    }
  },

  getProductsByFilter: async (categoryId, brandId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      throw new Error("No token found");
    }

    try {
      const params = new URLSearchParams();
      if (categoryId && categoryId !== "all") {
        params.append("categoryId", categoryId);
      }
      if (brandId && brandId !== "all") {
        params.append("brandId", brandId);
      }
      const response = await Api.get(`products/filter?${params.toString()}`, {
        headers: {
          Authorization: ` Bearer ${token.trim()}`,
          "Content-Type": "application/json",
        },
      });
      console.log(`Get products for category ${categoryId}, brand ${brandId} response:`, response);
      return response;
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}, brand ${brandId}:`, error.response || error);
      handleError(error);
      throw error;
    }
  },

  getProductById: async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      throw new Error("No token found");
    }
    try {
      const response = await Api.get(`products/${id}`, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          "Content-Type": "application/json",
        },
      });
      console.log(`Get product ${id} response:`, response);
      return response;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  addProduct: async (productData, imageFile) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      throw new Error("No token found");
    }
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price.toString());
      formData.append("quantity", productData.quantity.toString());
      formData.append("category_id", productData.categoryId.toString());
      formData.append("brand_id", productData.brandId.toString());
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await Api.post("products", formData, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      });
      console.log("Add product response:", response);
      return response;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  updateProduct: async (id, productData, imageFile) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      throw new Error("No token found");
    }
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price.toString());
      formData.append("quantity", productData.quantity.toString());
      formData.append("category_id", productData.categoryId.toString());
      formData.append("brand_id", productData.brandId.toString());
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await Api.put(`products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      });
      console.log(`Update product ${id} response:`, response);
      return response;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      throw new Error("No token found");
    }
    try {
      const response = await Api.delete(`products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          "Content-Type": "application/json",
        },
      });
      console.log(`Delete product ${productId} response:`, response);
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
      toast.error("Sản phẩm không tồn tại.");
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

export default ProductService;