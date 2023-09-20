import React, { useContext, useState, useEffect } from 'react'
import { useParams, Outlet, useLocation, Link } from 'react-router-dom'
import axios from 'axios'

import Loading from '../../components/uiElements/preloading'
import AuthContext from '../../helpers/authContext'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Nav } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import SidebarLayout from '../../components/sidebar/sidebarLayout'
import Search from '../../components/search/search'
import './profile.css'
import EditProfile from './EditProfile'
import FollowButton from './FollowButton'
import { MdKeyboardBackspace } from 'react-icons/md'

function ViewProfile ({ handleUpdate, edit, setEdit }) {
  const [loading, setLoading] = useState(true)
  const { userId } = useContext(AuthContext)
  const { id } = useParams()
  const [profileImage, setProfileImage] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  const fetchUserProfile = async id => {
    try {
      setLoading(true)
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${id}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      if (result.data.profile) {
        setProfileImage(result.data.profile.profileImage)
        setCoverImage(result.data.profile.coverImage)
        setUsername(result.data.profile.user.username)
        setFollowers(result.data.profile.user.followers)
        setFollowing(result.data.profile.user.following)
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchUserProfile(id)
    }
  }, [id, edit])

  return (
    <>
      {loading && <Loading />}
      <SidebarLayout setEdit={setEdit}>
        {/* <Search /> */}
        {edit && userId === id ? (
          <EditProfile handleUpdate={handleUpdate} setEdit={setEdit} />
        ) : (
          <>
            <div className='header-bg'>
              <div className='edit-cover'>
                <div className='profile-container '>
                  <div className='profile-image'>
                    <div className='overlay'></div>

                    {coverImage !== '' && <img src={coverImage} alt='' />}
                  </div>
                </div>
              </div>
              <div className=' profile-header container'>
                <div className=' d-flex align-items-end gap-2 profile-info'>
                  <div className='profile-container '>
                    <div className='profile-image'>
                      <LazyLoadImage
                        src={
                          profileImage === ''
                            ? process.env.PUBLIC_URL + '../../person.png'
                            : profileImage
                        }
                        alt=''
                      />
                    </div>
                  </div>
                  <div>
                    <p className='mb-2 text-capitalize'>{username}</p>
                    <div className='d-flex gap-2 text-white-50'>
                      {/* <LinkContainer to={`/profile/${id}/followers`}>
                        <Nav.Link className='follow-link'>
                          <span>
                            <span className='fw-bold'>{followers.length} </span>
                            <span>followers</span>
                          </span>
                        </Nav.Link>
                      </LinkContainer>
                      <LinkContainer to={`/profile/${id}/following`}>
                        <Nav.Link className='follow-link'>
                          <span>
                            <span className='fw-bold'>{following.length} </span>
                            <span>Following</span>
                          </span>
                        </Nav.Link>
                      </LinkContainer> */}
                      <Link
                        to={`/profile/${id}/followers`}
                        className={
                          location.pathname.includes('followers')
                            ? 'follow-link active '
                            : 'follow-link'
                        }
                      >
                        <span>
                          <span className='fw-bold'>{followers.length} </span>
                          <span>followers</span>
                        </span>
                      </Link>
                      <Link
                        to={`/profile/${id}/following`}
                        className={
                          location.pathname.includes('following')
                            ? 'follow-link active '
                            : 'follow-link'
                        }
                      >
                        <span>
                          <span className='fw-bold'>{following.length} </span>
                          <span>Following</span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className='mb-3 d-flex ms-auto btn-container'>
                  {id === userId ? (
                    // <LinkContainer to={`edit`}>
                    <Button
                      className='custom-btn '
                      onClick={() => setEdit(true)}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <FollowButton
                      setFollowers={setFollowers}
                      followUserId={id}
                      setFollowing={setFollowing}
                      btnType='header-btn'
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        <div className='content-wrap container'>
          <Nav className='tv-list profile flex-nowrap flex-shrink-0  p-3 pb-0 '>
            {location.pathname.includes('followers') ||
            location.pathname.includes('following') ? (
              <>
                <Link
                  to={`/profile/${id}/followers`}
                  className={
                    location.pathname.includes('followers')
                      ? 'follow-link active '
                      : 'follow-link'
                  }
                >
                  <span>
                    <span className='fw-bold'>{followers.length} </span>
                    <span>followers</span>
                  </span>
                </Link>
                <Link
                  to={`/profile/${id}/following`}
                  className={
                    location.pathname.includes('following')
                      ? 'follow-link active '
                      : 'follow-link'
                  }
                >
                  <span>
                    <span className='fw-bold'>{following.length} </span>
                    <span>Following</span>
                  </span>
                </Link>
                <Link to={`/profile/${id}`} className='back'>
                  <MdKeyboardBackspace />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={`/profile/${id}`}
                  className={
                    !location.pathname.includes('bookmark') &&
                    !location.pathname.includes('favourite') &&
                    !location.pathname.includes('watched')
                      ? 'active '
                      : ''
                  }
                >
                  All
                </Link>
                <Link
                  to={`/profile/${id}/bookmark`}
                  className={
                    location.pathname.includes('bookmark') ? 'active ' : ''
                  }
                >
                  wishlist
                </Link>
                <Link
                  to={`/profile/${id}/favourite`}
                  className={
                    location.pathname.includes('favourite') ? 'active ' : ''
                  }
                >
                  Favourite
                </Link>
                <Link
                  to={`/profile/${id}/watched`}
                  className={
                    location.pathname.includes('watched') ? 'active ' : ''
                  }
                >
                  Watched
                </Link>
              </>
            )}
          </Nav>

          {followers && following ? (
            <Outlet
              context={[setFollowers, followers, following, setFollowing]}
            />
          ) : null}
        </div>
      </SidebarLayout>
    </>
  )
}

export default ViewProfile
