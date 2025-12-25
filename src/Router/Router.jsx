import React from 'react';
import { createBrowserRouter } from 'react-router';
import App from '../App';
import Body from '../body/Body';
import Model from '../Component/Model/Model';
import Profile from '../Component/Profile/Profile';
import Login from '../Component/Login/Login';
import Publish from '../Component/publish ai/publish';
import PrivateRout from '../privaterout';
import EditModel from '../Component/Edit/Edit';
import ModelDetail from '../Component/ModelCard/Modeldetail';
import Purchased from '../Component/purchased/purchased';
import Model2nd from '../Component/2nd model/Model2nd';

const Router = createBrowserRouter([
    {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Body /> },
      { path: "MODEL", element: <Model />},
      { path: "MODEL/:id", element:<ModelDetail></ModelDetail>},
{path:"my-model", element:<Model2nd></Model2nd> },
{path:"buyer-app" , element:<Purchased></Purchased>},
      { path: "Profile", element: <PrivateRout><Profile /></PrivateRout> },
      { path: "login", element: <Login /> },
      { path: "Publish", element: <PrivateRout><Publish /></PrivateRout> },
      { path: "edit/:id", element: <PrivateRout><EditModel /></PrivateRout> },
    ],
  },
]);

export default Router;