import { RouterOutlined } from "@mui/icons-material";
import React from "react";
import Home from "./components/Home";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Register from "./components/Register";
import Notification from "./components/Notification.js";
import "../src/styles/Main.scss";
import Login from "./components/Login";
import Explore from "./components/Explore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Profile from "./components/profile/Profile";
import NewPost from "./components/newPost/NewPost";
import EditProfile from "./components/profile/EditProfile";
import ResetPassword from "./components/ResetPassword";
import ResetPasswordForm from "./components/ResetPasswordForm";

function App() {
  const toggleNotification = useSelector(
    (state) => state.modalReducer.notificationModal
  );

  return (
    <>
      <BrowserRouter>
        <Header />
        {toggleNotification && <Notification />}
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="newPost" element={<NewPost />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="explore" element={<Explore />} />
          <Route path="resetpassword/:userId/:token" element={<ResetPasswordForm />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          {/* <Route path="/" element={<Home />} /> 
          <Route path="/" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          {/* <Route path="profile" element={<Profile />} />
          <Route path="message" element={<Message />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
