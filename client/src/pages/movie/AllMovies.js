import React, { useEffect, useState } from 'react'

import SidebarLayout from '../../components/sidebarLayout'
import Search from '../../components/search'
import MovieList from '../../components/MovieList'
import RegisterModal from '../../uiElements/RegisterModal'
import Loading from '../../uiElements/preloading'
import Movie from './Movie'
import { Outlet, Link, useLocation } from 'react-router-dom'

function AllMovies (props) {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  console.log(location)
  useEffect(() => {
    const loadData = async () => {
      await new Promise(r => setTimeout(r, 1000))
      setIsLoading(false)
    }
    loadData()
  }, [])

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <RegisterModal show={props.show} handleCloseModal={props.handleClose} />

        <Search />
        <div className='p-3 mt-lg-5'>
          <ul className='movies-list'>
            <li>
              <Link
                to='trending'
                className={
                 (location.pathname.includes('trending') ||
                  location.pathname.includes('allmovies')) &&
                  !location.pathname.includes('toprated') &&
                  !location.pathname.includes('upcoming')
                    ? 'active'
                    : ''
                }
              >
                Trending
              </Link>
            </li>
            <li>
              <Link
                to='toprated'
                className={
                  location.pathname.includes('toprated') ? 'active' : ''
                }
              >
                Top Rated
              </Link>
            </li>
            <li>
              <Link
                to='upcoming'
                className={
                  location.pathname.includes('upcoming') ? 'active' : ''
                }
              >
                Upcoming
              </Link>
            </li>
          </ul>
          <Outlet />
        </div>
      </SidebarLayout>
    </>
  )
}

export default AllMovies
