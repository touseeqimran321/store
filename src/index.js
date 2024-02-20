import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext'; // Import AuthProvider from AuthContext
import SignUpLogin from './components/LogIn'; // Import your login page component


import {
  RouterProvider,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
       {/* Wrap your RouterProvider with AuthProvider */}
      <RouterProvider router={router}>
        {/* Render your login page component within the RouterProvider */}
        <SignUpLogin />

      </RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
