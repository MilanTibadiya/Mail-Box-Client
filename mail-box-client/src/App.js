import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Header from "./components/Header/Header";
import Home from "./components/Pages/Home/Home";
import AuthForm from "./components/Auth/AuthForm";
import MailBox from "./components/Pages/Mail/MailBox";
import PrivateRoute from "./components/Pages/PrivateRoute";
import Inbox from "./components/Pages/Mail/Inbox";
import Mail from "./components/Pages/Mail/Mail";
import SentMail from "./components/Pages/Mail/SentMail";

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Header />, 
    children: [
      { path: "/", element: <PrivateRoute><Home/></PrivateRoute> },
      { path: "/authform", element: <AuthForm/> },
      { path: "/sendmail", element: <PrivateRoute><MailBox/></PrivateRoute> },
      { path: "/inbox", element: <PrivateRoute><Inbox/></PrivateRoute> },
      { path: "/inbox/:id", element: <PrivateRoute><Mail/></PrivateRoute> },
      { path: "/sent", element: <PrivateRoute><SentMail/></PrivateRoute> },
      { path: "*", element: <AuthForm/> },
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
