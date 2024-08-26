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
import { SigninPage } from "./views/SigninPage"
import { Dashboard } from "./views/Dashboard"
import PagenotFound from "./views/PagenotFound"
import Project from "./components/Project"

function App() {

  const { user } = useSelector(state => state.auth)
  // console.log(user)

  return (
    <Router>
      {user ? (
        <div className="App">
          <TopNav />
          <SideNav />
          <div className="main-content">
            <Routes>
              <Route path="/*" element={<PagenotFound />} />
              <Route path="/" element={<Homepage />} />
              <Route path="/home" element={<Homepage />} />
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signin" element={<SigninPage />} />
          </Route>
        </Routes>
      )}
    </Router>
  );
}

export default App