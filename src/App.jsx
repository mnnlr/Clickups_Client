import React, { useEffect, useState } from "react"
import { NavFooter } from "./layouts/NavFooter"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomePageBeforeLogin } from "./views/HomePageBeforeLogin"
import Homepage from "./views/Homepage"
import TaskBoard from "./views/TaskBoardPage"
import Document from "./views/DocumentPage"
import InviteMember from "./views/InviteMemberPage"
import Workspace from "./views/Workspace"
import ProfilePage from "./views/Profilepage"
import Spaces from './views/Spaces';
import { LoginPage } from "./views/LoginPage"
import { SignUpPage } from "./views/SignUpPage"
import { DashboardPage } from "./views/DashboardPage"
import PagenotFound from "./views/PagenotFound"
import Project from "./views/Project"
import Cookies from "js-cookie"
import { DashboardForProjectPage } from "./views/DashboardForProjectPage"
import { SideNavTopNav } from "./layouts/SideNavTopNav"
import Check_auth from "./components/check_auth/Check_auth"
import AuthLayout from "./views/AuthLayout";
import Sprint from "./components/sprint/Sprint"
import { io } from "socket.io-client"
import { useSelector } from "react-redux"
import { showToast } from './components/Toastconfig';
import { SocketProvider } from "./components/socket-io/SocketContext"
import ViewsDocument from "./views/ViewsDocument"
import PasswordForgot from "./views/PasswordForgot"
import ResetPassword from "./views/ResetPassword"




function App() {

  // const { user } = useSelector((state) => state.login);

  // console.log("user", user._id);
  // useEffect(() => {
  //   if (user && user._id) {
  //     const socket = io('http://localhost:5000', {
  //       query: { UserId: user._id },
  //     });
  //     socket.on('connect', () => {
  //       console.log('Connected to the server');
  //     });
  //     socket.on('notification', (data) => {
  //       console.log('Notification received:', data);
  //       showToast(data.message, "info")
  //     });

  //     socket.on('teamMemberAdded', (notification) => {
  //       console.log("Team member", notification);
  //       showToast(notification.message, "info")
  //     })

  //     socket.on('projectUpdated', (notification) => {
  //       console.log("project upadted", notification);
  //       showToast(data.message, "info");
  //     })


  //     socket.on('taskUpdated', (notification) => {
  //       console.log("project upadted", notification);
  //       showToast(notification.message, "");
  //     })

  //     socket.on('sprintCreated', (notification) => {
  //       console.log("project upadted", notification);
  //       showToast(notification.message, "info");
  //     })


  //     return () => {
  //       socket.disconnect();
  //     };
  //   }
  // }, [user]);

  const darkMode = useSelector((state) => state.darkMode.darkMode);


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);




  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route element={<Check_auth />}>
            <Route path="/" element={<AuthLayout />}>
              <Route path="home" element={<Homepage />} />
              <Route path={"/:projectId/sprints/:sprintId/tasks"} element={<TaskBoard />} />
              <Route path={"/:projectId/sprints/:sprintId/tasks"} element={<TaskBoard />} />
              <Route path="tasks/:projectId/individual" element={<TaskBoard />} />
              <Route path="docs" element={<Document />} />
              <Route path="invite" element={<InviteMember />} />
              <Route path="workspace" element={<Workspace />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="project" element={<Project />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="/projects/:projectId/sprints" element={<Sprint />} />
              <Route path="/dashboard/:projectId" element={<DashboardForProjectPage />} />
              <Route path="/workspace/:_id/:type" element={<Spaces />} />
              <Route path="/viewsdocument/:DocumentId" element={<ViewsDocument />} />

            </Route>
          </Route>
          <Route>
            <Route path="/" element={<NavFooter />}>
              <Route index element={<HomePageBeforeLogin />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="signin" element={<LoginPage />} />
              <Route path="PasswordForgot" element={<PasswordForgot/>}/>
              <Route path="reset-password/:token" element={<ResetPassword/>}/>
            </Route>
          </Route>
          <Route path="/*" element={<PagenotFound />} />
        </Routes>
      </Router >
    </SocketProvider>
  );
}

export default App
