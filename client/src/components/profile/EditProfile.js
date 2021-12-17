import {
  Avatar,
  FormControl,
  Grid,
  Input,
  InputLabel,
  IconButton,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Check, Close } from "@mui/icons-material";

const EditProfile = () => {

  const [userData, setUserData] = useState(null);
  const [imgDetails, setImgDetails] = useState(null);
  const [preImgUrl, setPreImgUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const userID = JSON.parse(localStorage.getItem("userInfo"))._id;

  // Get user info from DB and show it as inital info
  useEffect(async () => {
    const response = await axios.get(
      `http://localhost:3333/api/users/getUser/${userID}`
    );
    const data = response.data.data;
    setUserData(data);
    setPreImgUrl(data.avatarUrl);
  }, []);

  // Get upload image data and Create a preview image
  const handleImgPreview = (e) => {
    const file = e.target.files[0];
    setImgDetails(file);
    const reader = new FileReader();
    reader.onload = (img) => {
      setPreImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    //Update Avatar Image to cloudinary and get image url
    const formData = new FormData();
    formData.append("file", imgDetails);
    formData.append("upload_preset", "photomaton");
    formData.append("cloud_name", "da4jkejdx");
    let imgUrl = userData.avatarUrl;
    try {
      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/da4jkejdx/image/upload",
        formData
      );
      imgUrl = cloudinaryRes.data.url.toString();
      alert("cloudinary hit", imgUrl);
    } catch (e) {
      console.error(e);
    }
    // Update info to DB
    updateUserInfo(imgUrl);

    // Return to profile page
    // Open saving modal
    setIsSaving(true);
    // Wait for data saving
    setTimeout(() => {
      navigate(`/profile/${userID}`);
    }, 2000);
  };

  const updateUserInfo = async (imgUrl) => {
    // Update user info
    try {
      const response = await axios.post(
        `http://localhost:3333/api/users/editUser/${userID}`,
        { ...userData, avatarUrl: imgUrl }
      );
      console.log("userID: ", userID);
    } catch (e) {
      console.error(e);
    }
  };

  return userData ? (
    <Grid container className="editProfileWrapper">

      <Grid container className="titleBarWrapper" margin="10px 0">
        <Grid
          container
          width="100vw"
          display="flex"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton onClick={() => navigate(`/profile/${userID}`)}>
            <Close className="barIcon" />
          </IconButton>
          <Typography variant="h5" color="white">
            Edit Profile
          </Typography>
          <IconButton>
            <Check className="barIcon" onClick={handleSubmit} />
          </IconButton>
        </Grid>
      </Grid>

      <label id="avatarLabel" htmlFor="chooseFile">
        <Avatar id="avatarImg" alt="" src={preImgUrl} />
      </label>
      <input
        id="chooseFile"
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => handleImgPreview(e)}
      />

      <Grid
        container
        width="100vw"
        height="70vh"
        display="flex"
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <FormControl variant="standard">
          <InputLabel htmlFor="username" style={{ color: "rgb(187, 187, 187" }}>
            Username
          </InputLabel>
          <Input
            style={{ color: "white" }}
            id="username"
            defaultValue={userData.userName}
            onChange={(e) =>
              setUserData({ ...userData, userName: e.target.value })
            }
          ></Input>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel
            htmlFor="firstName"
            style={{ color: "rgb(187, 187, 187" }}
          >
            First Name
          </InputLabel>
          <Input
            style={{ color: "white" }}
            id="firstName"
            defaultValue={userData.firstName}
            onChange={(e) =>
              setUserData({ ...userData, firstName: e.target.value })
            }
          ></Input>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="lastName" style={{ color: "rgb(187, 187, 187" }}>
            Last Name
          </InputLabel>
          <Input
            style={{ color: "white" }}
            id="lastName"
            defaultValue={userData.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
          ></Input>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="bio" style={{ color: "rgb(187, 187, 187" }}>
            Bio
          </InputLabel>
          <Input
            style={{ color: "white" }}
            id="bio"
            defaultValue={userData.bio}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
          ></Input>
        </FormControl>
      </Grid>

      <Modal className="savingModal" open={isSaving}>
        <Box
          elevation={3}
          className="savingBox"
          style={{
            borderRadius: "5px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            backgroundColor: "white",
            boxShadow: "24",
            padding: "30px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Saving...</Typography>
        </Box>
      </Modal>
    </Grid>
  ) : (
    <div>Waitting...</div>
  );
};

export default EditProfile;
