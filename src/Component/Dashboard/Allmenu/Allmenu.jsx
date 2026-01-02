import React, { useContext } from "react";

import MenuItem from "../../Menu/MenuItem";
import { AuthContext } from "../../../Authcontext";

const Allmenu = () => {
    const {modelData , user} = useContext(AuthContext);
    const hasMyModel = user && modelData?.some(model => model.createdBy === user.email);
  return (
   
    <div className="flex flex-col gap-2 w-full text-black">
        <MenuItem
        label='Publish Your AI Model'
        address='Publish'></MenuItem>
      {hasMyModel && <MenuItem
        label='Buyer App'
        address='buyer-app'></MenuItem>}
        <MenuItem 
        label="My Models"
        address="my-model"></MenuItem>
    </div>
  );
};

export default Allmenu;