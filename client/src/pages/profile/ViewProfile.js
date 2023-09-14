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

function ViewProfile ({ handleUpdate, edit, setEdit }) {
  const [loading, setLoading] = useState(false)
  const { userId } = useContext(AuthContext)
  const { id } = useParams()
  const [image, setImage] = useState('')
  const [bgImage, setbgImage] = useState('')
  const location = useLocation()
  const [username, setUsername] = useState('')
  // const [edit, setEdit] = useState(false);

  const fetchUserProfile = async () => {
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
        setImage(result.data.profile.image)
        setbgImage(result.data.profile.bgImage)
        setUsername(result.data.profile.user.username)
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const bgImageStyle =
  
       {
          width: '100%',
          backgroundImage: `url(${bgImage})`,
          backgroundSize:'cover',
          backgroundPosition:'center'
        }

  useEffect(() => {
    if (id) {
      fetchUserProfile()
    }
  }, [id, edit])
  console.log(edit)
  return (
    <>
      <SidebarLayout setEdit={setEdit}>
        <Search />
        {edit && userId === id ? (
          <EditProfile handleUpdate={handleUpdate} setEdit={setEdit} />
        ) : (
          <>
          <div className='header-bg position-relative' style={bgImageStyle}>
          <div className='overlay'></div>
            <div className=' profile-header container' >
              <div className=' d-flex align-items-center gap-2 profile-info'>
                <div className='profile-container mb-2 mb-sm-3'>
                  {/* <div className='overlay'></div> */}
                  <div className='profile-image'>
                    <LazyLoadImage
                      src={
                        image === ''
                          ? process.env.PUBLIC_URL + './person.png'
                          : image
                      }
                      alt=''
                    />
                  </div>
                </div>
                <div>
                  <p className='mb-3'>{username}</p>
                  <div className='d-flex gap-2' >
                    <div className='d-flex flex-column align-items-center '>
                      <p className='fw-bold'>0</p>
                      <p className=''> Following</p>{' '}
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                      <p className='fw-bold'>0</p>
                      <p className=''> Followers</p>{' '}
                    </div>
                  </div>
                </div>
              </div>

              <div className='mb-3 d-flex ms-auto btn-container'>
                {id === userId ? (
                  // <LinkContainer to={`edit`}>
                  <Button className='custom-btn ' onClick={() => setEdit(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <Button className='custom-btn '>Follow</Button>
                )}
              </div>
            </div>
          </div>
          </>
        )}

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
              className={location.pathname.includes('watched') ? 'active ' : ''}
            >
              Watched
            </Nav.Link>
          </LinkContainer>
        </Nav>

        <Outlet />
      </SidebarLayout>
    </>
  )
}

export default ViewProfile
