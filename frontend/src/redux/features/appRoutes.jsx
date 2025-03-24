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
import AddSellerPage from "../../pages/AddStorePage";
import AddCategory from "../../pages/AddCategory";

//errorpages
import ErrorPage from "../../pages/ErrorPage";
import NotAuthorizedPage from "../../pages/NotAuthorizedPage";

import ProtectedRoutes from "../../redux/features/protectedRoutes"

const AppRoutes = () =>{

  return (
    <Routes>
      {/* USER ROUTES */}
      <Route path ="/" element={<LandingPage />} />
      <Route path ="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/about" element={<AboutPage />} />

      <Route path="/store" element={<AddSellerPage />} />
      
      
      <Route path="/profile" element={<UserProfilePage/>} />


      {/* ADMIN ROUTES */}
      
      <Route path="/admin"
      element={
        <ProtectedRoutes adminOnly={true}>
          <ErrorPage/>
        </ProtectedRoutes>
        }
      />
      //dashboard
      //admin/products
      //admin/categories
      //admin/orders
      //admin/users
      //admin/producst/add
      //admin/product/edit/:id
      <Route path="/cat" element={<AddCategory />} />
      <Route path="/add" element={<AddProductPage />} />

      <Route path="/not-authorized" element={<NotAuthorizedPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRoutes;