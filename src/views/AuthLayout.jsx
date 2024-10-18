import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../components/LoginTopNav";
import SideNav from "../components/LoginSideNav";

const AuthLayout = () => {
  return (
    <div className="App font-LibreFont">
      <TopNav />
      <SideNav />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
