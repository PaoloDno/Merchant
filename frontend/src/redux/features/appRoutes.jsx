import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../../pages/LandingPage";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import SignUpPage from "../../pages/SignUpPage";
import UserProfilePage from "../../pages/ProfilePages/ProfileDisplayPage";
import AboutPage from "../../pages/AboutPage";

//test
import AddProductPage from "../../pages/AddProduct";
import AddSellerPage from "../../pages/AddStorePage"

const AppRoutes = () =>{

  return (
    <Routes>
      {/* USER ROUTES */}
      <Route path ="/" element={<LandingPage />} />
      <Route path ="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile" element={<UserProfilePage/>} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/store" element={<AddSellerPage />} />
      
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