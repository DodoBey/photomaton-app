import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./errorMessage/ErrorMessage";

const Explore = () => {

  const [userName, setUserName] = useState("")
  const [message, setMessage] = useState("")
  const [users, setUsers] = useState([])


  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  // user find in database based on username
  const findUser = async (e) => {
    if (userName === ("")) {
      setMessage(<ErrorMessage error={"Input value cannot be empty"} />)
    } else {
      try {
        const { data } = await axios.post("api/users/explore", { userName })
        setUsers(
          data.user.map((foundUsers) => {
            return (
              <div className="Explore-Users" key={foundUsers._id} onClick={() => navigate(`../profile/${foundUsers._id}`)}>
                <img className="Explore-Images" src={foundUsers.avatarUrl} alt={foundUsers.userName + 'Profile Photo'} />
                <span className="Explore-Label">{foundUsers.userName}</span>
              </div>
            )
          })
        )
      } catch (error) {
        console.log(error)
      }
    }
  }

  console.log(users)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      findUser()
      setUserName("")
    }
  }

  // User Login Check, if the user is not logged in, redirect to login page
  useEffect(() => {
    if (userInfo) {
      navigate("/explore")
    } else {
      navigate("/login")
    }
  }, [userInfo, navigate])

  return (
    <>
      {message}
      <div className="Explore">
        <div className="Explore-Searchbar">
          <input type="text" id="Search-Tag" onKeyPress={handleKeyPress} value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Find User by Username" />
        </div>
        <div className="Explore-Body">
          {users}
        </div>
      </div>
    </>
  )

}
export default Explore;