import { ImageList, ImageListItem, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProfileCard from './ProfileCard';

const PostPhotos = (props) => {
    const [rowHeight, setRowHeight] = useState(window.innerWidth / 3)
    const [showCard, setShowCard] = useState(false)
    const [selectPost, setSelectPost] = useState([])
    // useEffect(() => {
    //     // setRowHeight(window.innerWidth/3)
    //     // console.log(window.innerWidth)
    // }, [])

    window.addEventListener('resize', () => {
        setRowHeight(window.innerWidth/3)
    })

    const handleShowCard = (postID) => {
        setSelectPost(props.img.filter((item)=>item._id === postID))
        setShowCard(true)
    }

    return (
        <>
            <ImageList cols={3} gap={3} rowHeight={rowHeight} style={{width: '100%'}}>
                {props.img.map((data) =>
                    <ImageListItem className='imgLi' key={data._id}>
                        <img className='img' src={data.imageUrl[0]} onClick={()=>handleShowCard(data._id)} />
                    </ImageListItem>
                )}
            </ImageList>
            <Modal
                open={showCard}
                onClose={() => setShowCard(false)}
            >
                <ProfileCard user={props.user} post={selectPost[0]} />
            </Modal>
        </>
    )
}

export default PostPhotos;