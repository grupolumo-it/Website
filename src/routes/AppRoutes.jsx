import { Routes, Route } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout.jsx";
import HomeClient from "../pages/client/Home.jsx";
import ProductDetail from "../pages/client/home/product/ProductDetail.jsx";


export default function AppRoutes() {
    
  return (
    <Routes>

      <Route path="/" element={
          <ClientLayout>
            <HomeClient />
          </ClientLayout>
      }/>
      <Route path="/products/:slug"element={
        <ClientLayout>
        <ProductDetail />
        </ClientLayout>
        
      }/>
      <Route path="/seller" element={<h1>Dashboard Seller</h1>} />

    
      <Route path="/admin" element={<h1>Dashboard Admin</h1>} />

    </Routes>
  );
  
}