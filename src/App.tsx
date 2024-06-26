import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContentContainer } from "./components/containers/ContentContainer";
import customTheme from "./customTheme";
import "./index.css";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { HomePage } from "./pages/dashboard/HomePage";
import { ProductPage } from "./pages/dashboard/product/ProductPage";
import { AddProductPage } from "./pages/dashboard/product/AddProductPage";

export const App = () => (
  <ChakraProvider theme={customTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ContentContainer label="Dashboard" isSubPage={false}>
              <HomePage />
            </ContentContainer>
          }
        />

        <Route
          path="/product"
          element={
            <ContentContainer label="Produk" isSubPage={false}>
              <ProductPage />
            </ContentContainer>
          }
        />

        <Route
          path="/product/add-product"
          element={
            <ContentContainer label="Tambah Produk" isSubPage={true}>
              <AddProductPage />
            </ContentContainer>
          }
        />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
