import React from 'react';
import { createBrowserRouter } from 'react-router-dom';  
import ProductPage from './components/ProductPage';
import Nav from './components/Nav'; // Import the Nav component
import ProductList from './components/ProductList';
import Cart from './components/CartList';
import LogIn from './components/LogIn';
import Profile from './components/Profile';
import ProductDetails from './components/ProductDetails';
import Checkoutform from './components/Checkoutform';
import SucessFull from './components/SucessFull';
import Dashboard from './components/Dashboard';
import LineChartPage from './components/LineChart';
import OrderHistory from './components/OrderHistory';
import { AuthProvider } from './AuthContext'; // Import AuthProvider from AuthContext
import ParentComponent from './components/ParentComponent';

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
  },
  {
    path:'/Checkoutform',
    element:<div> <Nav /><Checkoutform /></div>, // Include Nav component here
  },
  {
    path:'/SucessFull',
    element:<div> <Nav /><SucessFull /></div>, // Include Nav component here
  },
  {
    path:'/Profile',
    element:<div> <Nav /><Profile /></div>, // Include Nav component here
  },
  {
    path:'/Dashboard',
    element:<div> <Nav /><Dashboard /></div>, // Include Nav component here
  },
  {
    path:'/LineChart',
    element:<div> <Nav /><LineChartPage/></div>, // Include Nav component here
  },
  {
    path:'/History',
    element:<div> <Nav /><OrderHistory/></div>, // Include Nav component here
  },
]);

// const AppRouter = () => (
//   <AuthProvider>
//     <ParentComponent />
//     {router}
//   </AuthProvider>
// );

export default router;
