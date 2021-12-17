import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    if (!userInfo) {
        return navigate("/")
    }
    return children;
}

export default PublicRoutes
