import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Danh sách người dùng:", res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi tải danh sách người dùng:", err);
      });
  }, []);

  const onSubmit = (data) => {
    console.log("Dữ liệu form gửi đi:", data);

    if (editingUser) {
      axios
        .put(`http://localhost:8081/api/users/${editingUser.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Cập nhật thành công:", res.data);
          alert(res.data.message);
          setEditingUser(null);  // Reset editingUser sau khi cập nhật
          window.location.reload();
        })
        .catch((err) => {
          console.error("Lỗi khi cập nhật:", err);
        });
    }
  };

  const handleEdit = (user) => {
    console.log("Đang sửa user:", user);
    setEditingUser(user);
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("password", "");  // Đặt lại mật khẩu rỗng
  };

  const handleDelete = (id) => {
    console.log("Xoá user ID:", id);
    if (window.confirm("Bạn có chắc muốn xoá?")) {
      axios
        .delete(`http://localhost:8081/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Xoá thành công:", res.data);
          alert(res.data);
          window.location.reload();
        })
        .catch((err) => {
          console.error("Lỗi khi xoá:", err);
        });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {editingUser ? "Sửa người dùng" : "Danh sách người dùng"}
      </h2>
      {editingUser && (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-3">
          <input
            {...register("name", { required: true })}
            placeholder="Tên"
            className="border p-2 w-full"
          />
          {errors.name && <p className="text-red-500">Tên là bắt buộc</p>}

          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="border p-2 w-full"
          />
          {errors.email && <p className="text-red-500">Email là bắt buộc</p>}

          <input
            {...register("password", { required: false })}
            placeholder="Mật khẩu"
            type="password"
            className="border p-2 w-full"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Cập nhật
          </button>
        </form>
      )}

      <h2 className="text-xl font-bold mb-2">Danh sách người dùng</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Tên</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
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
}

export default Users;
