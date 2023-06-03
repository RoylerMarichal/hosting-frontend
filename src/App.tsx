import React from "react";
import TemplateLanding from "./components/layouts/TemplateLanding";
import HomePage from "./pages/LandingPage";

//Profile Folder
import SettingProfilePage from "./pages/profile/SettingsProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import LoginPage from "./pages/auth/LoginPage";
import AboutPage from "./pages/platform/AboutPage";
import CustomLayout from "./components/layouts/CustomLayout";
import ReadMap from "./pages/platform/ReadMap";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PrivatePages from "./components/layouts/PrivatePages";
import NotificationsPage from "./pages/profile/NotificationsPage";
import LandingPage from "./pages/LandingPage";
import ServicesPage from "./pages/ServicesPage";
import InvoicesPage from "./pages/InvoicesPage";
import CartPage from "./pages/CartPage";
import HelpPage from "./pages/HelpPage";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div>
            <Routes>
              <Route element={<TemplateLanding />}>
                <Route element={<PrivatePages />}>
                  <Route
                    key={"/home"}
                    path="/home"
                    element={<HomePage />}
                  />
                  <Route
                    key={"/services"}
                    path="/services"
                    element={<ServicesPage />}
                  />
                  <Route
                    key={"/buy"}
                    path="/cart"
                    element={<CartPage />}
                  />
                  <Route
                    key={"/help"}
                    path="/help"
                    element={<HelpPage />}
                  />
                  <Route
                    key={"/invoices"}
                    path="/invoices"
                    element={<InvoicesPage />}
                  />
                  <Route
                    key={"/notifications"}
                    path="/notifications"
                    element={<NotificationsPage />}
                  />
                  <Route
                    key={"/settings"}
                    path="/settings"
                    element={<SettingProfilePage />}
                  />
                </Route>
                <Route key={"/"} path="/" element={<LandingPage />} />
                <Route element={<CustomLayout />}>
                  <Route
                    key={"/auth/login"}
                    path="/auth/login/:page"
                    element={<LoginPage />}
                  />
                  <Route
                    key={"/auth/forgotpassword"}
                    path="/auth/forgotpassword"
                    element={<ForgotPassword />}
                  />
                </Route>
                <Route key={"/about"} path="/about" element={<AboutPage />} />
                <Route key={"/roadmap"} path="/roadmap" element={<ReadMap />} />
              </Route>{" "}
            </Routes>
            <ToastContainer />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
