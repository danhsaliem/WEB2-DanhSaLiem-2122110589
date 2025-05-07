import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:8081/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi tải đơn hàng:", err);
        if (err.response?.status === 403) alert("Bạn không có quyền truy cập!");
      });
  }, [token]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setOrders((prev) => prev.filter((o) => o.id !== id)))
      .catch((err) => console.error("Lỗi xoá đơn hàng:", err));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Quản lý Đơn hàng</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Tên</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">SĐT</th>
              <th className="px-4 py-2 text-left">Địa chỉ</th>              
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{order.name}</td>
                  <td className="px-4 py-2">{order.email}</td>
                  <td className="px-4 py-2">{order.phone}</td>
                  <td className="px-4 py-2">{order.address}</td>
            
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
