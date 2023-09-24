import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import AuthContext from '../../helpers/authContext'
import { Button, Modal, Dropdown } from 'react-bootstrap'
import './profile.css'
import MessageModal from '../../components/uiElements/messageModel'

function FollowButton ({
  setFollowers = () => {},
  followUserId,
  setFollowing = () => {},
  btnType = 'follow-list-btn'
}) {
  const { userId } = useContext(AuthContext)
  const { id } = useParams()
  const [message, setMessage] = useState({ text: null, state: 'error' })
  const [showModal, setShowModal] = useState(false)
  const [followed, setFollowed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [notificationId, setNotificationId] = useState('')
  const handleFollow = followUserId => {
    setFollowed(true)
    handleFollowUser(followUserId, 'follow').then(() => createNotification())
  }

  const handleUnfollow = followUserId => {
    setFollowed(false)
    handleFollowUser(followUserId, 'unfollow').then(() => deleteNotification())
  }

  const handleFollowUser = async (followUserId, type) => {
    let user = {
      userId: userId
    }
    axios
      .put(
        `${process.env.REACT_APP_APP_URL}/users/${type}/${followUserId}`,
        user
      )
      .then(response => {
        if (response?.status === 200) {
          if (userId === id) {
            setFollowers(response.data.user.followers)
            setFollowing(response.data.user.following)
          }
          //to update if userid not equal id
          if (btnType !== 'follow-list-btn') {
            fetchUserProfile(id)
          }
        } else {
          if (response?.data.message) {
            setMessage({
              text: response.data.message || 'something want wrong',
              state: 'error'
            })
          } else {
            setMessage({
              text: 'something want wrong',
              state: 'error'
            })
          }
          setFollowed(false)
        }
      })
      .catch(err => {
        console.log(err)
        if (err.response?.data.message) {
          setMessage({
            text: err.response.data.message || 'something want wrong',
            state: 'error'
          })
        } else {
          setMessage({
            text: err.message || 'something want wrong',
            state: 'error'
          })
        }
        setFollowed(false)
      })
  }
  const getNotifications = async id => {
    try {
      const response = await axios(
        `${process.env.REACT_APP_APP_URL}/notifications/${id}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      if (response.data?.notifications) {
        response.data.notifications.map(item => {
          if (item.type === 'follow' && item.senderUser === userId) {
            setNotificationId(item._id)
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  const createNotification = async () => {
    let notification = {
      senderUser: userId,
      userId: followUserId,
      type: 'follow',
      text: 'started following you.',
      read: false,
      link: `/profile/${userId}`
    }
    axios
      .post(`${process.env.REACT_APP_APP_URL}/notifications`, notification)
      .then(response => {
        if (response?.status === 200) {
          getNotifications(followUserId)
        } else {
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const deleteNotification = () => {
    let data = {
      type: 'follow',
      id: notificationId,
      userId: followUserId
    }
    axios
      .delete(`${process.env.REACT_APP_APP_URL}/notifications`, {
        data: data
      })
      .then(response => {
        if (response.status === 200) {

        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const fetchUserProfile = async id => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${id}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      if (result.data.profile) {
        setFollowers(result.data.profile.user.followers)
        setFollowing(result.data.profile.user.following)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchUser = async id => {
    setIsLoading(true)
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${id}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      if (result.data.profile) {
        if (result.data.profile.user.following.includes(followUserId)) {
          setFollowed(true)
        } else {
          setFollowed(false)
        }
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setMessage({ text: null, state: 'error' })
  }

  const handelShowDelete = () => setShowModal(true)
  const handleCloseDelete = () => setShowModal(false)

  const handleDeleteFollow = followUserId => {
    handleUnfollow(followUserId)
    handleCloseDelete()
  }
  useEffect(() => {
    if (userId) {
      fetchUser(userId)
    }
    getNotifications(followUserId)

  }, [id])
  return (
    <>
      {message.text && <MessageModal message={message} onClear={handleClear} />}
      <Modal
        data-bs-theme='dark'
        show={showModal}
        onHide={handleCloseDelete}
        className='delete-modal '
      >
        <Modal.Body>
          <p className='text-center m-auto'>
            Are you sure you want unfollow this user?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
              handleCloseDelete()
            }}
          >
            Close
          </Button>
          <Button
            variant='danger'
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
              handleDeleteFollow(followUserId)
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {!isLoading && (
        <>
          {followed ? (
            <Dropdown
              className={`list-dropdown follow ${
                btnType === 'follow-list-btn' ? 'follow-list-btn' : ''
              }`}
              onClick={e => {
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              <Dropdown.Toggle variant='success' id={followUserId}>
                <span className='following-txt'> Following</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      e.preventDefault()
                      handelShowDelete(followUserId)
                    }}
                    className=' btn icon-container text-danger'
                  >
                    Unfollow
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              className={`secondry-btn rounded follow-btn ${
                btnType === 'follow-list-btn' ? 'follow-list-btn' : ''
              }`}
              onClick={e => {
                e.stopPropagation()
                e.preventDefault()
                handleFollow(followUserId)
              }}
            >
              Follow
            </Button>
          )}
        </>
      )}
    </>
  )
}
export default FollowButton
