import React, { useEffect, useContext } from 'react'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import { RiMovie2Fill } from 'react-icons/ri'
import { MdLocalMovies, MdPersonAddAlt1 } from 'react-icons/md'
import { PiTelevisionBold, PiBookmarkSimpleFill } from 'react-icons/pi'
import { AiFillHome } from 'react-icons/ai'
import { BiLogIn } from 'react-icons/bi'
import { useState } from 'react'
import AuthContext from '../helpers/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LeftSidebar (props) {
  const { userId, logout } = useContext(AuthContext)
  const [image, setImage] = useState(process.env.PUBLIC_URL + './person.png')
  let navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }
  const fetchUser = async () => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${userId}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      //get user
      console.log(result.data)
      if (result.data.profile.image !== '') {
        setImage(result.data.profile.image)
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (userId) {
      fetchUser()
    }
  }, [])
  return (
    <div className='left-sidebar'>
      <LinkContainer to='/'>
        <Nav.Link className='navbar-brand sidebar  mb-3'>
          <RiMovie2Fill className='movie-icon' />
          <span className='icon-text'>Movie</span>
        </Nav.Link>
      </LinkContainer>

      <Nav
        className='m-auto m-lg-0 me-lg-auto my-lg-0 d-flex flex-row flex-lg-column align-items-baseline'
        navbarScroll
      >
        <LinkContainer to='/' className='mt-lg-5 pt-lg-4'>
          <Nav.Link>
            <span className='d-flex align-items-center gap-2'>
              <AiFillHome />
              <span className='icon-text'>Home</span>
            </span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/movies'>
          <Nav.Link>
            <span className='d-flex align-items-center gap-2'>
              <MdLocalMovies />
              <span className='icon-text'>Movies</span>
            </span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/series'>
          <Nav.Link>
            <span className='d-flex align-items-center gap-2'>
              <PiTelevisionBold />
              <span className='icon-text'>Series</span>
            </span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/bookmark'>
          <Nav.Link>
            <span className='d-flex align-items-center gap-2'>
              <PiBookmarkSimpleFill />
              <span className='icon-text'>Bookmark</span>
            </span>
          </Nav.Link>
        </LinkContainer>
      </Nav>
      <Nav>
        {userId ? (
          <div className='d-flex  py-2'>
            <LinkContainer to='/profile'>
              <Nav.Link>
                <div className='avater'>
                  <img src={image} className='img-fluid' alt='' />
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
                {' '}
                <span className='d-flex align-items-center gap-2'>
                  <MdPersonAddAlt1 />
                  <span className='icon-text'>Signup</span>
                </span>{' '}
              </Nav.Link>
            </LinkContainer>
          </span>
        )}
      </Nav>
    </div>
  )
}

export default LeftSidebar
