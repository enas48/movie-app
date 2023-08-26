import React, { useState, useEffect } from 'react'

import SidebarLayout from '../../../components/sidebarLayout'
import Search from '../../../components/search'

import Loading from '../../../uiElements/preloading'
import RegisterModal from '../../../uiElements/RegisterModal'
import { Outlet, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'

function AllMovies (props) {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const [date, setDate] = useState('')

  useEffect(() => {
    const loadData = async () => {
      await new Promise(r => setTimeout(r, 800))
      setIsLoading(false)
    }
    loadData()
  }, [])
  const handleClick = e => {
    // console.log(e.target.value)
    setDate(e.target.value)
  }

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <RegisterModal show={props.show} handleCloseModal={props.handleClose} />

        <Search />
        <div className='p-3 mt-lg-5'>
          <div className='d-flex justify-content-between'>
            <Nav className='tv-list '>
              <LinkContainer to='trending'>
                <Nav.Link
                  className={
                    location.pathname.includes('trending') ||
                    (location.pathname.includes('allmovies') &&
                      !location.pathname.includes('topRated') &&
                      !location.pathname.includes('upcoming'))
                      ? 'active'
                      : ''
                  }
                >
                  Trending
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='topRated'>
                <Nav.Link
                  className={
                    location.pathname.includes('topRated') ? 'active' : ''
                  }
                >
                  Top Rated
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='upcoming'>
                <Nav.Link
                  className={
                    location.pathname.includes('upcoming') ? 'active' : ''
                  }
                >
                  Upcoming
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <div className='filter-container d-flex gap-2'>
              <Dropdown className='filter-dropdown'>
                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                  By Date
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <button
                      className='btn'
                      value='latest'
                      onClick={e => handleClick(e)}
                    >
                      Latest
                    </button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    {' '}
                    <button
                      className='btn'
                      value='oldest'
                      onClick={e => handleClick(e)}
                    >
                      Oldest
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className='filter-dropdown'>
                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                  By Genere
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Latest</Dropdown.Item>
                  <Dropdown.Item>Oldest</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <Outlet context={[date]} />
        </div>
      </SidebarLayout>
    </>
  )
}

export default AllMovies
