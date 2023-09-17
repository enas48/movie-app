import React, { useContext, useState, useEffect } from 'react'
import { useParams, Outlet, useLocation } from 'react-router-dom'
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
  const { userId, userProfile } = useContext(AuthContext)
  const { id } = useParams()
  const [profileImage, setProfileImage] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [followed, setFollowed] = useState(false)
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  // const [edit, setEdit] = useState(false);

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
      console.log(result.data)
       
    
        // if (result.data.profile.user.followers.includes(id)) {
      
        //   setFollowed(true)
        // }
        // if (result.data.profile.user.following.includes(id)) {
      
        //   setFollowed(true)
        // }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log(id)
    if (id) {
      fetchUserProfile(id)
    }

    console.log(followers)
    console.log(following)
  }, [id])

  return (
    <>
      {loading && <Loading />}
      <SidebarLayout setEdit={setEdit}>
        <Search />
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
                    {/* <div className='overlay'></div> */}
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
                      <LinkContainer to={`/profile/${id}/followers`}>
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
                      </LinkContainer>
                      {/* <div className="d-flex flex-column align-items-center ">
                        <p className="">
                          <span className="fw-bold">{following.length}</span>{" "}
                          Following
                        </p>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <p className="">
                          <span className="fw-bold">{followers.length}</span> Followers
                        </p>
                      </div> */}
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
                      followed={followed}
                      setFollowed={setFollowed}
                      followUserId={id}
                      setFollowing={setFollowing}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        <div className='content-wrap'>
          {location.pathname.includes('followers') ||
          location.pathname.includes('following') ? (
            <Nav className='tv-list profile flex-nowrap flex-shrink-0  p-3 '>
              <LinkContainer to={`/profile/${id}/followers`}>
                <Nav.Link
                  className={
                    location.pathname.includes('followers') ? 'active' : ''
                  }
                >
                  followers
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/profile/${id}/following`}>
                <Nav.Link
                  className={
                    location.pathname.includes('following') ? 'active' : ''
                  }
                >
                  following
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/profile/${id}`}>
                <Nav.Link className='back'>
                  <MdKeyboardBackspace />
                </Nav.Link>
              </LinkContainer>
            </Nav>
          ) : (
            <Nav className='tv-list profile flex-nowrap flex-shrink-0  p-3 '>
              <LinkContainer to={`/profile/${id}`}>
                <Nav.Link
                  className={location.pathname.includes('all') ? 'active ' : ''}
                >
                  All
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to={`/profile/${id}/bookmark`}>
                <Nav.Link
                  className={
                    location.pathname.includes('bookmark') ? 'active ' : ''
                  }
                >
                  wishlist
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to={`/profile/${id}/favourite`}>
                <Nav.Link
                  className={
                    location.pathname.includes('favourite') ? 'active ' : ''
                  }
                >
                  Favourite
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to={`/profile/${id}/watched`}>
                <Nav.Link
                  className={
                    location.pathname.includes('watched') ? 'active ' : ''
                  }
                >
                  Watched
                </Nav.Link>
              </LinkContainer>
            </Nav>
          )}

          {followers && following ? (
            <Outlet
              context={[
                setFollowers,
                followed,
                setFollowed,
                followers,
                following,
                setFollowing
              ]}
            />
          ) : null}
        </div>
      </SidebarLayout>
    </>
  )
}

export default ViewProfile
