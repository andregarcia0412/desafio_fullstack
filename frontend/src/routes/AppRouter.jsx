import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/auth";
import Home from "../pages/home";
import NotFound from "../pages/not-found";
import ResetPassword from "../pages/password-reset";
import ForgotPassword from "../pages/forgot-password";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
