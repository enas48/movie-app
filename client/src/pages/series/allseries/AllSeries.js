import React, { useState, useEffect } from 'react'

import SidebarLayout from '../../../components/sidebarLayout'
import Search from '../../../components/search'
import * as TvSeriesApi from '../../../api/TvSeriesApi'
import Loading from '../../../uiElements/preloading'
import RegisterModal from '../../../uiElements/RegisterModal'
import { Outlet, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import { BiFilterAlt, BiPlus } from 'react-icons/bi'
import { MdDone } from 'react-icons/md'

function AllSeries (props) {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const [date, setDate] = useState('all')
  const [genre, setGenre] = useState([])
  const [filteredGenre, setFilteredGenre] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const handleChange = page => {
    setCurrentPage(page)
  }

  const handleClick = e => {
    setDate(e.target.value)
    setCurrentPage(1)
  }

  const handleGenre = (e, id) => {
    if (filteredGenre.includes(id)) {
      let filtered = filteredGenre.filter(item => {
        return item !== id
      })
      setFilteredGenre(filtered)
    } else {
      setFilteredGenre([...filteredGenre, id])
    }

     setCurrentPage(1)
  }

  const loadGenre = async () => {
    TvSeriesApi.getGenre().then(data => {
      console.log(data)
      setGenre(data.genres)
    })
  }

  useEffect(() => {
    const loadData = async () => {
      await new Promise(r => setTimeout(r, 800))
      setIsLoading(false)
    }
    loadGenre()
    loadData()
  }, [date, filteredGenre])

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <RegisterModal show={props.show} handleCloseModal={props.handleClose} />

        <Search />
        <div className='p-3 mt-lg-5'>
        <div className='d-flex justify-content-between flex-wrap gap-1'>
          <Nav className='tv-list flex-nowrap flex-shrink-0 '>
            <LinkContainer to='onair'>
              <Nav.Link
                className={
                  location.pathname.includes('onair') ||
                  (location.pathname.includes('allseries') &&
                    !location.pathname.includes('topRated') &&
                    !location.pathname.includes('popular'))
                    ? 'active'
                    : ''
                }
                onClick={() => {
                  setCurrentPage(1)
                  setDate('all')
                }}
              >
                onAir
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to='topRated'>
              <Nav.Link
                className={
                  location.pathname.includes('topRated') ? 'active' : ''
                }
                onClick={() => {
                  setCurrentPage(1)
                  setDate('all')
                }}
              >
                Top Rated
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to='popular'>
              <Nav.Link
                className={
                  location.pathname.includes('popular') ? 'active' : ''
                }
                onClick={() => {
                  setCurrentPage(1)
                  setDate('all')
                }}
              >
                popular
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <div className='filter-container d-flex gap-2 align-items-center'>
              <BiFilterAlt className='icon' />

              <Dropdown className='filter-dropdown'>
                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                  Select Date
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item className={date === 'all' ? 'active' : ''}>
                    <button
                      className='btn'
                      value='all'
                      onClick={e => handleClick(e)}
                    >
                      All
                    </button>
                  </Dropdown.Item>
                  <Dropdown.Item className={date === 'latest' ? 'active' : ''}>
                    <button
                      className='btn'
                      value='latest'
                      onClick={e => handleClick(e)}
                    >
                      Latest
                    </button>
                  </Dropdown.Item>
                  <Dropdown.Item className={date === 'oldest' ? 'active' : ''}>
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
                <Dropdown.Toggle
                  variant='success'
                  id='dropdown-basic'
             
                >
                  Select Genres
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className='genre'>
                    {genre.length !== 0 &&
                      genre.map(item => {
                        return (
                          <Dropdown.Item
                            key={item.id}
                            className={
                              filteredGenre.includes(item.id) ? 'active' : ''
                            }
                          >
                            {filteredGenre.includes(item.id)}
                            <button
                              className='btn'
                              onClick={e => handleGenre(e, item.id)}
                            >
                              {filteredGenre.includes(item.id)}
                              {item.name}&nbsp;
                              {filteredGenre.includes(item.id) ? (
                                <MdDone className='icon primary' />
                              ) : (
                                <BiPlus className='icon ' />
                              )}
                            </button>
                          </Dropdown.Item>
                        )
                      })}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            </div>
          <Outlet context={[date, handleChange, currentPage, filteredGenre]} />
        </div>
      </SidebarLayout>
    </>
  )
}

export default AllSeries