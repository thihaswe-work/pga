import Home from "@/app/routes/app/home";

import { BrowserRouter, Route, Routes } from "react-router";

import Login from "./routes/auth/login";
import Register from "./routes/auth/register";
import Setting from "./routes/app/setting";
import { AuthLayout, DashboardLayout } from "@/components/layouts";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard/home" element={<Home />} />
          <Route path="/dashboard/setting" element={<Setting />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
