import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './Home/Home.tsx';
import HowItWorks from './Home/HowItWorks.tsx';
import About from './Home/About.tsx';
import Register from './Form/Register.tsx';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import NavFooter from './Home/NavFooter.tsx';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route element={<NavFooter />}>
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/how-it-works' element={<HowItWorks />} />
      </Route>
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
);
