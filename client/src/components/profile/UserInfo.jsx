import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Button, Grid, Box, Typography, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
// import { io } from 'socket.io-client';

const UserInfo = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [showButton, setShowButton] = useState(<div></div>)
    // const socket = io('http://localhost:5000')

    useEffect(() => {
        if (userInfo._id === props.user._id) {
            setShowButton(
                <Grid container space={2} display="flex" justifyContent="start" alignItems='center'>
                    <Button className='infoButton' variant='outlined' onClick={() => navigate(`/editProfile`)}>Edit profile</Button>
                    <IconButton className='iconButton' onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Grid>
            )
        } else {
            if (props.user.friends.friendsList.some((item) => item.userID === userInfo._id)) {
                setShowButton(
                    <Button
                        className='infoButton'
                        variant='outlined'
                        onClick={removeFriend}>Unfollow</Button>
                )
            } else if (props.user.friends.request.some((item)=>item.userID === userInfo._id)){
                setShowButton(
                    // <Button sx={{height: '30px'}} style={{color: '#2BC20E'}} variant='outlined' disabled='true'>Pending</Button>
                    <Typography
                        variant='body2'
                        className='iconButton'
                    >Pending</Typography>
                )
            } else {
                setShowButton(
                    <Button className='infoButton' variant='outlined' onClick={addFriend}>Follow</Button>
                )
            }
        }
    }, [props.user._id])

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
    }

    const removeFriend = async() => {
        const res = await axios.put('http://localhost:3333/api/users/friendRemove', {
            senderID: userInfo._id,
            receiverID: props.user._id
        })
        window.location.reload();
    }

    const addFriend = async () => {
        const res = await axios.put('http://localhost:3333/api/users/friendRequest', {
            senderID: userInfo._id,
            receiverID: props.user._id
        })
        window.location.reload();
        // socket.emit('addFriend', ())
    }

    return (
        <Grid container spacing={0} sx={{ width:"100%", padding: '1vh 5vw'}}>
            <Grid item xs={3.2} sm={1.5} alignSelf="center">
                <Avatar sx={{height: '90px', width: '90px'}} src={props.user.avatarUrl} />
            </Grid>
            <Grid item xs={8} sm={10}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    gap: '10px'
                }}>
                    <Typography variant="h6" color="white">{props.user.userName}</Typography>
                    {showButton}
                </Box>
            </Grid>
            <Grid item xs={12} sx={{overflow:'hidden', margin: '3vh 0'}}>
                <Typography
                    variant='body2'
                    sx={{
                        color: 'white',
                        maxHeight: '20vh',
                        whiteSpace: 'pre-line',
                        wordWrap:'break-word',
                        overflowY: 'scroll',
                        position: 'relative',
                        top: '0',
                        left: '0',
                        paddingRight: '15px',
                        width:'100%'
                    }}>{props.user.bio}</Typography>
                {/* <Button>Show more...</Button> */}
            </Grid>
        </Grid>
    )
}

export default UserInfo;