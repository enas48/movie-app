import React, { useContext } from 'react'
import AuthContext from '../../helpers/authContext'
import SidebarLayout from '../../components/sidebar/sidebarLayout'
import Search from '../../components/search/search'
import FavouriteList from './FavouriteList'

function Favourite (props) {
  const {
    addBookMark,
    bookmarkedIds,
    favouriteIds,
    addFavourite,
    watchedIds,
    addWatched
  } = props

  const { userId } = useContext(AuthContext)

  return (
    <>
      <SidebarLayout>
        <Search />
        <div className='p-3'>
          <FavouriteList
            bookmarkedIds={bookmarkedIds}
            addBookMark={addBookMark}
            favouriteIds={favouriteIds}
            addFavourite={addFavourite}
            watchedIds={watchedIds}
            addWatched={addWatched}
            profileUserId={userId}
          />
        </div>
      </SidebarLayout>
    </>
  )
}

export default Favourite
