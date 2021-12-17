import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput'; import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import ErrorMessage from './errorMessage/ErrorMessage';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("")

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { error, userInfo } = userRegister;

    // Password visibility eventhandlers
    const [visibility1, setVisibility1] = useState(false)
    const [visibility2, setVisibility2] = useState(false)

    const handleClickShowPassword = () => {
        setVisibility1(!visibility1)
    };

    const handleClickShowConfirmPassword = () => {
        setVisibility2(!visibility2)
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords Do Not Match");
        } else {
            dispatch(register(firstName, lastName, userName, email, password))
        };
    }

    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [userInfo, navigate])


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
            {message && <ErrorMessage error={message} />}
            <div className="Register-Area">
                <div className="Register-title">
                    <h2>Signup</h2>
                </div>
                <div className="Register-form">
                    <TextField required id="outlined-basic" label="Firstname" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <TextField required id="outlined-basic" label="Lastname" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <TextField required id="outlined-basic" label="Username" variant="outlined" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <TextField required id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <FormControl sx={{ m: 1, width: '20rem' }} variant="outlined">
                        <InputLabel required htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-password"
                            type={visibility1 ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {visibility1 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '20rem' }} variant="outlined">
                        <InputLabel required htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-password"
                            type={visibility2 ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        edge="end"
                                    >
                                        {visibility2 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirm Password"
                        />
                    </FormControl>
                </div>
                <div className="Register-terms">
                    <Checkbox color="success" />
                    <p>I read and accept <Link href="#" underline="none">
                        {'Terms and Conditions'}
                    </Link></p>
                </div>
                <div className="Register-button">
                    <Button variant="contained" color="success" onClick={submitHandler}>
                        Register
                    </Button>
                </div>
                <div className="Register-signIn">
                    <p>Already have an account? <Link href="#" underline="none" onClick={() => navigate("/login")}>
                        {'Log In'}
                    </Link></p>

                </div>
            </div>
        </Box>
    )
}

export default Register;