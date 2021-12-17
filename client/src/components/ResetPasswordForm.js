import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput'; import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from "react-router-dom";
import ErrorMessage from './errorMessage/ErrorMessage';
import { useState } from 'react';
import SuccessMessage from './successMessage/SuccessMessage';
import { useParams } from "react-router";
import axios from 'axios';


const ResetPasswordForm = () => {
    const { userId, token } = useParams()

    const [message, setMessage] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate();

    const baseURL = "http://localhost:3333/api/users"

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage(<ErrorMessage error={"Password Do Not Match"} />);
        } else {
            try {
                const { data } = await axios.post(`${baseURL}/resetpassword/${userId}/${token}`, { password });
                setMessage(<SuccessMessage success={"Password Successfully Changed"} />)
                setTimeout(() => {
                    navigate("/login")
                }, 3000);
            } catch (error) {
                console.log(error)
            }
        };
    }
    // Password visibility eventhandlers
    const [visibility1, setVisibility1] = useState(false)
    const [visibility2, setVisibility2] = useState(false)

    const handleClickShowPassword = () => {
        setVisibility1(!visibility1)
    };

    const handleClickShowConfirmPassword = () => {
        setVisibility2(!visibility2)
    };

    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '20rem' },
                }}
                noValidate
                autoComplete="off"
            >
                {message}

                <div className="Register-Area">
                    <div className="Register-title">
                        <h2>Reset Your Password</h2>
                    </div>
                    <div className="Register-form">
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
                    <div className="Register-button">
                        <Button variant="contained" color="success" onClick={submitHandler}>
                            Submit
                        </Button>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default ResetPasswordForm
