import { USER_FORGOTPASSWORD_FAIL, USER_FORGOTPASSWORD_REQUEST, USER_FORGOTPASSWORD_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCES, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCES:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    };
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_FORGOTPASSWORD_REQUEST:
            return { loading: true };
        case USER_FORGOTPASSWORD_SUCCESS:
            return { loading: false, userEmail: action.payload }
        case USER_FORGOTPASSWORD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

