import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { productId } = useParams(); // Lấy productId từ URL
  const navigate = useNavigate(); // Dùng navigate để chuyển hướng

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageFile: null,
    categoryId: '',
    quantity: '',
  });

  const [errors, setErrors] = useState({}); // Lưu trữ lỗi khi nhập liệu
  const [successMessage, setSuccessMessage] = useState(''); // Lưu thông báo thành công
  const [loading, setLoading] = useState(false); // Trạng thái đang tải

  // Fetch thông tin sản phẩm khi component được render
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:7024/api/Product/${productId}`);
        const data = response.data;
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          imageFile: null,
          categoryId: data.categoryId,
          quantity: data.quantity,
        });
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
        setErrors({ general: 'Không thể lấy thông tin sản phẩm!' });
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile' && files.length > 0) {
      setFormData((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', Number(formData.price));
    formDataToSend.append('categoryId', Number(formData.categoryId));
    formDataToSend.append('quantity', Number(formData.quantity));

    if (formData.imageFile) {
      formDataToSend.append('imageFile', formData.imageFile);
    }

    try {
      await axios.put(`https://localhost:7024/api/Product/${productId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Cập nhật sản phẩm thành công!');
      setTimeout(() => navigate('/productlist'), 1500); // Chuyển hướng về danh sách sản phẩm sau 1,5s
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      setErrors(error.response?.data?.errors || { general: 'Đã xảy ra lỗi khi cập nhật!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Chỉnh sửa sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        {errors.general && <p className="text-red-500 text-center">{errors.general}</p>}

        {[ 
          { label: 'Tên sản phẩm', name: 'name', type: 'text' },
          { label: 'Mô tả', name: 'description', type: 'text' },
          { label: 'Giá', name: 'price', type: 'number' },
          { label: 'ID danh mục', name: 'categoryId', type: 'text' },
          { label: 'Số lượng', name: 'quantity', type: 'number' },
        ].map(({ label, name, type }) => (
          <div key={name} className="mb-4">
            <label className="block text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors[name] && <p className="text-red-500">{errors[name].join(', ')}</p>}
          </div>
        ))}

        {/* Upload hình ảnh */}
        <div className="mb-4">
          <label className="block text-gray-700">Ảnh sản phẩm</label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.imageFile ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.imageFile && <p className="text-red-500">{errors.imageFile.join(', ')}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Đang cập nhật...' : 'Cập nhật sản phẩm'}
        </button>

        {successMessage && <p className="mt-4 text-green-500 text-center">{successMessage}</p>}
      </form>
    </div>
  );
};

export default EditProduct;
