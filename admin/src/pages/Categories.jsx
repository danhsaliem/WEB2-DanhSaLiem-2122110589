import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:8081/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Lỗi lấy danh mục:", err));
  }, [token, navigate]);

  const onSubmit = (data) => {
    const headers = { Authorization: `Bearer ${token}` };

    if (isEditing) {
      axios
        .put(`http://localhost:8081/api/categories/${editCategory.id}`, data, {
          headers,
        })
        .then((res) => {
          setCategories((prev) =>
            prev.map((c) => (c.id === editCategory.id ? res.data : c))
          );
          setIsEditing(false);
          reset();
        })
        .catch((err) => console.error("Lỗi cập nhật:", err));
    } else {
      axios
        .post("http://localhost:8081/api/categories", data, { headers })
        .then((res) => {
          setCategories([...categories, res.data]);
          reset();
        })
        .catch((err) => console.error("Lỗi thêm mới:", err));
    }
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setEditCategory(category);
    reset({ name: category.name });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá danh mục này?")) return;

    axios
      .delete(`http://localhost:8081/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setCategories(categories.filter((c) => c.id !== id));
      })
      .catch((err) => console.error("Lỗi xoá:", err));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Quản lý Danh mục</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <label className="block font-medium mb-2">Tên danh mục</label>
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
          {categories.map((c) => (
            <tr key={c.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{c.id}</td>
              <td className="px-4 py-2">{c.name}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
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

export default CategoryManagement;
