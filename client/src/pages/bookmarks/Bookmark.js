import React, { useContext } from 'react'
import AuthContext from '../../helpers/authContext'
import SidebarLayout from '../../components/sidebar/sidebarLayout'
import Search from '../../components/search/search'
import BookmarkList from './BookmarkList'

function Bookmark (props) {
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
          <BookmarkList
            bookmarkedIds={bookmarkedIds}
            addBookMark={addBookMark}
            favouriteIds={favouriteIds}
            addFavourite={addFavourite}
            watchedIds={watchedIds}
            addWatched={addWatched}
            userId={userId}
          />
        </div>
      </SidebarLayout>
    </>
  )
}

export default Bookmark
