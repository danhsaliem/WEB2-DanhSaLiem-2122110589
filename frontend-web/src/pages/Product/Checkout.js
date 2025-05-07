import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    email: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/users/login');
      return;
    }

    const fetchCart = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          navigate('/users/login');
          return;
        }

        const response = await axios.get(`http://localhost:8081/api/carts/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setCartItems(response.data || []);
      } catch (error) {
        console.error('Error fetching cart:', error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate('/users/login');
        }
      }
    };

    fetchCart();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const userEmail = localStorage.getItem('email');

      if (!token || !userId) {
        navigate('/users/login');
        return;
      }

      const orderResponse = await axios.post('http://localhost:8081/api/orders',
        {
          name: formData.name,
          email: userEmail,
          phone: formData.phone,
          address: formData.address,
          user: {
            id: parseInt(userId)
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const orderId = orderResponse.data.id;

      for (const item of cartItems) {
        await axios.post('http://localhost:8081/api/order-details',
          {
            orderId,
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
      }

      navigate('/order-success');
    } catch (error) {
      console.error('Error creating order:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate('/users/login');
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-8 bg-gradient-to-br from-blue-100 to-white min-h-screen rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-8">🛒 Xác Nhận Đơn Hàng</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-blue-700 mb-4">🧾 Danh sách sản phẩm</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center py-4 border-b last:border-0">
                <img
                  src={`http://localhost:8081/images/${item.product.image}`}
                  alt={item.product.name}
                  className="w-24 h-24 rounded-xl object-cover border"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-lg text-gray-800">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                  <p className="text-blue-600 font-bold">{(item.product.price * item.quantity).toLocaleString()} VND</p>
                </div>
              </div>
            ))}
            <div className="pt-6 border-t mt-6 text-right">
              <span className="text-lg font-semibold text-blue-700">Tổng cộng: {calculateTotal().toLocaleString()} VND</span>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-blue-700 mb-4">🚚 Thông tin giao hàng</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">Họ và tên</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">Ghi chú</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
                >
                  ✅ Đặt hàng ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;