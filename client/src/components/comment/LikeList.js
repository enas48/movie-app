import './comment.css'
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../../helpers/authContext'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import FollowButton from '../../pages/profile/FollowButton'

function LikeList ({ commentId, id, commentLikes, postType, setShowEmojis }) {
  const { userId } = useContext(AuthContext)
  const [likesList, setLikesList] = useState([])

  const getLikesDetails = async commentLikes => {
    try {
      let arr = []
      for (let data of commentLikes) {
        const response = await axios(
          `${process.env.REACT_APP_APP_URL}/profile/users/${data}`,
          {
            headers: {
              Accept: 'application/json'
            }
          }
        ).then(details => {
          return details.data.profile
        })
        const details = await response
        arr.push(details)
      }

      setLikesList(arr)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {}, [])

  return (
    <Dropdown
      className='like-list'
      onClick={e => {
        if (e.target.id === commentId) {
          getLikesDetails(commentLikes)
        }
      }}
    >
      <DropdownButton
        variant='success'
        id={commentId}
        drop='down-centered'
        title={`${commentLikes.length} ${
          commentLikes.length === 1 ? 'like' : 'likes'
        }`}
      >
        {likesList.map(item => {
          console.log(item)
          return (
            <Dropdown.Item
              key={item._id}
              className='d-flex gap-2 align-items-center'
            >
              <Link to={`/profile/${item.user._id}`} className='w-100'>
                <div className='d-flex gap-2 align-items-center w-100'>
                  <div className='img-container'>
                    {item.profileImage !== '' && (
                      <LazyLoadImage
                        src={item.profileImage}
                        alt={item.user?.username}
                        className='img-fluid'
                      />
                    )}
                    {item.profileImage === '' && (
                      <LazyLoadImage
                        className='no-img img-fluid'
                        src={process.env.PUBLIC_URL + '../../person.png'}
                        alt=''
                      />
                    )}
                  </div>
                  <span>
                    {item.user?.username && item.user?.username.length > 15
                      ? item.user?.username.slice(0, 15 - 1) + '…'
                      : item.user?.username}
                  </span>
                </div>
              </Link>
              <div className='ms-auto'>
                {userId !== item.user._id && (
                  <FollowButton
                    btnType='header-btn'
                    followUserId={item.user._id}
                  />
                )}
              </div>
            </Dropdown.Item>
          )
        })}
      </DropdownButton>

    </Dropdown>

  )
}
export default LikeList
