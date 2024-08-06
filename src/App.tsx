import { ChakraProvider, HStack } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContentContainer } from "./components/containers/ContentContainer";
import { RequiredAuth } from "./components/middleware/RequiredAuth";
import { RequiredOwner } from "./components/middleware/RequiredOwner";
import customTheme from "./customTheme";
import "./index.css";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { AddEmployeePage } from "./pages/dashboard/employee/AddEmployeePage";
import { EmployeePage } from "./pages/dashboard/employee/EmployeePage";
import { HomePage } from "./pages/dashboard/HomePage";
import { BrandPage } from "./pages/dashboard/product/brand/BrandPage";
import { CategoryPage } from "./pages/dashboard/product/category/CategoryPage";
import { EditProductPage } from "./pages/dashboard/product/edit/EditProductPage";
import { AddProductPage } from "./pages/dashboard/product/productroot/AddProductPage";
import { ProductPage } from "./pages/dashboard/product/productroot/ProductPage";
import { ProductTransactionPage } from "./pages/dashboard/transaction/ProductTransactionPage";
import { FillData } from "./pages/FillDataPage";
import { ProfilePage } from "./pages/menu/profile/ProfilePage";
import { TransactionPage } from "./pages/dashboard/transaction/TransactionPage";

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

        {/* <Route
          path="/transaction"
          element={
            <RequiredAuth>
              <ContentContainer label="Tranksasi" isSubPage={false}>
                <TransactionPage />
              </ContentContainer>
            </RequiredAuth>
          }
        /> */}

        <Route
          path="/transaction"
          element={
            <RequiredAuth>
              <HStack w={"100%"} align={"start"}>
                <ContentContainer label="Tranksasi" isSubPage={false} w={"70%"}>
                  <ProductTransactionPage />
                </ContentContainer>
                <TransactionPage w={"30%"} />
              </HStack>
            </RequiredAuth>
          }
        />

        <Route
          path="/transaction/product"
          element={
            <RequiredAuth>
              <ContentContainer label="Tranksasi" isSubPage={false}>
                <ProductTransactionPage />
              </ContentContainer>
            </RequiredAuth>
          }
        />

        <Route
          path="/employee"
          element={
            <RequiredAuth>
              <RequiredOwner>
                <ContentContainer label="Karyawan" isSubPage={false}>
                  <EmployeePage />
                </ContentContainer>
              </RequiredOwner>
            </RequiredAuth>
          }
        />

        <Route
          path="/employee/add-employee"
          element={
            <RequiredAuth>
              <RequiredOwner>
                <ContentContainer label="Tambah Karyawan" isSubPage={true}>
                  <AddEmployeePage />
                </ContentContainer>
              </RequiredOwner>
            </RequiredAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
