import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './Home/Home.tsx';
import HowItWorks from './Home/HowItWorks.tsx';
import About from './Home/About.tsx';
import Register from './Form/register/Register.tsx';
import Login from './Form/login/Login.tsx';
import ResetPassword from './Form/login/ResetPassword.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import NavFooter from './Home/NavFooter.tsx';
import App from './App.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient}>
      <BrowserRouter>
      <Routes>
        <Route  element={<App />}>
          <Route element={<NavFooter />}>
            <Route index element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/how-it-works' element={<HowItWorks />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password-reset" element={<ResetPassword />} />
          </Route>
      </Routes>
      </BrowserRouter>
  </QueryClientProvider>
  </StrictMode>
);
