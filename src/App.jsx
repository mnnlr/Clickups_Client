import React, { useEffect, useState } from "react"
import { NavFooter } from "./layouts/NavFooter"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomePageBeforeLogin } from "./views/HomePageBeforeLogin"
import Homepage from "./components/Homepage"
import TaskBoard from "./views/TaskBoardPage"
import Document from "./views/DocumentPage"
import InviteMember from "./views/InviteMemberPage"
import Workspace from "./views/Workspace"
import ProfilePage from "./views/Profilepage"
import { LoginPage } from "./views/LoginPage"
import { SignUpPage } from "./views/SignUpPage"
import { DashboardPage } from "./views/DashboardPage"
import PagenotFound from "./views/PagenotFound"
import Project from "./views/Project"
import Cookies from "js-cookie"
import { DashboardForProjectPage } from "./views/DashboardForProjectPage"
import { SideNavTopNav } from "./layouts/SideNavTopNav"

function App() {

  const userToken = Cookies.get('User')

  return (
    <Router>
      {userToken ? (
        <div className="App">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<SideNavTopNav />}>
                <Route path="/*" element={<PagenotFound />} />
                <Route index element={<Homepage />} />
                <Route path="/tasks" element={<TaskBoard />} />
                <Route path="/docs" element={<Document />} />
                <Route path="/invite" element={<InviteMember />} />
                <Route path="/workspace" element={<Workspace />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/project" element={<Project />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/project" element={<DashboardForProjectPage />} />
              </Route>
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