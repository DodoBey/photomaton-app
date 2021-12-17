import { Avatar, Box, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Friends = (props) => {
    const navigate = useNavigate();
    const [friendsList, setFriendsList] = useState([])

    useEffect(async () => {
        try {
            const friListRes = await axios.get(`http://localhost:3333/api/users/getUser/${props.user._id}`)
            setFriendsList(friListRes.data.data.friends.friendsList)
        } catch (error) {
            console.log(error)
        }
    }, [props.user._id])

    return (
        <Grid container display="flex" direction="column" sx={{padding:'1vh 5vw'}}>
            {friendsList.map((obj) => {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            padding: '1vh 0'
                        }}
                        key={obj.userID}
                        className='simpleUserInfo'
                        onClick={() => navigate(`/profile/${obj.userID}`)}
                    >
                        <Avatar alt='' src={obj.avatarUrl} />
                        <Typography sx={{marginLeft: '30px'}} variant='h6' color='white'>{ obj.userName }</Typography>
                    </Box>
                )
            })}
        </Grid>
    )
}

export default Friends;