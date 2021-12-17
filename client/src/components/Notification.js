import { Box, Button, Modal, Fade, Avatar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notificationModal } from "../actions/modalActions";
import axios from "axios";

const Notification = () => {
  const notificationSelector = useSelector(
    (state) => state.modalReducer.notificationModal
  );
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [friendReq, setFriendReq] = useState([])
  const [modalWidth, setModalWidth] = useState('')
  
  
  useEffect(async() => {
    const res = await axios.get(`http://localhost:3333/api/users/getUser/${userInfo._id}`)
    setFriendReq(res.data.data.friends.request)
    console.log(res)
    
    if (window.innerWidth <= 450) {
      setModalWidth('90%')
    } else {
      setModalWidth('40%')
    }
  }, [])

  const handleAccept = async(senderID) => {
    const res = await axios.put('http://localhost:3333/api/users/friendAccept', {
      senderID: senderID,
      receiverID: userInfo._id
    })
    dispatch(notificationModal())
    console.log('Accept:', senderID, userInfo._id)
    console.log(res)
  }

  const handleReject = async(senderID) => {
    const res = await axios.put('http://localhost:3333/api/users/friendReject', {
      senderID: senderID,
      receiverID: userInfo._id
    })
    dispatch(notificationModal())
    console.log('Reject', senderID, userInfo._id)
    console.log(res)
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 450) {
      setModalWidth('90%')
    } else {
      setModalWidth('40%')
    }
  })

  return (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={notificationSelector}
          onClose={() => dispatch(notificationModal())}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
          
    
        >
          <Fade in={notificationSelector}>
            <Box
              className="modalWindow"
              sx={{
                width: modalWidth
              }}
            >
              {friendReq.map((obj) => {
                return (
                  <div key={obj.userID} className="friendRequest">
                    <Avatar className="friReqAvatar" alt='' src={obj.avatarUrl} />
                    <Typography variant='body2'>{obj.userName} sent a friend request</Typography>
                    <Box>
                      <Button className="requestBtn" variant='contained' color='primary' onClick={()=>handleAccept(obj.userID)}>Accept</Button>
                      <Button className="requestBtn" variant='contained' color='error' onClick={()=>handleReject(obj.userID)}>Reject</Button>
                    </Box>
                  </div>
                )
              })}
              <div className="latestEvent">

              </div>
            </Box>
          </Fade>
        </Modal>
  )
};

export default Notification;
