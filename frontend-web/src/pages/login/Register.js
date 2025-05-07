import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordconfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{10,15}$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !address || !gender || !username || !password || !password_confirmation) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Email không hợp lệ!');
      return;
    }
    if (!validatePhone(phone)) {
      toast.error('Số điện thoại không hợp lệ!');
      return;
    }
    if (password !== password_confirmation) {
      toast.error('Mật khẩu không khớp!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8081/api/users/register', {
        name,
        email,
        phone,
        address,
        gender,
        username,
        password,
        password_confirmation
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        toast.error('Đăng ký không thành công, vui lòng thử lại!');
      }
    } catch (error) {
      console.error('API error:', error);
      const errors = error?.response?.data?.errors;

      if (error.response?.status === 422 && errors && typeof errors === 'object') {
        Object.keys(errors).forEach((field) => {
          toast.error(`${errors[field][0]}`);
        });
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-lg overflow-hidden">
        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Đăng Ký</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nhập tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nhập địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="gender">Gender</label>
              <select
                id="gender"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm text-purple-600">
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password_confirmation">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password_confirmation"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Xác nhận mật khẩu"
                value={password_confirmation}
                onChange={(e) => setPasswordconfirmation(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-4 ${loading ? 'bg-gray-400' : 'bg-gradient-to-r bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500'} duration-300 text-white rounded-lg shadow-lg font-medium text-lg`}
            >
              {loading ? 'Loading...' : 'Register'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
