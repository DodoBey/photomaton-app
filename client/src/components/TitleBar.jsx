import { ArrowBackIosNew, Check, Close } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TitleBar = (props) => {
    // props: leftBtn, title, rightBtn
    const [leftBtnTag, setLeftBtnTag] = useState('')
    const [rightBtnTag, setrightBtnTag] = useState('')


    const checkVal = () => {
        props.onClick();
    }

    useEffect(() => {
        // left button
        switch (props.leftBtn.type) {
            case 'close':
                setLeftBtnTag(
                    <IconButton component={Link} to={props.leftBtn.url}>
                        <Close className='barIcon' />
                    </IconButton>
                )
                break
            case 'return':
                setLeftBtnTag(
                    <IconButton component={Link} to={props.leftBtn.url}>
                        <ArrowBackIosNew className='barIcon' />
                    </IconButton>
                )
                break
            default:
                return
        }
        // right button
        switch (props.rightBtn.type) {
            case 'none':
                setrightBtnTag(
                    <div></div>
                )
                break
            case 'submit':
                setrightBtnTag(
                    <IconButton>
                        <Check className='barIcon' onClick={checkVal}/>
                    </IconButton>
                )
                break
            default:
                return
        }
    }, [])

    return (
        <Grid container className="titleBarWrapper" margin='10px 0'>
            <Grid container width="100vw" display="flex" direction="row" justifyContent="space-between" alignItems="center">
                { leftBtnTag }
                <Typography variant="h5" color="white">{props.title}</Typography>
                { rightBtnTag }
            </Grid>
        </Grid>
    )
}

export default TitleBar;