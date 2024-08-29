import React, { useEffect, useState } from "react"
import { NavFooter } from "./layouts/NavFooter"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomePageBeforeLogin } from "./views/HomePageBeforeLogin"
import Homepage from "./components/Homepage"
import TaskBoard from "./components/Task/TaskBoard"
import Document from "./components/Document"
import Inbox from "./components/Inbox"
import TopNav from "./components/LoginTopNav"
import SideNav from "./components/LoginSideNav"
import { useSelector } from "react-redux"
import InviteMember from "./components/InviteMember"
import Workspace from "./components/Workspace"
import ProfilePage from "./components/Profilepage"
import { LoginPage } from "./views/LoginPage"
import { SignUpPage } from "./views/SignUpPage"
import { Dashboard } from "./views/Dashboard"
import PagenotFound from "./views/PagenotFound"
import Project from "./views/Project"
import Cookies from "js-cookie"

function App() {

  const userToken = Cookies.get('User')
  // console.log(user)

  return (
    <Router>
      {userToken ? (
        <div className="App">
          <TopNav />
          <SideNav />
          <div className="main-content">
            <Routes>
              <Route path="/*" element={<PagenotFound />} />
              <Route path="/" element={<Homepage />} />
              <Route path="/tasks" element={<TaskBoard />} />
              <Route path="/docs" element={<Document />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/invite" element={<InviteMember />} />
              <Route path="/workspace" element={<Workspace />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/project" element={<Project />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<NavFooter />}>
            <Route index element={<HomePageBeforeLogin />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      )}
    </Router>
  );
}

export default App