import React from "react";
import TemplateLanding from "./components/layouts/TemplateLanding";
import HomePage from "./pages/LandingPage";

//Profile Folder
import SettingProfilePage from "./pages/profile/SettingsProfilePage";
import ProfilePage from "./pages/profile/ProfilePage";
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
                    key={"/profile"}
                    path="/profile"
                    element={<ProfilePage />}
                  />
                  <Route
                    key={"/home"}
                    path="/home"
                    element={<HomePage />}
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
                <Route
                  key={"username"}
                  path="/:username"
                  element={<ProfilePage />}
                />
              </Route>{" "}
            </Routes>
            <ToastContainer />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
