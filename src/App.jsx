import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Nav from './Component/Navbar/Nav';
import Footer from './Component/Footer/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './Main/Navibar/Navbar.jsx';
import Menu from './Component/Menubar/Menu.jsx';
const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  return (
    <div>
         <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
 <Navbar isMenuOpen={isMenuOpen} onMenuToggle={handleMenuToggle} />
        <Menu isMenuOpen={isMenuOpen} onMenuClose={handleMenuClose} />
      {/* <Nav></Nav> */}
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default App;