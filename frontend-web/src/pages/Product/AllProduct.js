// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import CategoryService from '../../Service/CategoryService';
// import BrandService from '../../Service/BrandService';
// import ProductService from '../../Service/ProductServive'
// function Product() {
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('all');
//     const [selectedBrand, setSelectedBrand] = useState('all');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [productsPerPage] = useState(6);
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');
//     const [priceAlert, setPriceAlert] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortOrder, setSortOrder] = useState('asc');
//     const [categories, setCategories] = useState([]);
//     const [brands, setBrands] = useState([]);
//     const [loading, setLoading] = useState(false); // Thêm trạng thái loading
//     const navigate = useNavigate();

//     // Lấy dữ liệu ban đầu (danh mục, thương hiệu, sản phẩm)
//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 // Lấy danh sách danh mục
//                 const categoriesResponse = await CategoryService.getList();
//                 const categoryList = Array.isArray(categoriesResponse)
//                     ? categoriesResponse
//                     : categoriesResponse?.data || [];
//                 setCategories([{ id: 'all', name: 'Tất cả danh mục' }, ...categoryList]);

//                 // Lấy danh sách thương hiệu
//                 const brandsResponse = await BrandService.getList();
//                 const brandList = Array.isArray(brandsResponse)
//                     ? brandsResponse
//                     : brandsResponse?.data || [];
//                 setBrands([{ id: 'all', name: 'Tất cả thương hiệu' }, ...brandList]);

//                 // Lấy sản phẩm ban đầu
//                 await fetchProductsByFilter(selectedCategory, selectedBrand);
//             } catch (error) {
//                 console.error('Lỗi khi lấy dữ liệu:', error);
//                 toast.error('Không thể tải dữ liệu. Vui lòng thử lại.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     // Hàm lấy sản phẩm theo bộ lọc
//     const fetchProductsByFilter = async (categoryId, brandId) => {
//         setLoading(true);
//         try {
//             const productList = await ProductService.getProductsByFilter(categoryId, brandId);
//             const productsData = Array.isArray(productList) ? productList : productList?.data || [];
//             setProducts(productsData);
//             setFilteredProducts(productsData);
//         } catch (error) {
//             console.error('Lỗi khi lấy sản phẩm:', error);
//             setProducts([]);
//             setFilteredProducts([]);
//             toast.error('Không thể tải sản phẩm. Vui lòng thử lại.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Cập nhật danh sách sản phẩm khi thay đổi bộ lọc category hoặc brand
//     useEffect(() => {
//         fetchProductsByFilter(selectedCategory, selectedBrand);
//         setCurrentPage(1);
//     }, [selectedCategory, selectedBrand]);

//     // Lọc và sắp xếp sản phẩm dựa trên các bộ lọc khác (giá, tìm kiếm, sắp xếp)
//     useEffect(() => {
//         let filtered = [...products];

//         // Lọc theo giá
//         if (minPrice !== '' && maxPrice !== '') {
//             filtered = filtered.filter(
//                 (product) =>
//                     product.price >= parseFloat(minPrice) && product.price <= parseFloat(maxPrice)
//             );
//         }

//         // Lọc theo tên sản phẩm
//         if (searchTerm) {
//             filtered = filtered.filter((product) =>
//                 product.name.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Sắp xếp
//         switch (sortOrder) {
//             case 'asc':
//                 filtered.sort((a, b) => a.price - b.price);
//                 break;
//             case 'desc':
//                 filtered.sort((a, b) => b.price - a.price);
//                 break;
//             case 'newest':
//                 filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//                 break;
//             case 'best_selling':
//                 filtered.sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0));
//                 break;
//             default:
//                 break;
//         }

//         setFilteredProducts(filtered);
//     }, [minPrice, maxPrice, searchTerm, sortOrder, products]);

//     // Phân trang
//     const indexOfLastProduct = currentPage * productsPerPage;
//     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//     const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//     const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//     // Xử lý sự kiện
//     const handleProductClick = (id) => {
//         navigate(`/product/${id}`);
//     };

//     const handleCategoryChange = (e) => {
//         setSelectedCategory(e.target.value);
//         setCurrentPage(1);
//     };

//     const handleBrandChange = (e) => {
//         setSelectedBrand(e.target.value);
//         setCurrentPage(1);
//     };

//     const handlePriceChange = (e) => {
//         const { name, value } = e.target;
//         const parsedValue = value !== '' ? parseFloat(value) : '';

