import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("Chưa có token, chuyển hướng đến đăng nhập...");
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:8081/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        if (error.response?.status === 403) {
          alert("Bạn không có quyền truy cập!");
        }
      });
  }, [token]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category_id", data.category_id);
    formData.append("brand_id", data.brand_id);
    if (data.image) formData.append("image", data.image[0]);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    if (isEditing) {
      axios
        .put(`http://localhost:8081/api/products/${editProduct.id}`, formData, config)
        .then(() => {
          setProducts((prev) =>
            prev.map((p) => (p.id === editProduct.id ? { ...p, ...data } : p))
          );
          setIsEditing(false);
          reset();
        })
        .catch((error) => console.error(error));
    } else {
      axios
        .post("http://localhost:8081/api/products", formData, config)
        .then((response) => {
          setProducts([...products, response.data]);
          reset();
        })
        .catch((error) => console.error(error));
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditProduct(product);
    reset({
      name: product.name,
      description: product.description,
      price: product.price,
      category_id: product.category.id,
      brand_id: product.brand.id,
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className=" mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Quản lý sản phẩm</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <div>
          <label className="block mb-1 font-medium">Tên sản phẩm</label>
          <input
            {...register("name")}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Mô tả</label>
          <input
            {...register("description")}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Giá</label>
          <input
            type="number"
            {...register("price")}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Danh mục (category_id)</label>
          <input
            type="number"
            {...register("category")}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Thương hiệu (brand_id)</label>
          <input
            type="number"
            {...register("brand_id")}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Ảnh sản phẩm</label>
          <input type="file" {...register("image")} />
        </div>
        <div className="col-span-full text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {isEditing ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Danh sách sản phẩm</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Tên</th>
              <th className="px-4 py-2 text-left">Mô tả</th>
              <th className="px-4 py-2 text-left">Giá</th>
              <th className="px-4 py-2 text-left">Danh mục</th>
              <th className="px-4 py-2 text-left">Thương hiệu</th>
              <th className="px-4 py-2 text-left">Hành động</th>
              
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">{product.category.name}</td>
                <td className="px-4 py-2">{product.brand.name}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
