import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageFile: null,
    categoryId: '',
    quantity: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [createdProduct, setCreatedProduct] = useState(null); // Thêm state để lưu trữ sản phẩm vừa tạo

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile' && files.length > 0) {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
  
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    if (formData.imageFile) {
      data.append('imageFile', formData.imageFile);
    }
    data.append('categoryId', formData.categoryId);
    data.append('quantity', formData.quantity);

    try {
      const response = await fetch('https://localhost:7024/api/Product', {
        method: 'POST',
        body: data,
      });
  
      if (response.ok) {
        const productData = await response.json(); // Lấy dữ liệu sản phẩm trả về từ API
        setCreatedProduct(productData); // Lưu sản phẩm vào state
        setSuccessMessage('Product created successfully!');
        setTimeout(() => navigate('/productlist'), 1500);
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors || {});
        alert('Failed to create product: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the product.');
    }
  };
  
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.name && <p className="text-red-500">{errors.name.join(', ')}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.description && <p className="text-red-500">{errors.description.join(', ')}</p>}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.price && <p className="text-red-500">{errors.price.join(', ')}</p>}
        </div>

        {/* Image File */}
        <div className="mb-4">
          <label className="block text-gray-700">Photo</label>
          <input
            type="file"
            name="imageFile"
            accept="image/jpeg, image/png, image/jpg, image/gif"
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.imageFile ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.imageFile && <p className="text-red-500">{errors.imageFile.join(', ')}</p>}
        </div>

        {/* Category ID */}
        <div className="mb-4">
          <label className="block text-gray-700">Category ID</label>
          <input
            type="text"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.categoryId ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.categoryId && <p className="text-red-500">{errors.categoryId.join(', ')}</p>}
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.quantity && <p className="text-red-500">{errors.quantity.join(', ')}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Product
        </button>

        {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}

        {/* Hiển thị thông tin sản phẩm vừa tạo */}
        {createdProduct && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="text-xl font-semibold">Product Details</h3>
            <p><strong>ID:</strong> {createdProduct.id}</p>
            <p><strong>Name:</strong> {createdProduct.name}</p>
            <p><strong>Description:</strong> {createdProduct.description}</p>
            <p><strong>Price:</strong> {createdProduct.price}</p>
            <p><strong>Image URL:</strong> {createdProduct.imageUrl}</p>
            <p><strong>Category ID:</strong> {createdProduct.categoryId}</p>
            <p><strong>Quantity:</strong> {createdProduct.quantity}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProduct;
