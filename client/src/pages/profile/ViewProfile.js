import React, { useContext, useState, useEffect } from 'react'
import { useParams, Outlet, useLocation } from 'react-router-dom'
import axios from 'axios'

import Loading from '../../components/uiElements/preloading'
import AuthContext from '../../helpers/authContext'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Nav } from 'react-bootstrap'

import SidebarLayout from '../../components/sidebar/sidebarLayout'
import Search from '../../components/search/search'
import './profile.css'

function ViewProfile (props) {
  const [loading, setLoading] = useState(false)
  const { userId } = useContext(AuthContext)
  const { id } = useParams()
  const [image, setImage] = useState('')
  const location = useLocation()
  const [username, setUsername] = useState('')

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
        setUsername(result.data.profile.user.username)
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchUserProfile()
    }
  }, [id])

  return (
    <>
      {loading && <Loading />}
      <SidebarLayout>
      <Search />
        <div className='header-bg'>
          <div className=' profile-header container'>
            <div className=' d-flex align-items-center gap-2 profile-info'>
              <div className='profile-container mb-2 mb-sm-3'>
                {/* <div className='overlay'></div> */}
                <div className='profile-image'>
                  <img
                    src={
                      image === ''
                        ? process.env.PUBLIC_URL + './person.png'
                        : image
                    }
                    alt=''
                  />
                </div>
              </div>
              <p className='mb-3'>{username}</p>
            </div>
            <div className='mb-3 d-flex ms-auto btn-container'>
              {id === userId ? (
                <LinkContainer to={`edit`}>
                  <Button className='custom-btn '> Edit Profile</Button>
                </LinkContainer>
              ) : (
                <Button className='custom-btn '>Follow</Button>
              )}
            </div>
          </div>
        </div>
        <Nav className='tv-list flex-nowrap flex-shrink-0 mb-3 p-3 text-center justify-content-center'>
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
