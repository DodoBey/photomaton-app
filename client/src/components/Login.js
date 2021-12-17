import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput'; import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../actions/userActions';
import ErrorMessage from './errorMessage/ErrorMessage';


const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    // Password visibility eventhandlers
    const [visibility, setVisibility] = useState(false)

    const handleClickShowPassword = () => {
        setVisibility(!visibility)
    };

    // Backend Implemention

    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [userInfo, navigate])

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    const onKeyPressHandler = (e) => {
        if (e.key === 'Enter') {
            submitHandler(e)
        }
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '20rem' },
            }}
            noValidate
            autoComplete="off"
        >
            {error && <ErrorMessage error={error} />}
            <div className="Login-Area">
                <div className="Login-title">
                    <h2>Login</h2>
                </div>
                <div className="Login-form">
                    <TextField required id="outlined-basic" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyPress={onKeyPressHandler} variant="outlined" helperText="Please type your email or username"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormControl sx={{ m: 1, width: '20rem' }} variant="outlined">
                        <InputLabel required htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-password"
                            type={visibility ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={onKeyPressHandler}
                            startAdornment={
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {visibility ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormHelperText id="outlined-weight-helper-text">Please Type Your Password</FormHelperText>
                    </FormControl>
                </div>
                <div className="Login-forgot">
                    <Link href="#" underline="none" onClick={() => navigate("/resetPassword")}>
                        {'Forgot Password?'}
                    </Link>
                </div>
                <div className="Login-button">
                    <Button variant="contained" color="success" onClick={submitHandler} >
                        Login
                    </Button>
                </div>
                <div className="Login-register">
                    <p>
                        Don't have an account?
                    </p>
                    <Link href="#" underline="none" onClick={() => navigate("/register")}>
                        {' Register'}
                    </Link>
                </div>
            </div>
        </Box>
    )
}

export default Login;