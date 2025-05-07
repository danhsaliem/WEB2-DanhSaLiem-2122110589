import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const BrandManagement = () => {
  const [brands, setBrands] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editBrand, setEditBrand] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:8081/api/brands", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBrands(res.data))
      .catch((err) => console.error("Lỗi lấy brand:", err));
  }, [token, navigate]);

  const onSubmit = (data) => {
    const headers = { Authorization: `Bearer ${token}` };

    if (isEditing) {
      axios
        .put(`http://localhost:8081/api/brands/${editBrand.id}`, data, {
          headers,
        })
        .then((res) => {
          setBrands((prev) =>
            prev.map((b) => (b.id === editBrand.id ? res.data : b))
          );
          setIsEditing(false);
          reset();
        })
        .catch((err) => console.error("Lỗi cập nhật:", err));
    } else {
      axios
        .post("http://localhost:8081/api/brands", data, { headers })
        .then((res) => {
          setBrands([...brands, res.data]);
          reset();
        })
        .catch((err) => console.error("Lỗi thêm mới:", err));
    }
  };

  const handleEdit = (brand) => {
    setIsEditing(true);
    setEditBrand(brand);
    reset({ name: brand.name });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá thương hiệu này?")) return;

    axios
      .delete(`http://localhost:8081/api/brands/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setBrands(brands.filter((b) => b.id !== id));
      })
      .catch((err) => console.error("Lỗi xoá:", err));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Quản lý Thương hiệu</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <label className="block font-medium mb-2">Tên thương hiệu</label>
        <input
          {...register("name")}
          required
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? "Cập nhật" : "Thêm mới"}
        </button>
      </form>

      <table className="w-full bg-white rounded shadow border">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">ID</th>
            <th className="text-left px-4 py-2">Tên</th>
            <th className="text-left px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((b) => (
            <tr key={b.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{b.id}</td>
              <td className="px-4 py-2">{b.name}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(b)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrandManagement;