import React, { useState, useEffect } from 'react'

import SidebarLayout from '../../components/sidebar/sidebarLayout'
import Search from '../../components/search/search'
import TvList from '../../components/TVList'
import Loading from '../../components/uiElements/preloading'
import RegisterModal from '../../components/uiElements/RegisterModal'

function Series (props) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      await new Promise(r => setTimeout(r, 800))
      setIsLoading(false)
    }
    loadData()
  }, [])

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <RegisterModal
          show={props.show}
     
          handleCloseModal={props.handleClose}
        />

          <Search  />
        <div className='p-3 '>
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            watchedIds={props.watchedIds}
            addWatched={props.addWatched}
            kind='onair'
            cols={2}
          />
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            watchedIds={props.watchedIds}
            addWatched={props.addWatched}
            kind='topRated'
            cols={3}
          />
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            watchedIds={props.watchedIds}
            addWatched={props.addWatched}
            kind='popular'
            cols={4}
          />
        </div>
      </SidebarLayout>
    </>
  )
}

export default Series
