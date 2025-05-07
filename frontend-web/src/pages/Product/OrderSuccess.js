import { Link } from 'react-router-dom';

function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-green-100 p-10 rounded-xl shadow-md text-center max-w-lg w-full">
        <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 Đặt hàng thành công!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao!
        </p>
        <Link
          to="/"
          className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200"
        >
          🏠 Về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
