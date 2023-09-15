import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'

import { RiMovie2Fill } from 'react-icons/ri'
import { MdPersonAddAlt1, MdOutlineFavorite } from 'react-icons/md'
import { PiTelevisionBold, PiBookmarkSimpleFill } from 'react-icons/pi'
import { AiFillHome } from 'react-icons/ai'
import { BiLogIn, BiCameraMovie } from 'react-icons/bi'
import { TbEyeCheck } from 'react-icons/tb'
import AuthContext from '../../helpers/authContext'

function LeftSidebar ({ setEdit = () => {} }) {
  const location = useLocation()
  const { userId, logout, userProfile } = useContext(AuthContext)
  const [profileImage, setImage] = useState(process.env.PUBLIC_URL + './person.png')
  let navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  useEffect(() => {
    if (userId) {
      if (userProfile?.profileImage !== '') {
        setImage(userProfile?.profileImage)
      }
    }
  }, [userId, userProfile])

  return (
    <div className='left-sidebar'>
      <LinkContainer to='/'>
        <Nav.Link className='navbar-brand sidebar  mb-3'>
          <RiMovie2Fill className='movie-icon' />
          <span className='icon-text'>Movie</span>
        </Nav.Link>
      </LinkContainer>
      <Nav
        className='m-auto m-lg-0 me-lg-auto top-nav d-flex flex-row flex-lg-column align-items-baseline'
        navbarScroll
      >
        <LinkContainer to='/' className=' pt-lg-4'>
          <Nav.Link
            className={location.pathname.includes('home') ? 'active' : ''}
          >
            <span className='d-flex align-items-center gap-2'>
              <AiFillHome />
              <span className='icon-text'>Home</span>
            </span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/movies'>
          <Nav.Link
            className={location.pathname.includes('movies') ? 'active' : ''}
          >
            <span className='d-flex align-items-center gap-2'>
              <BiCameraMovie />
              <span className='icon-text'>Movies</span>
            </span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/series'>
          <Nav.Link
            className={
              location.pathname.includes('series') ||
              location.pathname.includes('season')
                ? 'active'
                : ''
            }
          >
            <span className='d-flex align-items-center gap-2'>
              <PiTelevisionBold />
              <span className='icon-text'>Tv Series</span>
            </span>
          </Nav.Link>
        </LinkContainer>
        {/* {userId && (
          <>
            <LinkContainer to='/favourite'>
              <Nav.Link
                className={
                  location.pathname.includes('favourite') ? 'active' : ''
                }
              >
                <span className='d-flex align-items-center gap-2'>
                  <MdOutlineFavorite />
                  <span className='icon-text'>Favourite</span>
                </span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/wishlist'>
              <Nav.Link
                className={
                  location.pathname.includes('bookmarks') ? 'active' : ''
                }
              >
                <span className='d-flex align-items-center gap-2'>
                  <PiBookmarkSimpleFill />
                  <span className='icon-text'>Wishlist</span>
                </span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/watched'>
              <Nav.Link
                className={
                  location.pathname.includes('watched') ? 'active' : ''
                }
              >
                <span className='d-flex align-items-center gap-2'>
                  <TbEyeCheck />
                  <span className='icon-text'>Watched</span>
                </span>
              </Nav.Link>
            </LinkContainer>
          </>
        )} */}
      </Nav>

      <Nav>
        {userId ? (
          <div className='d-flex  py-2'>
            <LinkContainer
              to={`/profile/${userId}`}
              onClick={() => setEdit(false)}
            >
              <Nav.Link>
                <div className='avater'>
                  <img
                    loading='lazy'
                    src={profileImage}
                    className='img-fluid'
                    alt=''
                  />
                </div>
              </Nav.Link>
            </LinkContainer>
            <button
              onClick={handleLogout}
              className='btn-outline d-flex align-items-center gap-2 text-danger'
            >
              <span className='icon-text'>Logout</span>
              <BiLogIn className='icon' />
            </button>
          </div>
        ) : (
          <span className='d-flex align-items-center'>
            <LinkContainer to='/login'>
              <Nav.Link>
                <span className='d-flex align-items-center gap-2'>
                  <BiLogIn />
                  <span className='icon-text'>Login</span>
                </span>
              </Nav.Link>
            </LinkContainer>
            <span>|</span>
            <LinkContainer to='/register'>
              <Nav.Link>
                <span className='d-flex align-items-center gap-2'>
                  <MdPersonAddAlt1 />
                  <span className='icon-text'>Signup</span>
                </span>
              </Nav.Link>
            </LinkContainer>
          </span>
        )}
      </Nav>
    </div>
  )
}

export default LeftSidebar
