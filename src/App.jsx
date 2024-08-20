import React, { useEffect, useState } from "react"
import { NavFooter } from "./layouts/NavFooter"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./views/Home"
import Homepage from "./components/Homepage"
import TaskBoard from "./components/Task/TaskBoard"
import Document from "./components/Document"
import Inbox from "./components/Inbox"
import TopNav from "./components/LoginTopNav"
import SideNav from "./components/LoginSideNav"
import { useSelector } from "react-redux"

function App() {

  const { user } = useSelector(state => state.auth)
  console.log(user)

  return (
    <Router>
      {user ? (
        <div className="App">
          <TopNav />
          <SideNav />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/tasks" element={<TaskBoard />} />
              <Route path="/docs" element={<Document />} />
              <Route path="/inbox" element={<Inbox />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<NavFooter />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      )}
    </Router>
  );
}

export default App
