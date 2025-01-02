import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailPage from "../pages/ProductDetails";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import UserProfilePage from "../pages/UserProfile";
import AboutPage from "../pages/AboutPage";
import AddProductPage from "../pages/AddProduct";

const AppRoutes = () =>{

  return (
    <Routes>
      {/* USER ROUTES */}
      <Route path ="/" element={<LandingPage />} />
      <Route path ="/home" element={<HomePage />} />
      <Route path ="/product" element={<ProductListPage />} />
      <Route path="/productlist" element={<ProductDetailPage/>} />
      <Route path="/cart" element={<ShoppingCartPage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile" element={<UserProfilePage/>} />
      <Route path="/about" element={<AboutPage />} />
      
      {/* ADMIN ROUTES */}
      //dashboard
      //admin/products
      //admin/categories
      //admin/orders
      //admin/users
      //admin/producst/add
      //admin/product/edit/:id
      <Route path="/add" element={<AddProductPage />} />
    </Routes>
  );
}

export default AppRoutes;