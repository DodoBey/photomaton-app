import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Modal, Fade, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeCard from "./HomeCard.js";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 as uuidv4 } from "uuid";
import { commentModal } from "../actions/modalActions";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalSelecor = useSelector((state) => state.modalReducer.commentModal);
  const loginSelecor = useSelector((state) => state.userLogin.userInfo);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const [allPosts, setAllPosts] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loadedPostsNum, setLoadedPostsNum] = useState(5);
  const [loadedPosts, setLoadedPosts] = useState("");
  const [comment, setComment] = useState(null);
  const [objectId, setObjectId] = useState(null);
  const [avatarAndUserId, setAvatarAndUserId] = useState([]);

  const userID = JSON.parse(localStorage.getItem("userInfo"))
    ? JSON.parse(localStorage.getItem("userInfo"))._id
    : "";

  const breakPointsTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 414,
        md: 700,
        lg: 1000,
      },
    },
  });

  useEffect(() => {
    const getAllPosts = async () => {
      const { data } = await axios.get("api/post");
      setAllPosts(data.reverse());
      setLoadedPosts(data.slice(0, loadedPostsNum));
    };
    getAllPosts();
  }, []);

  const fetchMoreData = () => {
    if (loadedPosts.length === allPosts.length) {
      setHasMore(false);
      return;
    } else if (loadedPosts.length <= allPosts.length) {
      setLoadedPostsNum((prev) => (prev += 5));
      setLoadedPosts(allPosts.slice(0, loadedPostsNum));
    }
  };

  const submitCommentHandler = () => {
    const selectedPost =
      allPosts && !allPosts.data
        ? allPosts.filter((post) => {
          return post._id === objectId;
        })
        : allPosts.data
          ? allPosts.data.filter((post) => {
            return post._id === objectId;
          })
          : "";

    if (comment) {
      axios
        .put("api/postComment", {
          ...selectedPost[0],
          id: objectId,
          userCommentId: loginSelecor._id,
          postedBy: loginSelecor.userName,
          comment: comment,
        })
        .then((res) => {
          console.log("res", res);
          axios.get("api/post").then((data) => {
            setAllPosts(data);
            setComment("");
          });
        })
        .catch((err) => console.error(err));
    }
  };

  // User Login Check, if the user is not logged in, redirect to login page
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    const getUsersAvatar = async () => {
      const response = await axios.get(`api/users/getUser/`);
      const data = response.data.data;
      const getAvatarAndUserId = data.map((userData) => {
        return { avatarUrl: userData.avatarUrl, id: userData._id };
      });

      setAvatarAndUserId(getAvatarAndUserId);
    };
    getUsersAvatar();
  }, []);

  return (
    <>
      <div className="homeWrapper">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalSelecor}
          onClose={() => dispatch(commentModal())}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalSelecor}>
            <Box className="modalWindow">
              <form
                className="comments"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitCommentHandler();
                }}
              >
                <div className="commentsInput">
                  <label htmlFor="comment"></label>
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder="Add a comment..."
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="commentsButton">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={(e) => {
                      e.preventDefault();
                      submitCommentHandler();
                    }}
                  >
                    Post
                  </Button>
                </div>
              </form>
              <div>
                {allPosts && !allPosts.data
                  ? allPosts.map((post) => {
                    if (post._id === objectId) {
                      return (
                        post.comment &&
                        post.comment.map((comm) => {
                          return (
                            <div className="modalLayout">
                              {avatarAndUserId.map((data) => {
                                return (
                                  data.id === comm.postedBy && (
                                    <Avatar
                                      className="avatar"
                                      onClick={() => {
                                        dispatch(commentModal());
                                        navigate(`/profile/${comm.postedBy}`);
                                      }}
                                      alt="User's picture"
                                      src={data.avatarUrl}
                                    />
                                  )
                                );
                              })}
                              <p>{comm.text}</p>
                            </div>
                          );
                        })
                      );
                    }
                  })
                  : allPosts.data
                    ? allPosts.data.map((post) => {
                      if (post._id === objectId) {
                        return (
                          post.comment &&
                          post.comment.map((comm) => {
                            return (
                              <div className="modalLayout">
                                {avatarAndUserId.map((data) => {
                                  return (
                                    data.id === comm.postedBy && (
                                      <Avatar
                                        onClick={() => {
                                          dispatch(commentModal());
                                          navigate(`/profile/${comm.postedBy}`);
                                        }}
                                        alt="User's picture"
                                        src={data.avatarUrl}
                                      />
                                    )
                                  );
                                })}
                                <p>{comm.text}</p>
                              </div>
                            );
                          })
                        );
                      }
                    })
                    : ""}
              </div>
            </Box>
          </Fade>
        </Modal>
        <InfiniteScroll
          dataLength={loadedPosts}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className="loading">Loading...</h4>}
          endMessage={
            <p className="loaded">
              <b>End of posts</b>
            </p>
          }
        >
          <ThemeProvider theme={breakPointsTheme}>
            <Grid container spacing={2} alignItems="center" justify="center">
              {loadedPosts &&
                loadedPosts.map((post) => {
                  return (
                    <Grid
                      key={uuidv4()}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      paddingTop={"10px"}
                      paddingBottom={"10px"}
                    >
                      <HomeCard
                        postedData={post}
                        setObjectId={setObjectId}
                        avatarAndUserId={avatarAndUserId}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </ThemeProvider>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Home;
