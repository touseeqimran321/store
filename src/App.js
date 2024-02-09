import React from 'react';
import { createBrowserRouter } from "react-router-dom";  
import ProductPage from './components/ProductPage';
import Nav from './components/Nav'; // Import the Nav component
import ProductList from './components/ProductList';
import Cart from './components/CartList';
import LogIn from './components/LogIn';
import Profile from './components/Profile';
import ProductDetails from './components/ProductDetails';

const router = createBrowserRouter([
  {
    path: '/Product',
    element: <div><Nav /><ProductPage /></div>, // Include Nav component here
  },
  {
    path: '/list',
    element: <div><Nav /><ProductList /></div>, // Include Nav component here
  },
  {
    path: '/Cart',
    element: <div><Nav /><Cart /></div>, // Include Nav component here
  },
  {
    path: '/SignUp',
    element: <div><Nav /><LogIn /></div>, // Include Nav component here
  },
  {
    path: '/LogIn',
    element: <div><Nav /><LogIn /></div>, // Include Nav component here
  },
  {
    path:'/product/:id',
    element:<div> <Nav /><ProductDetails /></div>, // Include Nav component here
  }
]);

export default router;
