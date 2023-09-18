import React, { useEffect, useState, useContext } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import axios from 'axios'
import './follow.css'
import FollowButton from './FollowButton'
import AuthContext from '../../helpers/authContext'
import Loading from '../../components/uiElements/preloading'

function Followers ({ setFollowers, followers, setFollowing }) {
  const { userId } = useContext(AuthContext)
  const imagePerRow = 8
  const [next, setNext] = useState(imagePerRow)
  const [followersDetails, setfollowersDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const handleMoreImage = () => {
    setNext(next + imagePerRow)
  }

  const getDetails = async followers => {
    setIsLoading(true)
    try {
      let arr = []
      for (let data of followers) {
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

      setfollowersDetails(arr)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getDetails(followers)
  }, [followers])

  return (
    <>
      {isLoading ? (
        <Loading content={true} />
      ) : (
        <div className='details-related-content'>
          {followersDetails.length !== 0 && (
            <>
              <div className='row m-0 mb-4 d-flex justify-content-center '>
                {followersDetails?.slice(0, next)?.map(item => {
                  return (
                    <div
                      className=' col-md-8 col-lg-6 col-xl-4'
                      key={item.user._id}
                    >
                      <div className='d-flex flex-row align-items-center mb-4 flex-wrap  gap-1 justify-content-between follow card card-container'>
                        <LinkContainer to={`/profile/${item.user._id}`}>
                          <div className='d-flex align-items-center me-2  gap-1 cursor-pointer'>
                            <div className='img-container'>
                              {item.profileImage !== '' && (
                                <LazyLoadImage
                                  src={item.profileImage}
                                  alt={item.user?.username}
                                />
                              )}
                              {item.profileImage === '' && (
                                <LazyLoadImage
                                  className='no-img'
                                  src={
                                    process.env.PUBLIC_URL + '../../person.png'
                                  }
                                  alt=''
                                />
                              )}
                            </div>
                            <div className='card-body p-1 text-start'>
                              <span className='text-secondry text-nowrap'>
                                {' '}
                                {item.user?.username &&
                                item.user?.username.length > 20
                                  ? item.user?.username.slice(0, 20 - 1) + '…'
                                  : item.user?.username}
                              </span>
                            </div>
                          </div>
                        </LinkContainer>
                        {userId !== item.user._id && (
                          <FollowButton
                            setFollowers={setFollowers}
                            followUserId={item.user._id}
                            setFollowing={setFollowing}
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              {next < followersDetails?.length && (
                <button
                  className='m-auto btn custom-btn mt-3'
                  onClick={handleMoreImage}
                >
                  Load more
                </button>
              )}
            </>
          )}
          {followers.length === 0 && <p>No users yet</p>}
        </div>
      )}
    </>
  )
}

export default Followers
