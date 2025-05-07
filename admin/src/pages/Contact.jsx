  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { useForm } from "react-hook-form";
  import { useNavigate } from "react-router-dom";

  const ContactManagement = () => {
    const [contacts, setContacts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editContact, setEditContact] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token) {
        navigate("/login");
        return;
      }

      axios
        .get("http://localhost:8081/api/contacts", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setContacts(res.data))
        .catch((err) => console.error("Lỗi lấy contact:", err));
    }, [token]);

    const onSubmit = (data) => {
      const headers = { Authorization: `Bearer ${token}` };

      if (isEditing) {
        axios
          .put(`http://localhost:8081/api/contacts/${editContact.id}`, data, {
            headers,
          })
          .then((res) => {
            setContacts((prev) =>
              prev.map((c) => (c.id === editContact.id ? res.data : c))
            );
            setIsEditing(false);
            reset();
          })
          .catch((err) => console.error("Lỗi cập nhật:", err));
      } else {
        axios
          .post("http://localhost:8081/api/contacts", data, { headers })
          .then((res) => {
            setContacts([...contacts, res.data]);
            reset();
          })
          .catch((err) => console.error("Lỗi thêm:", err));
      }
    };

    const handleEdit = (c) => {
      setIsEditing(true);
      setEditContact(c);
      reset({ name: c.name, email: c.email, message: c.message });
    };

    const handleDelete = (id) => {
      if (!window.confirm("Bạn có chắc muốn xoá liên hệ này?")) return;

      axios
        .delete(`http://localhost:8081/api/contacts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => setContacts(contacts.filter((c) => c.id !== id)))
        .catch((err) => console.error("Lỗi xoá:", err));
    };

    const handleReply = (e, contactId) => {
      e.preventDefault();
      const reply = e.target.elements[`reply-${contactId}`].value;

      axios
        .put(
          `http://localhost:8081/api/contacts/${contactId}/reply`,
          { reply },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setContacts((prev) =>
            prev.map((c) => (c.id === contactId ? res.data : c))
          );
          e.target.reset();
        })
        .catch((err) => console.error("Lỗi phản hồi:", err));
    };

    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Quản lý Liên hệ</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 rounded shadow mb-6"
        >
          <input
            {...register("name")}
            required
            placeholder="Tên"
            className="w-full border px-3 py-2 rounded mb-3"
          />
          <input
            {...register("email")}
            required
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded mb-3"
          />
          <textarea
            {...register("message")}
            required
            placeholder="Nội dung liên hệ"
            className="w-full border px-3 py-2 rounded mb-3"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isEditing ? "Cập nhật" : "Thêm mới"}
          </button>
        </form>

        <table className="w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Tên</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Nội dung</th>
              <th className="text-left px-4 py-2">Phản hồi</th>
              <th className="text-left px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-t align-top">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td className="px-4 py-2">{c.message}</td>
                <td className="px-4 py-2">
                  {c.reply ? (
                    <p className="text-green-700 font-medium">{c.reply}</p>
                  ) : (
                    <form onSubmit={(e) => handleReply(e, c.id)} className="flex flex-col gap-2">
                      <input
                        name={`reply-${c.id}`}
                        placeholder="Nhập phản hồi..."
                        className="border px-2 py-1 rounded"
                      />
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        Gửi
                      </button>
                    </form>
                  )}
                </td>
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

  export default ContactManagement;
