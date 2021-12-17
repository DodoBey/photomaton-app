import { USER_FORGOTPASSWORD_FAIL, USER_FORGOTPASSWORD_REQUEST, USER_FORGOTPASSWORD_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCES, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";
import axios from "axios";
import { useParams } from "react-router";


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-type": "application/json"
            },
        };

        const { data } = await axios.post(
            "api/users/login",
            { email, password },
            config
        );

        dispatch({ type: USER_LOGIN_SUCCES, payload: data })

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    };
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
};

export const register = (firstName, lastName, userName, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: {
                "Content-type": "application/json"
            },
        };

        const { data } = await axios.post(
            "api/users",
            { firstName, lastName, userName, email, password },
            config
        );

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

        dispatch({ type: USER_LOGIN_SUCCES, payload: data })

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    };
};

export const userForgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: USER_FORGOTPASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const { data } = await axios.post(
            "api/users/resetpassword",
            { email },
            config
        )

        dispatch({ type: USER_FORGOTPASSWORD_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_FORGOTPASSWORD_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}



