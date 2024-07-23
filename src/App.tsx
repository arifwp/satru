import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContentContainer } from "./components/containers/ContentContainer";
import { RequiredAuth } from "./components/middleware/RequiredAuth";
import customTheme from "./customTheme";
import "./index.css";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { HomePage } from "./pages/dashboard/HomePage";
import { BrandPage } from "./pages/dashboard/product/brand/BrandPage";
import { CategoryPage } from "./pages/dashboard/product/category/CategoryPage";
import { EditProductPage } from "./pages/dashboard/product/edit/EditProductPage";
import { AddProductPage } from "./pages/dashboard/product/productroot/AddProductPage";
import { ProductPage } from "./pages/dashboard/product/productroot/ProductPage";
import { FillData } from "./pages/FillDataPage";
import { ProfilePage } from "./pages/menu/profile/ProfilePage";

export const App = () => (
  <ChakraProvider theme={customTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/fill-data"
          element={
            <RequiredAuth>
              <FillData />
            </RequiredAuth>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequiredAuth>
              <ContentContainer label="Dashboard" isSubPage={false}>
                <HomePage />
              </ContentContainer>
            </RequiredAuth>
          }
        />

        <Route
          path="/profile"
          element={
            <RequiredAuth>
              <ContentContainer label="Profil" isSubPage={true}>
                <ProfilePage />
              </ContentContainer>
            </RequiredAuth>
          }
        />

        <Route
          path="/product"
          element={
            <RequiredAuth>
              <ContentContainer label="Produk" isSubPage={false}>
                <ProductPage />
              </ContentContainer>
            </RequiredAuth>
          }
        />

        <Route
          path="/product/add-product"
          element={
            <RequiredAuth>
              <ContentContainer label="Tambah Produk" isSubPage={true}>
                <AddProductPage />
              </ContentContainer>
            </RequiredAuth>
          }
        />

        <Route
          path="/product/edit-product/:productId"
          element={
            <RequiredAuth>
              <ContentContainer label="Edit Produk" isSubPage={true}>
                <EditProductPage />
              </ContentContainer>
            </RequiredAuth>
          }
        />

        <Route
          path="/product/category"
          element={
            <RequiredAuth>
              <ContentContainer label="Kategori" isSubPage={false}>
                <CategoryPage />
              </ContentContainer>
            </RequiredAuth>
          }
        />

        <Route
          path="/product/brand"
          element={
            <RequiredAuth>
              <ContentContainer label="Merk" isSubPage={false}>
                <BrandPage />
              </ContentContainer>
            </RequiredAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
