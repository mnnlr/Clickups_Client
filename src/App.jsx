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
import { LoginPage } from "./views/LoginPage"
import { SignUpPage } from "./views/SignUpPage"
import { DashboardPage } from "./views/DashboardPage"
import PagenotFound from "./views/PagenotFound"
import Project from "./views/Project"
import { DashboardForProjectPage } from "./views/DashboardForProjectPage"
import Check_auth from "./components/check_auth/Check_auth"
import AuthLayout from "./views/AuthLayout";
import Sprint from "./components/sprint/Sprint"
import { SocketProvider } from "./components/socket-io/SocketContext"



function App() {

  // const user = useSelector((state) => state.login);

  // console.log("user",user.user._id);
  // useEffect(() => {
  //   if (user && user.user && user.user._id) {
  //     const socket = io('http://localhost:5000', {
  //       query: { UserId: user.user._id },
  //     });

  //     // Log a message when connected
  //     socket.on('connect', () => {
  //       console.log('Connected to the server');
  //     });

  //     // Handle incoming notifications
  //     socket.on('notification', (data) => {
  //       console.log('Notification received:', data);
  //       toast.info(data.message); // Optionally display toast notification
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }
  // }, [user]);

  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route element={<Check_auth />}>
            <Route path="/" element={<AuthLayout />}>
              <Route path="home" element={<Homepage />} />
              <Route path={"/:projectId/sprints/:sprintId/tasks" || "tasks"} element={<TaskBoard />} />
              <Route path="/tasks" element={<TaskBoard />} />
              <Route path="docs" element={<Document />} />
              <Route path="invite" element={<InviteMember />} />
              <Route path="workspace" element={<Workspace />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="project" element={<Project />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="/projects/:projectId/sprints" element={<Sprint />} />
              <Route path="/dashboard/project" element={<DashboardForProjectPage />} />
            </Route>
          </Route>
          <Route>
            <Route path="/" element={<NavFooter />}>
              <Route index element={<HomePageBeforeLogin />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="signin" element={<LoginPage />} />
            </Route>
          </Route>
          <Route path="/*" element={<PagenotFound />} />
        </Routes>
      </Router >
    </SocketProvider>
  );
}

export default App