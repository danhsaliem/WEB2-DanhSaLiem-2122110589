import Api from "../Service/Api";
import { toast } from "react-toastify";

const BrandService = {
    getList: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
            throw new Error("No token found");
        }
        try {
            const response = await Api.get("brands", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("Get brands response:", response);
            return response;
        } catch (error) {
            handleError(error);
            throw error;
        }
    },

    getBrandById: async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
            throw new Error("No token found");
        }
        try {
            const response = await Api.get(`brands/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(`Get brand ${id} response:`, response);
            return response;
        } catch (error) {
            handleError(error);
            throw error;
        }
    },

    addBrand: async (brandData) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
            throw new Error("No token found");
        }
        try {
            const response = await Api.post("brands", brandData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("Add brand response:", response);
            return response;
        } catch (error) {
            handleError(error);
            throw error;
        }
    },

    updateBrand: async (id, brandData) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
            throw new Error("No token found");
        }
        try {
            const response = await Api.put(`brands/${id}`, brandData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(`Update brand ${id} response:`, response);
            return response;
        } catch (error) {
            handleError(error);
            throw error;
        }
    },

    deleteBrand: async (brandId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
            throw new Error("No token found");
        }
        try {
            const response = await Api.delete(`brands/${brandId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(`Delete brand ${brandId} response:`, response);
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
            toast.error("Bạn không có quyền truy cập. Vui lòng kiểm tra lại.");
        } else if (status === 401) {
            toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } else if (status === 404) {
            toast.error("Thương hiệu không tồn tại.");
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

export default BrandService;