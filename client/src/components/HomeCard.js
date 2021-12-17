import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { commentModal } from "../actions/modalActions";

import axios from "axios";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Carousel from "react-material-ui-carousel";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { v4 as uuidv4 } from "uuid";

const moment = require("moment-timezone");

const customButtonTheme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "neonBtn" },
          style: {
            color: "#fff",
            boxShadow: "0 0 10px #2BC20E",
            fontSize: "12px",
            borderRadius: "50px",
            height: "4vh",
            fontFamily: "Zen Kaku Gothic New, sans-serif",
          },
        },
      ],
    },
  },
});

const customCardTheme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "cardText" },
          style: {
            fontFamily: "Zen Kaku Gothic New, sans-serif",
          },
        },
      ],
    },
  },
});

const HomeCard = ({ postedData, setObjectId, avatarAndUserId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = JSON.parse(localStorage.getItem("userInfo"))
    ? JSON.parse(localStorage.getItem("userInfo"))._id
    : "";
  const [like, setLike] = useState(postedData.likes);
  const [likeNumber, setLikeNumber] = useState(postedData.likes.length);
  const timestamp = moment(postedData.createdAt)
    .utc()
    .local()
    .format("YYYY/MM/DD HH:mm");

  const postLikeHandler = (id) => {
    axios
      .put("api/postLike", {
        ...postedData,
        likedBy: userID,
        likedPostId: id,
      })
      .then((res) => {
        setLike(res.data.data.likes);
        setLikeNumber(res.data.data.likes.length);
      })
      .catch((err) => console.error(err));
  };

  const deleteLikeHandler = (id) => {
    axios
      .put("api/deleteLike", {
        ...postedData,
        likedBy: userID,
        likedPostId: id,
      })
      .then((res) => {
        console.log("res", res);
        setLike(res.data.data.likes);
        setLikeNumber(res.data.data.likes.length);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <ThemeProvider theme={customCardTheme}>
        <Card sx={{ maxWidth: 414 }} className="cardWrapper">
          {avatarAndUserId &&
            avatarAndUserId.map((data) => {
              return (
                data.id === postedData.userId && (
                  <CardHeader
                    variant="cardText"
                    title={postedData.userName}
                    avatar={
                      <Avatar
                        onClick={() => navigate(`/profile/${data.id}`)}
                        alt="User's picture"
                        src={data.avatarUrl}
                        className="avatar"
                      />
                    }
                    subheader={timestamp}
                  />
                )
              );
            })}
          <Carousel
            autoPlay={false}
            animation="slide"
            indicators={postedData.imageUrl.length === 1 ? false : true}
            navButtonsAlwaysInvisible={
              postedData.imageUrl.length === 1 ? true : false
            }
          >
            {postedData.imageUrl.map((image) => {
              return (
                <CardMedia
                  key={uuidv4()}
                  component="img"
                  height="220"
                  image={image}
                  alt="Posted image"
                />
              );
            })}
          </Carousel>
          <ThemeProvider theme={customButtonTheme}>
            <IconButton aria-label="add to favorites">
              {like.includes(userID) ? (
                <FavoriteIcon
                  onClick={() => deleteLikeHandler(postedData._id)}
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={() => postLikeHandler(postedData._id)}
                />
              )}
            </IconButton>
            <IconButton aria-label="open chatbox">
              <ChatBubbleOutlineIcon
                onClick={() => {
                  dispatch(commentModal());
                  setObjectId(postedData._id);
                }}
              />
            </IconButton>
          </ThemeProvider>
          <div className="likesNumber">{likeNumber && likeNumber} likes</div>
          <CardContent className="content">
            <Typography variant="cardText" color="text.secondary">
              {postedData.content}
            </Typography>
          </CardContent>
        </Card>
      </ThemeProvider>
    </>
  );
};

export default HomeCard;
