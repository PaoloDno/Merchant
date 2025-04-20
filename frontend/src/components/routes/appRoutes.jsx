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

//adminpages
import AdminDashboard from "../../pages/AdminDashboard/DisplayAdmin";

//profiles
import ViewProfilePage from "../../pages/ProfilePages/ViewProfilePage";

//errorpages
import ErrorPage from "../../pages/ErrorPage";
import NotAuthorizedPage from "../../pages/NotAuthorizedPage";

//stores
import MyStorePage from "../../pages/StoresPages/MyStorePage";
import AddStoreProductPage from "../../pages/StoresPages/CreateMyProduct";
import ViewStorePage from "../../pages/StoresPages/ViewStorePage";

//product
import ViewProductPage from "../../pages/ProductPages/ViewProductPage";
import HomeProductPage from "../../pages/ProductPages/HomeProductPages";
import ProtectedRoutes from "./protectedRoutes"

//test

import ProductHomeSearchBar from "../search/product/ProductHomeSearchBar";

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

      <Route path="/test" element={<ProductHomeSearchBar />} />
      
      {/* profile */}
      <Route path="/profile" element={<UserProfilePage/>} />
      <Route path="/viewProfile/:profileId" element={<ViewProfilePage/>} />
      




      {/* store */}
      <Route path="/MyStore/:storeId" element={<MyStorePage />} />
      <Route path="/addProduct/:storeId" element={<AddStoreProductPage />} />
      <Route path="/ViewStore/:storeId" element={<ViewStorePage />} />
      

      {/* product */}
      <Route path="/product" element={<HomeProductPage/>} />
      <Route path="/viewProduct/:productId" element={<ViewProductPage />} />


      {/* ADMIN ROUTES */}
      
      <Route path="/admin"
      element={
        <ProtectedRoutes adminOnly={true}>
          <AdminDashboard/>
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