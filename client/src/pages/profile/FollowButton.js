import React, { useContext, useState, useEffect } from "react";
import { useParams, Outlet, useLocation } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../helpers/authContext";
import { Button, Modal,Dropdown } from "react-bootstrap";
import "./profile.css";
import MessageModal from "../../components/uiElements/messageModel";

function FollowButton({setFollowers,followed,setFollowed,followUserId,setFollowing}) {
  const { userId, userProfile } = useContext(AuthContext);
  const { id } = useParams();
//   const [followed, setFollowed] = useState(false);
  const [message, setMessage] = useState({ text: null, state: "error" });
  const [showModal, setShowModal] = useState(false);


  // const [edit, setEdit] = useState(false);

  const handleFollow = (followUserId) => {
    console.log(followUserId)
    setFollowed(true);
    handleFollowUser(followUserId, "follow");
  };
  const handleUnfollow = (followUserId) => {
    setFollowed(false);
    handleFollowUser(followUserId, "unfollow");
  };
  const handleFollowUser = async (followUserId, type) => {
    let user = {
      userId: userId,
    };
    axios
      .put(
        `${process.env.REACT_APP_APP_URL}/users/${type}/${followUserId}`,
        user
      )
      .then((response) => {
        if (response?.status === 200) {
          console.log(response.data.user);
    

          setFollowers(response.data.user.followers);
          setFollowing(response.data.user.following)
          fetchUserProfile(id)
        } else {
          if (response?.data.message) {
            setMessage({
              text: response.data.message || "something want wrong",
              state: "error",
            });
          } else {
            setMessage({
              text: "something want wrong",
              state: "error",
            });
          }
          setFollowed(false);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data.message) {
          setMessage({
            text: err.response.data.message || "something want wrong",
            state: "error",
          });
        } else {
          setMessage({
            text: err.message || "something want wrong",
            state: "error",
          });
        }

        setFollowed(false);
      });
  };
  const fetchUserProfile = async id => {
    try {
      // setLoading(true)
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${id}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      if (result.data.profile) {
        console.log(result.data.profile)
        if (result.data.profile.user.followers.includes(followUserId)) {
          setFollowed(true)
        } else if (result.data.profile.user.following.includes(followUserId)){
          setFollowed(true) 
        }
        else{
          setFollowed(false)
        }
        // setLoading(false)
      }
    
    } catch (err) {
      console.log(err)
      // setLoading(false)
    }
  }

  const handleClear = () => {
    setMessage({ text: null, state: "error" });
  };


  const handelShowDelete = () => setShowModal(true);
  const handleCloseDelete = () => setShowModal(false);
  const handleDeleteFollow = (followUserId) => {
    handleUnfollow(followUserId);
    handleCloseDelete();
  };
  useEffect(()=>{
  if(userId){
    fetchUserProfile(userId)
  }
  },[userId])
  return (
    <>
      {message.text && <MessageModal message={message} onClear={handleClear} />}
      <Modal
        data-bs-theme="dark"
        show={showModal}
        onHide={handleCloseDelete}
        className="delete-modal "
      >
        <Modal.Body>
          <p className="text-center m-auto">
            Are you sure you want unfollow this user?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDeleteFollow(followUserId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {followed ? (
        <Dropdown className="list-dropdown follow">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Following
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item>
            <button
              onClick={() => handelShowDelete(followUserId)}
              className=" btn icon-container text-danger bookmark bookmark-btn"
            >
             Unfollow
            </button>
          </Dropdown.Item>
  
        </Dropdown.Menu>
      </Dropdown>
        // <div className="d-flex gap-1">
        //   <Button
        //     className="custom-btn "
        //     onClick={() => {
        //       handelShowDelete(id);
        //     }}
        //   >
        //     Unfollow
        //   </Button>
        //   <Button className="secondry-btn secondry cursor-default">
        //     Following
        //   </Button>
        // </div>
      ) : (
        <Button
          className="secondry-btn rounded follow-btn"
          onClick={() => {
            handleFollow(followUserId);
          }}
        >
          Follow
        </Button>
      )}
    </>
  );
}
export default FollowButton;
