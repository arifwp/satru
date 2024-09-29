import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContentContainer } from "./components/containers/ContentContainer";
import { RequiredAuth } from "./components/middleware/RequiredAuth";
import { RequiredOwner } from "./components/middleware/RequiredOwner";
import customTheme from "./customTheme";
import "./index.css";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { AddDiscountPage } from "./pages/dashboard/discount/AddDiscountPage";
import { DiscountPage } from "./pages/dashboard/discount/DiscountPage";
import { EditDiscountPage } from "./pages/dashboard/discount/EditDiscountPage";
import { AddEmployeePage } from "./pages/dashboard/employee/AddEmployeePage";
import { EmployeePage } from "./pages/dashboard/employee/EmployeePage";
import { HomePage } from "./pages/dashboard/HomePage";
import { AddMemberPage } from "./pages/dashboard/member/AddMemberPage";
import { DetailMemberPage } from "./pages/dashboard/member/DetailMemberPage";
import { EditMemberPage } from "./pages/dashboard/member/EditMemberPage";
import { MemberPage } from "./pages/dashboard/member/MemberPage";
import { AddOutletPage } from "./pages/dashboard/outlet/AddOutletPage";
import { DetailOutletPage } from "./pages/dashboard/outlet/DetailOutletPage";
import { OutletPage } from "./pages/dashboard/outlet/OutletPage";
import { BrandPage } from "./pages/dashboard/product/brand/BrandPage";
import { CategoryPage } from "./pages/dashboard/product/category/CategoryPage";
import { EditProductPage } from "./pages/dashboard/product/edit/EditProductPage";
import { AddProductPage } from "./pages/dashboard/product/productroot/AddProductPage";
import { ProductPage } from "./pages/dashboard/product/productroot/ProductPage";
import { TaxPage } from "./pages/dashboard/product/tax/TaxPage";
import { TransactionContainer } from "./pages/dashboard/transaction/TransactionContainter";
import { FillData } from "./pages/FillDataPage";
import { EmailPage } from "./pages/menu/profile/EmailPage";
import { PasswordPage } from "./pages/menu/profile/PasswordPage";
import { ProfilePage } from "./pages/menu/profile/ProfilePage";
import { WhatsappPage } from "./pages/menu/profile/WhatsappPage";

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
          path="/profile/email"
          element={
            <RequiredAuth>
              <ContentContainer label="Profil" isSubPage={true}>
                <EmailPage />
              </ContentContainer>
            </RequiredAuth>
          }
        />

        <Route
          path="/profile/whatsapp"
          element={
            <RequiredAuth>
              <ContentContainer label="Profil" isSubPage={true}>
                <WhatsappPage />
              </ContentContainer>
            </RequiredAuth>
          }
        />

        <Route
          path="/profile/password"
          element={
            <RequiredAuth>
              <ContentContainer label="Profil" isSubPage={true}>
                <PasswordPage />
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

        <Route
          path="/product/tax"
          element={
            <RequiredAuth>
              <RequiredOwner>
                <ContentContainer label="Pajak" isSubPage={false}>
                  <TaxPage />
                </ContentContainer>
              </RequiredOwner>
            </RequiredAuth>
          }
        />

        <Route
          path="/transaction"
          element={
            <RequiredAuth>
              <TransactionContainer />
            </RequiredAuth>
          }
        />

        {/* <Route
          path="/transaction/product"
          element={
            <RequiredAuth>
              <ContentContainer label="Tranksasi" isSubPage={false}>
                <TransactionPage />
              </ContentContainer>
            </RequiredAuth>
          }
        /> */}

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

        <Route
          path="/discount"
          element={
            <RequiredAuth>
              <ContentContainer label="Diskon" isSubPage={false}>
                <DiscountPage />
              </ContentContainer>
            </RequiredAuth>
          }
        />

        <Route
          path="/discount/add-discount"
          element={
            <RequiredAuth>
              <RequiredOwner>
                <ContentContainer label="Diskon" isSubPage={true}>
                  <AddDiscountPage />
                </ContentContainer>
              </RequiredOwner>
            </RequiredAuth>
          }
        />

        <Route
          path="/discount/edit-discount/:discountId"
          element={
            <RequiredAuth>
              <RequiredOwner>
                <ContentContainer label="Diskon" isSubPage={true}>
                  <EditDiscountPage />
                </ContentContainer>
              </RequiredOwner>
            </RequiredAuth>
          }
        />

        <Route
          path="/outlet"
          element={
            <RequiredAuth>
              <RequiredOwner>
                <ContentContainer label="Outlet" isSubPage={false}>
                  <OutletPage />
                </ContentContainer>
              </RequiredOwner>
            </RequiredAuth>
          }
        />

        <Route
          path="/outlet/add-outlet"
          element={
            <RequiredAuth>
              <RequiredOwner>
                <ContentContainer label="Tambah Outlet" isSubPage={true}>
                  <AddOutletPage />
                </ContentContainer>
              </RequiredOwner>
            </RequiredAuth>
          }
        />

        <Route
          path="/outlet/detail-outlet/:outletId"
          element={
            <RequiredAuth>
              <RequiredOwner>
                <ContentContainer label="Detail Outlet" isSubPage={true}>
                  <DetailOutletPage />
                </ContentContainer>
              </RequiredOwner>
            </RequiredAuth>
          }
        />

        <Route
          path="/member"
          element={
            <RequiredAuth>
              <ContentContainer label="Member" isSubPage={false}>
                <MemberPage />
              </ContentContainer>
            </RequiredAuth>
          }
        />

        <Route
          path="/member/add-member"
          element={
            <RequiredAuth>
              <ContentContainer label="Tambah Member" isSubPage={true}>
                <AddMemberPage />
              </ContentContainer>
            </RequiredAuth>
          }
        />

        <Route
          path="/member/detail-member/:memberId"
          element={
            <RequiredAuth>
              <ContentContainer label="Detail Member" isSubPage={true}>
                <DetailMemberPage />
              </ContentContainer>
            </RequiredAuth>
          }
        />

        <Route
          path="/member/edit-member/:memberId"
          element={
            <RequiredAuth>
              <ContentContainer label="Detail Member" isSubPage={true}>
                <EditMemberPage />
              </ContentContainer>
            </RequiredAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