//         if (name === 'minPrice') {
//             setMinPrice(parsedValue);
//             if (parsedValue !== '' && parsedValue > maxPrice && maxPrice !== '') {
//                 setPriceAlert('Giá tối thiểu không thể lớn hơn giá tối đa!');
//             } else {
//                 setPriceAlert('');
//             }
//         } else {
//             setMaxPrice(parsedValue);
//             if (parsedValue !== '' && parsedValue < minPrice && minPrice !== '') {
//                 setPriceAlert('Giá tối đa không thể nhỏ hơn giá tối thiểu!');
//             } else {
//                 setPriceAlert('');
//             }
//         }
//         setCurrentPage(1);
//     };

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//         setCurrentPage(1);
//     };

//     const handleSortChange = (e) => {
//         setSortOrder(e.target.value);
//         setCurrentPage(1);
//     };

//     const prevPage = () => {
//         if (currentPage > 1) setCurrentPage(currentPage - 1);
//     };

//     const nextPage = () => {
//         if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//     };

//     const formatPrice = (price) => {
//         return price ? price.toLocaleString('vi-VN') : '0';
//     };

//     return (
//         <div>
//             <div className="flex px-4 py-6 mx-40">
//                 {/* Bộ lọc bên trái */}
//                 <div className="w-1/5 p-6 mr-4 bg-gray-100 rounded-lg">
//                     <h3 className="mb-4 text-xl font-semibold text-primary">Danh mục</h3>
//                     {categories.length > 0 ? (
//                         categories.map((category) => (
//                             <div key={category.id} className="mb-3">
//                                 <label className="flex items-center text-gray-700">
//                                     <input
//                                         type="radio"
//                                         value={category.id}
//                                         checked={selectedCategory === String(category.id)}
//                                         onChange={handleCategoryChange}
//                                         className="mr-3 accent-primary"
//                                     />
//                                     {category.name}
//                                 </label>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-600">Không có danh mục nào.</p>
//                     )}

//                     <h3 className="mt-6 mb-4 text-xl font-semibold text-primary">Thương hiệu</h3>
//                     {brands.length > 0 ? (
//                         brands.map((brand) => (
//                             <div key={brand.id} className="mb-3">
//                                 <label className="flex items-center text-gray-700">
//                                     <input
//                                         type="radio"
//                                         value={brand.id}
//                                         checked={selectedBrand === String(brand.id)}
//                                         onChange={handleBrandChange}
//                                         className="mr-3 accent-primary"
//                                     />
//                                     {brand.name}
//                                 </label>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-600">Không có thương hiệu nào.</p>
//                     )}

//                     <h3 className="mt-6 mb-4 text-xl font-semibold text-primary">Khoảng giá</h3>
//                     <input
//                         type="number"
//                         name="minPrice"
//                         value={minPrice}
//                         onChange={handlePriceChange}
//                         placeholder="Giá tối thiểu"
//                         className="w-full p-2 mb-2 border rounded"
//                     />
//                     <input
//                         type="number"
//                         name="maxPrice"
//                         value={maxPrice}
//                         onChange={handlePriceChange}
//                         placeholder="Giá tối đa"
//                         className="w-full p-2 mb-2 border rounded"
//                     />
//                     {priceAlert && <p className="text-red-500">{priceAlert}</p>}

//                     <h3 className="mt-6 mb-4 text-xl font-semibold text-primary">Tìm kiếm</h3>
//                     <input
//                         type="text"
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         placeholder="Tìm theo tên sản phẩm"
//                         className="w-full p-2 mb-2 border rounded"
//                     />

//                     <h3 className="mt-6 mb-4 text-xl font-semibold text-primary">Sắp xếp</h3>
//                     <select
//                         value={sortOrder}
//                         onChange={handleSortChange}
//                         className="w-full p-2 mb-2 border rounded"
//                     >
//                         <option value="asc">Giá từ thấp đến cao</option>
//                         <option value="desc">Giá từ cao đến thấp</option>
//                     </select>
//                 </div>

