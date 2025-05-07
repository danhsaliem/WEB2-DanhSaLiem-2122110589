import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();  // Get product id from URL params
  const [product, setProduct] = useState(null);  // Store product data
  const [qty, setQty] = useState(1);  // Store product quantity

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');  // Get token from localStorage
        if (!token) {
          toast.error('Bạn cần đăng nhập để xem sản phẩm này.');
          return;
        }

        // Send request with token in Authorization header
        const response = await axios.get(`http://localhost:8081/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Ensure token is sent properly
          },
        });
        setProduct(response.data);  // Store product details in state
      } catch (error) {
        console.error('Error fetching product data:', error);
        toast.error('Không thể lấy thông tin sản phẩm.');
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('userData')); // Get user data from localStorage
      const userId = userData?.userId;  // Get userId from userData
  
      if (!token || !userId) {
        toast.error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.');
        return;
      }
  
      const response = await axios.post(
        'http://localhost:8081/api/carts', 
        {
          product: { id: product.id },  // Send product id
          quantity: qty,
          user: { id: userId }  // Send userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log(response);  // Debugging response
      toast.success('Sản phẩm đã được thêm vào giỏ hàng.');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Không thể thêm sản phẩm vào giỏ hàng.');
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center p-8 bg-gray-100">
        <div className="text-lg">Đang tải thông tin sản phẩm...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-8 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Image */}
        <div className="flex justify-center">
          <img
            src={`http://localhost:8081/images/${product.image}`}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right side - Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-500 mb-4">{product.size}</p>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, index) => (
                <i key={index} className={`fas fa-star${index < 4 ? '' : '-half-alt'}`}></i>
              ))}
            </div>
            <span className="ml-2 text-gray-500">| 11 | Đã bán: 443</span>
          </div>

          <div className="flex items-center mb-4">
            {product.pricesale ? (
              <>
                <span className="text-3xl font-bold text-red-500">{product.pricesale}đ</span>
                <span className="text-lg text-gray-500 line-through ml-4">{product.price}đ</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-red-500">{product.price}đ</span>
            )}
          </div>

          <p className="text-gray-500 mb-4">Không áp dụng chính sách đổi trả</p>

          <div className="flex items-center mb-4">
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l"
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            >
              -
            </button>
            <span className="px-4 py-2 border-t border-b">{qty}</span>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r"
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>
            <button
              className="bg-black text-white px-6 py-2 rounded ml-4 flex items-center"
              onClick={addToCart}
            >
              <i className="fas fa-shopping-bag mr-2"></i> Thêm vào giỏ hàng
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-2">Chi tiết sản phẩm</h2>
          <ul className="space-y-2">
            <li><span className="font-semibold">Mô tả:</span> {product.description}</li>
            <li><span className="font-semibold">Nội dung:</span> {product.content}</li>
          </ul>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default ProductDetail;
