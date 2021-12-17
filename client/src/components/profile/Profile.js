import React, { useState, useEffect } from 'react';
import { Tab, Box, Grid } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab';
import UserInfo from './UserInfo';
import PostPhotos from './PostPhotos';
import axios from 'axios';
import { useParams } from 'react-router';
import Friends from './Friends';

const Profile = () => {
    const [userData, setUserData] = useState(null)
    const [postData, setPostData] = useState([])
    const [showContext, setShowContext] = useState('posts')
    const [contentWidth, setContentWidth] = useState('100vw')
    const { id } = useParams();

    useEffect(async () => {
        // Fetch user data
        try {
            const userRes = await axios.get(`http://localhost:3333/api/users/getUser/${id}`)
            setUserData(userRes.data.data)
        } catch (error) {
            console.log(error)
        }

        // Fetch user posts
        try {
            const postsRes = await axios.get(`http://localhost:3333/api/post/getPost/${id}`)
            setPostData(postsRes.data.data)
        } catch (error) {
            console.log(error)
        }

        // Initialize status
        setShowContext('posts')
        if (window.innerWidth <= 450) {
            setContentWidth('100vw')
        } else (
            setContentWidth('80vw')
        )
    }, [id])

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 450) {
            setContentWidth('100vw')
        } else (
            setContentWidth('80vw')
        )
    })


    return (userData) ? (
        <Grid container className="profileWrapper" direction="column" spacing={2} sx={{ width: contentWidth, margin: '0 auto' }}>
            <UserInfo user={userData} />
            <TabContext value={showContext}>
                <Box sx={{ width: '100%' }}>
                    <TabList
                        variant='fullWidth'
                        textColor='inherit'
                        indicatorColor='none'
                        onChange={(e, newValue) => setShowContext(newValue)}
                    >
                        <Tab sx={{ color: 'whitesmoke' }} label="Posts" value="posts" />
                        <Tab sx={{ color: 'whitesmoke' }} label="Friends" value="friends" />
                    </TabList>
                </Box>
                <TabPanel sx={{ width: '100%', padding: 0 }} value="posts">
                    <PostPhotos user={userData} img={postData} />
                </TabPanel>
                <TabPanel sx={{ width: '100%', padding: 0 }} value="friends">
                    <Friends user={userData} />
                </TabPanel>
            </TabContext>

        </Grid>
    ) : (<div></div>)

}

export default Profile