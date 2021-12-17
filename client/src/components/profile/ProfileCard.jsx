import {Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Typography, IconButton} from '@mui/material';
import { Favorite, Share } from '@mui/icons-material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const ProfileCard = (props) => {
    const [commentList, setCommentList] = useState([])

    useEffect(async() => {
        try {
            const res = await axios.post(`http://localhost:3333/api/users/getCommentUser`, {
                users: props.post.comment.map((item)=> {return item.postedBy} )
            })
            props.post.comment.map((item) => {
                const commentAvatar = res.data.data.map((user) => {
                    if (user._id === item.postedBy) {
                        return user.avatarUrl
                    }
                })[0]
               setCommentList([...commentList, {userID: item.postedBy,avatarUrl: commentAvatar, text: item.text}]) 
            })

            
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <Card sx={{maxHeight: 700, width: 400, position: 'absolute', top: '50%', left:'50%', transform: "translate(-50%, -50%)", backgroundColor: '#151515', color: 'white'}}>
            <CardHeader
                avatar={<Avatar alt='' src={ props.user.avatarUrl }/>}
                title={<Typography variant='h6'>{ props.user.userName }</Typography>}
            />
            <CardMedia
                component="img"
                height='400'
                image={props.post.imageUrl[0]}
                alt={props.post.content}
            />
            <CardContent>
                <Typography variant='body1'>
                    {props.post.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Favorite sx={{
                        color: '#fff',
                        filter: 'drop-shadow(0 0 5px #2BC20E)'
                    }} />
                </IconButton>
                <IconButton aria-label="share">
                    <Share sx={{
                        color: '#fff',
                        filter: 'drop-shadow(0 0 5px #2BC20E)'
                    }} />
                </IconButton>
            </CardActions>
            <CardContent>
                {
                    commentList.map((item) => {
                        return (
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                margin: '20px 0',
                            }}>
                                <Avatar alt={item.userID} src={item.avatarUrl}/>
                                <Typography variant='body1' sx={{marginLeft: '10px'}}>
                                    {item.text}
                                </Typography>
                            </Box>
                        )
                    })
                }
                
            </CardContent>
        </Card>
    )
}

export default ProfileCard;