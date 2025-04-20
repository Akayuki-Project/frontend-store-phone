import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import ProductList from "./components/Product/ProductList";
import Product from "./components/Product/Product";
import Detail from "./components/Product/Detail";
import ScrollToTop from "./scroll/ScrollToTop";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Sidebar from "./components/Sidebar/Sidebar";

import DashboardHome from "./pages/dashboard/Dashboard";
import Login from "./pages/Login";
import Products from "./pages/dashboard/Products";
import AddProduct from "./pages/dashboard/ProductCreate";
import UpdateProduct from "./pages/dashboard/ProductUpdate";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./utils/ProtectedRoute";
import SuccessPayment from "./pages/SuccessPayment";

const { Header, Content } = Layout;

// 👉 Komponen Home Page (User)
const Heros = () => {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <ProductList />
    </main>
  );
};

// 👉 Layout Dashboard Admin
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            boxShadow: "0 2px 8px #f0f1f2",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{ fontSize: "16px", marginLeft: "16px" }}
          />
        </Header>
        <Content
          style={{
            margin: "16px",
            padding: "16px",
            background: "#fff",
            minHeight: "280px",
            overflowX: "auto", // biar bisa scroll kalau mepet
          }}
        >
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="products" element={<Products />} />
            <Route path="products/create" element={<AddProduct />} />
            <Route path="products/:id" element={<UpdateProduct />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

// 👉 App Utama
const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Heros />
              <Footer />
            </>
          }
        />
        <Route
          path="/product"
          element={
            <>
              <Navbar />
              <Product />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <>
              <Navbar />
              <Detail />
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout/:id"
          element={
            <>
              <Navbar />
              <Checkout />
              <Footer />
            </>
          }
        />
        <Route
          path="/success-payment/:id"
          element={
            <>
              <SuccessPayment />
            </>
          }
        />

        {/* Auth Route */}
        <Route path="/signin" element={<Login />} />

        {/* Admin Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<DashboardLayout />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;