import React from 'react';
import {createBrowserRouter,} from "react-router-dom";  
import ProductPage from './components/ProductPage';
import Nav from './components/Nav';
import ProductList from './components/ProductList';
import Cart from './components/CartList';
import LogIn from './components/LogIn';
import Profile from './components/Profile';
import ProductDetails from './components/ProductDetails';



const router = createBrowserRouter([
  {
    path: '/Product',
    element: <div><Nav/><ProductPage/></div>,
},
  {
    path: '/list',
    element: <div><Nav/><ProductList /></div>,
  },
  {
    path: '/Cart',
    element: <div><Nav/><Cart/></div>
  },
  {
    path: '/SignUp',
    element: <div><Nav/><LogIn/></div>
  },
  // {
  //   path: '/SignUp',
  //   element: <div><Nav/><ProductPage/></div> 
  // },
  {
    path: '/LogIn',
    element: <div><Nav/><LogIn/></div>
  },
 
  {
    path:'/product/:id',
    element:<div> <Nav/><ProductDetails/></div>
  }
  
  // {
  //   path:'/ProductDetails',
  //   element:<div> <Nav/><Productlist/></div>
  // }
  
]);

export default router;
