import React, { useEffect, useState } from 'react'

import SidebarLayout from '../../components/sidebar/sidebarLayout'
import Search from '../../components/search/search'
import MovieList from '../../components/MovieList'
import RegisterModal from '../../components/uiElements/RegisterModal'
import Loading from '../../components/uiElements/preloading'

function Movies (props) {
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
      <SidebarLayout>
        <RegisterModal show={props.show} handleCloseModal={props.handleClose} />

        {/* <Search /> */}
        <div className='p-3 '>
          <MovieList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            watchedIds={props.watchedIds}
            addWatched={props.addWatched}
            kind='trending'
            cols={2}
          />
          <MovieList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            watchedIds={props.watchedIds}
            addWatched={props.addWatched}
            kind='topRated'
            cols={3}
          />
          <MovieList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            watchedIds={props.watchedIds}
            addWatched={props.addWatched}
            kind='upcoming'
            cols={4}
          />
        </div>
      </SidebarLayout>
    </>
  )
}

export default Movies
