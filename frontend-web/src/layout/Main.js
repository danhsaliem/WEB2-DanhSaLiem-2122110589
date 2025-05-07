import React from 'react'

import { Route,Routes } from 'react-router-dom'; 
import Register from '../pages/login/Register';
import Login from '../pages/login/Login'
import AllProduct from '../pages/Product/AllProduct';
import Profile from '../pages/login/Profile';
import ProductDetail from '../pages/Product/ProductDetail';
import Contact from '../pages/Contact';
import Cart from '../pages/Product/Cart';
import Checkout from '../pages/Product/Checkout';
import OrderSuccess from '../pages/Product/OrderSuccess';





const Main = () => (
  <main>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/allProduct" element={<AllProduct/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/contacts" element={<Contact />} />
<Route path="/carts" element={<Cart />} />
<Route path="/checkout" element={<Checkout />} />
<Route path="/order-success" element={<OrderSuccess />} />
    </Routes>
    
  </main>
)

export default Main;