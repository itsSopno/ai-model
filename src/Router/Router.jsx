import React from "react";
import { createBrowserRouter } from "react-router"; 
import App from "../App";
import Body from "../body/Body";
import Model from "../Component/Model/Model";
import Profile from "../Component/Profile/Profile";
import Login from "../Component/Login/Login";
import Publish from "../Component/publish ai/publish";
import PrivateRout from "../privaterout";
import EditModel from "../Component/Edit/Edit";
import ModelDetail from "../Component/ModelCard/Modeldetail";
import Purchased from "../Component/purchased/purchased";
import Model2nd from "../Component/2nd model/Model2nd";
import NotFound from "../Component/error page/Nothing";
import Register from "../Component/Registration/Register";


const ErrorWrapper = () => <NotFound />;

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorWrapper />,
    children: [
      { index: true, element: <Body />, errorElement: <ErrorWrapper /> },
      { path: "MODEL", element: <Model />, errorElement: <ErrorWrapper /> },
      { path: "MODEL/:id", element: <PrivateRout><ModelDetail /></PrivateRout>, errorElement: <ErrorWrapper /> },
      { path: "my-model", element: <PrivateRout><Model2nd /></PrivateRout>, errorElement: <ErrorWrapper /> },
      { path: "buyer-app", element: <Purchased />, errorElement: <ErrorWrapper /> },
      { path: "Profile", element: <PrivateRout><Profile /></PrivateRout>, errorElement: <ErrorWrapper /> },
      { path: "login", element: <Login />, errorElement: <ErrorWrapper /> },
      { path: "register", element: <Register />, errorElement: <ErrorWrapper /> },
      { path: "Publish", element: <PrivateRout><Publish /></PrivateRout>, errorElement: <ErrorWrapper /> },
      { path: "edit/:id", element: <PrivateRout><EditModel /></PrivateRout>, errorElement: <ErrorWrapper /> },
      { path: "*", element: <NotFound /> }, 
    ],
  },
]);

export default Router;
