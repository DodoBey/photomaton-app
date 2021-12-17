import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notificationModal } from "../actions/modalActions";
import { useEffect, useState } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userID, setUserId] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUserId("/" + userInfo._id);
    }
  });

  return (
    <>
      <div className="footerWrapper">
        <HomeIcon
          className="icons"
          sx={{ fontSize: 35 }}
          onClick={() => navigate("/")}
        />
        <SearchIcon
          className="icons"
          sx={{ fontSize: 35 }}
          onClick={() => navigate("/explore")}
        />
        <ControlPointIcon
          className="icons"
          sx={{ fontSize: 35 }}
          onClick={() => navigate("/newPost")}
        />
        <FavoriteBorderIcon
          className="icons"
          sx={{ fontSize: 35 }}
          onClick={() => dispatch(notificationModal())}
        />
        <AccountCircleIcon
          className="icons"
          sx={{ fontSize: 35 }}
          onClick={() => navigate(`/profile${userID}`)}
        />
      </div>
    </>
  );
};

export default Footer;