//                 {/* Danh sách sản phẩm bên phải */}
//                 <div className="w-3/4">
//                     {loading ? (
//                         <p className="text-center text-gray-600">Đang tải sản phẩm...</p>
//                     ) : (
//                         <>
//                             <section id="latest-products">
//                                 <div className="flex flex-wrap -mx-2">
//                                     {currentProducts.length > 0 ? (
//                                         currentProducts.map((product) => (
//                                             <div
//                                                 key={product.id}
//                                                 className="w-full px-3 mb-10 md:w-1/2 lg:w-1/3"
//                                             >
//                                                 <div className="relative flex flex-col h-full p-5 transition-all bg-white shadow-lg cursor-pointer rounded-2xl group">
//                                                     <div className="w-full h-[250px] overflow-hidden mx-auto mb-4 relative">
//                                                         <img
//                                                             src={
//                                                                     `http://localhost:8081/images/${product.image}`
//                                                             }
//                                                             alt={product.name}
//                                                             className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                                                            
//                                                         />
//                                                     </div>

//                                                     <div className="flex flex-col justify-between flex-grow">
//     <h3 className="m-5 text-lg font-extrabold text-primary-700">
//         {product.name}
//     </h3>
//     <h4 className="mx-5 text-xl font-bold text-red-600">
//         {formatPrice(product.price)}đ
//     </h4>
// </div>


