import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./Home/Home.tsx";
import HowItWorks from "./Home/HowItWorks.tsx";
import About from "./Home/About.tsx";
import Register from "./Form/register/Register.tsx";
import Login from "./Form/login/Login.tsx";
import ResetPassword from "./Form/login/ResetPassword.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ContextProvider } from "./GeneralContext.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavFooter from "./Home/NavFooter.tsx";
import App from "./App.tsx";
import VerifyPayment from "./Dashboard/VerifyPayment.tsx";
import Transaction from "./Dashboard/Transactions.tsx";
import User from "./Dashboard/User.tsx";
import TransDetails from "./Dashboard/TransDetails.tsx";
import DashboardNavbar from "./Dashboard/DashboardNav.tsx";
import Dashboard from "./Dashboard/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<App />}>
              <Route element={<NavFooter />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
              </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/password-reset" element={<ResetPassword />} />
            </Route>
            <Route element={<DashboardNavbar />}>
              <Route index path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/trans/verify" element={<VerifyPayment />} />
              <Route path="/dashboard/trans/" element={<Transaction />} />
              <Route path="/dashboard/user" element={<User />} />
              <Route path="/dashboard/trans/details/:ref" element={<TransDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
