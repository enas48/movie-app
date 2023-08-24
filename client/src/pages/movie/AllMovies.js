import React, { useEffect, useState } from 'react'

import SidebarLayout from '../../components/sidebarLayout'
import Search from '../../components/search'
import MovieList from '../../components/MovieList'
import RegisterModal from '../../uiElements/RegisterModal'
import Loading from '../../uiElements/preloading'

function AllMovies (props) {
  const [isLoading, setIsLoading] = useState(true)

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
      <SidebarLayout >
        <RegisterModal
          show={props.show}
    
          handleCloseModal={props.handleClose}
        />
    
          <Search />
          <div className='p-3 mt-lg-5'>
          <MovieList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            kind='trending'
            cols={2}
          />
          <MovieList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            kind='topRated'
            cols={3}
          />
          <MovieList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            kind='upcoming'
            cols={4}
          />
        </div>
      </SidebarLayout>
    </>
  )
}

export default AllMovies