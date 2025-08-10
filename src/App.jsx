import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Dashboard from "./pages/Dashboard";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import ProductList from "./components/Products/ProductList";
import AddProduct from "./components/Products/AddProduct";
import EditProduct from "./components/Products/EditProduct";
import CategoryList from "./components/Categories/CategoryList";
import AddCategory from "./components/Categories/AddCategory";
import OrderList from "./components/Orders/OrderList";
import UpdateStatus from "./components/Orders/UpdateStatus";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AdminHeader />
      <Toaster position="top-center" richColors />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
        <Route path="/products/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        <Route path="/products/:id/edit" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
        <Route path="/categories/add" element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute> <OrderList /></ProtectedRoute>} />
        <Route path="/orders/:id/update" element={<ProtectedRoute><UpdateStatus /></ProtectedRoute>} />
      </Routes>

      <AdminFooter />
    </>
  );
}

export default App;
