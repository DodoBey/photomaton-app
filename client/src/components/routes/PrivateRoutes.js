import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = () => {

    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    if (!userInfo) {
        return navigate("/login")
    }
}

export default PrivateRoutes