//                                                     <div className="absolute inset-0 flex items-center justify-center gap-4 p-5 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
//                                                         <button
//                                                             onClick={() =>
//                                                                 handleProductClick(product.id)
//                                                             }
//                                                             className="px-6 py-2 text-white transition-transform duration-300 ease-in-out transform bg-blue-500 rounded-lg hover:bg-blue-600 group-hover:scale-105"
//                                                         >
//                                                             Xem chi tiết
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     ) : (
//                                         <p className="w-full text-center text-gray-600">
//                                             Không có sản phẩm nào.
//                                         </p>
//                                     )}
//                                 </div>
//                             </section>

//                             {/* Phân trang */}
//                             <div className="flex items-center justify-center mt-4 space-x-2">
//                                 <button
//                                     onClick={() => setCurrentPage(1)}
//                                     disabled={currentPage === 1}
//                                     className={`p-2 ${
//                                         currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500'
//                                     } text-white rounded`}
//                                 >
//                                     Đầu
//                                 </button>
//                                 <button
//                                     onClick={prevPage}
//                                     disabled={currentPage === 1}
//                                     className={`p-2 ${
//                                         currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500'
//                                     } text-white rounded`}
//                                 >
//                                     Trang trước
//                                 </button>
//                                 <span className="self-center">
//                                     Trang {currentPage} trên {totalPages}
//                                 </span>
//                                 <button
//                                     onClick={nextPage}
//                                     disabled={currentPage === totalPages}
//                                     className={`p-2 ${
//                                         currentPage === totalPages
//                                             ? 'bg-gray-300'
//                                             : 'bg-blue-500'
//                                     } text-white rounded`}
//                                 >
//                                     Trang sau
//                                 </button>
//                                 <button
//                                     onClick={() => setCurrentPage(totalPages)}
//                                     disabled={currentPage === totalPages}
//                                     className={`p-2 ${
//                                         currentPage === totalPages
//                                             ? 'bg-gray-300'
//                                             : 'bg-blue-500'
//                                     } text-white rounded`}
//                                 >
//                                     Cuối
//                                 </button>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Product;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryService from '../../Service/CategoryService';
import BrandService from '../../Service/BrandService';
import ProductService from '../../Service/ProductServive';

function Product() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(4); // 4 sản phẩm mỗi trang
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [priceAlert, setPriceAlert] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const categoriesResponse = await CategoryService.getList();
                const categoryList = Array.isArray(categoriesResponse) ? categoriesResponse : categoriesResponse?.data || [];
                setCategories([{ id: 'all', name: 'Tất cả danh mục' }, ...categoryList]);

                const brandsResponse = await BrandService.getList();
                const brandList = Array.isArray(brandsResponse) ? brandsResponse : brandsResponse?.data || [];
                setBrands([{ id: 'all', name: 'Tất cả thương hiệu' }, ...brandList]);

                await fetchProductsByFilter(selectedCategory, selectedBrand);
            } catch (error) {
                console.error('Lỗi lấy dữ liệu:', error);
                toast.error('Không thể tải dữ liệu!');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const fetchProductsByFilter = async (categoryId, brandId) => {
        setLoading(true);
        try {
            const productList = await ProductService.getProductsByFilter(categoryId, brandId);
            const productsData = Array.isArray(productList) ? productList : productList?.data || [];
            setProducts(productsData);
            setFilteredProducts(productsData);
        } catch (error) {
            console.error('Lỗi lấy sản phẩm:', error);
            setProducts([]);
            setFilteredProducts([]);
            toast.error('Không thể tải sản phẩm!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductsByFilter(selectedCategory, selectedBrand);
        setCurrentPage(1);
    }, [selectedCategory, selectedBrand]);

    useEffect(() => {
        let filtered = [...products];

        if (minPrice !== '' && maxPrice !== '') {
            filtered = filtered.filter(product => 
                product.price >= parseFloat(minPrice) && product.price <= parseFloat(maxPrice)
            );
        }

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        switch (sortOrder) {
            case 'asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case 'best_selling':
                filtered.sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0));
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    }, [minPrice, maxPrice, searchTerm, sortOrder, products]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };

    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
    const handleBrandChange = (e) => setSelectedBrand(e.target.value);

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = value !== '' ? parseFloat(value) : '';

        if (name === 'minPrice') {
            setMinPrice(parsedValue);
            if (parsedValue !== '' && parsedValue > maxPrice && maxPrice !== '') {
                setPriceAlert('Giá tối thiểu không thể lớn hơn giá tối đa!');
            } else {
                setPriceAlert('');
            }
        } else {
            setMaxPrice(parsedValue);
            if (parsedValue !== '' && parsedValue < minPrice && minPrice !== '') {
                setPriceAlert('Giá tối đa không thể nhỏ hơn giá tối thiểu!');
            } else {
                setPriceAlert('');
            }
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
        setCurrentPage(1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const formatPrice = (price) => price ? price.toLocaleString('vi-VN') : '0';

    return (
        <div className="px-4 py-8 mx-auto max-w-7xl">
            {/* FILTER BAR TRÊN CÙNG */}
            <div className="flex flex-wrap items-center justify-between p-4 mb-8 bg-gray-100 rounded-2xl">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Danh mục */}
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="p-2 border rounded-lg"
                    >
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>

                    {/* Thương hiệu */}
                    <select
                        value={selectedBrand}
                        onChange={handleBrandChange}
                        className="p-2 border rounded-lg"
                    >
                        {brands.map(brand => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                    </select>

                    {/* Khoảng giá */}
                    <input
                        type="number"
                        name="minPrice"
                        value={minPrice}
                        onChange={handlePriceChange}
                        placeholder="Giá từ"
                        className="p-2 border rounded-lg w-24"
                    />
                    <input
                        type="number"
                        name="maxPrice"
                        value={maxPrice}
                        onChange={handlePriceChange}
                        placeholder="Giá đến"
                        className="p-2 border rounded-lg w-24"
                    />
                    {priceAlert && <p className="text-red-500 text-sm">{priceAlert}</p>}
                </div>

                {/* Search + Sort */}
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Tìm sản phẩm..."
                        className="p-2 border rounded-lg"
                    />
                    <select
                        value={sortOrder}
                        onChange={handleSortChange}
                        className="p-2 border rounded-lg"
                    >
                        <option value="asc">Giá tăng dần</option>
                        <option value="desc">Giá giảm dần</option>
                    </select>
                </div>
            </div>

            {/* DANH SÁCH SẢN PHẨM */}
            {loading ? (
                <p className="text-center">Đang tải sản phẩm...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {currentProducts.length > 0 ? (
                            currentProducts.map(product => (
                                <div
                                    key={product.id}
                                    className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                                >
                                  <div className="overflow-hidden rounded-lg h-52">
    <img
        src={`http://localhost:8081/images/${product.image}`}
        alt={product.name}
        className="w-full h-full object-cover rounded-lg shadow-md"
    />
</div>

                                    <div className="mt-4">
                                        <h3 className="text-lg font-bold text-primary">{product.name}</h3>
                                        <p className="mt-2 text-xl text-red-500">{formatPrice(product.price)}₫</p>
                                        <button
                                            onClick={() => handleProductClick(product.id)}
                                            className="block w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                                        >
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="w-full text-center text-gray-600">Không có sản phẩm nào.</p>
                        )}
                    </div>

                    {/* PAGINATION */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                        >
                            Đầu
                        </button>
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                        >
                            Trước
                        </button>
                        <span>Trang {currentPage} / {totalPages}</span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                        >
                            Sau
                        </button>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                        >
                            Cuối
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Product;
