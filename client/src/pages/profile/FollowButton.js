import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../helpers/authContext";
import { Button, Modal, Dropdown } from "react-bootstrap";
import "./profile.css";
import MessageModal from "../../components/uiElements/messageModel";

function FollowButton({ setFollowers, followUserId, setFollowing }) {
  const { userId } = useContext(AuthContext);
  const { id } = useParams();
  const [message, setMessage] = useState({ text: null, state: "error" });
  const [showModal, setShowModal] = useState(false);
  const [followed, setFollowed] = useState(false);

  const handleFollow = (followUserId) => {
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
          if (userId === id) {
            setFollowers(response.data.user.followers);
            setFollowing(response.data.user.following);
          }
          //to update if userid not equal id
          fetchUserProfile(id);
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
  const fetchUserProfile = async (id) => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (result.data.profile) {
        setFollowers(result.data.profile.user.followers);
        setFollowing(result.data.profile.user.following);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUser = async (id) => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (result.data.profile) {
        if (result.data.profile.user.following.includes(followUserId)) {
          setFollowed(true);
        } else {
          setFollowed(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClear = () => {
    setMessage({ text: null, state: "error" });
  };

  const handelShowDelete = () => setShowModal(true);
  const handleCloseDelete = () => setShowModal(false);

  const handleDeleteFollow = (followUserId) => {
    handleUnfollow(followUserId);
    handleCloseDelete();
  };
  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [id]);
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
          <Button
            variant="danger"
            onClick={() => handleDeleteFollow(followUserId)}
          >
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
