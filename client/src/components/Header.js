import React, { useState, useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'
import { RiMovie2Fill } from 'react-icons/ri'
import { BiLogIn } from 'react-icons/bi'
import { MdPersonAddAlt1 } from 'react-icons/md'
import AuthContext from '../helpers/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'

function Header () {
  const { userId, logout } = useContext(AuthContext)
  const [image, setImage] = useState(process.env.PUBLIC_URL + './person.png')
  const [name, setName] = useState('')
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
      setName(result.data.profile.user.username)
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
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <RiMovie2Fill className='movie-icon' />
            Movie
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='me-auto my-2 my-lg-0' navbarScroll>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/movies'>
              <Nav.Link>Movies</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/series'>
              <Nav.Link>Series</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/bookmark'>
              <Nav.Link>Bookmark</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className='ms-auto my-2 my-lg-0' navbarScroll>
            {userId ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle variant='success' id='dropdown-basic'>
                    <div className='d-flex align-items-center me-1 gap-2'>
                    <div className='avater'>
                      <img src={image} className='img-fluid' alt='' />
                    </div>
                    <span>{name}</span>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <LinkContainer to='/profile'>
                        <Nav.Link>profile</Nav.Link>
                      </LinkContainer>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <button
                        onClick={handleLogout}
                        className='btn-outline d-flex align-items-center gap-2 text-danger'
                      >
                        <span className='icon-text'>Logout</span>
                        <BiLogIn className='icon' />
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
        
              </>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header