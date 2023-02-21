import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Header from "./components/Header/Header";
import Home from "./components/Pages/Home";
import AuthForm from "./components/Auth/AuthForm";

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Header />, 
    children: [
      { path: "/", element: <Home/> },
      { path: "/authform", element: <AuthForm/>},
    ], 
  },
]);

function App() {
  return (
    <>
      <ToastContainer/>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
