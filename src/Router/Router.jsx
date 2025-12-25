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
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Body /> },
      { path: "MODEL", element: <PrivateRout><Model /></PrivateRout> },
      { path: "MODEL/:id", element:<PrivateRout><ModelDetail /></PrivateRout> },
      { path: "my-model", element:<PrivateRout><Model2nd /></PrivateRout> },
      { path: "buyer-app", element: <Purchased /> },
      { path: "Profile", element: <PrivateRout><Profile /></PrivateRout> },
      { path: "login", element: <Login /> },
      { path: "Publish", element: <PrivateRout><Publish /></PrivateRout> },
      { path: "edit/:id", element: <PrivateRout><EditModel /></PrivateRout> },
      { path: "*", element: <NotFound /> }, 
    ],
  },
]);

export default Router;
