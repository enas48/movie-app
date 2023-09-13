import React, { useState } from 'react'
import { useParams, Outlet } from 'react-router-dom'

import BookmarkList from '../bookmarks/BookmarkList'
import FavouriteList from '../favourites/FavouriteList'
import WatchedList from '../watched/WatchedList'
import './profile.css'
function List (props) {
  const {
    addBookMark,
    bookmarkedIds,
    favouriteIds,
    addFavourite,
    watchedIds,
    addWatched
  } = props
  const { id, list } = useParams()

  return (
    <>
      <div className='p-3'>
        {list === 'bookmark' && (
          <BookmarkList
            bookmarkedIds={bookmarkedIds}
            addBookMark={addBookMark}
            favouriteIds={favouriteIds}
            addFavourite={addFavourite}
            watchedIds={watchedIds}
            addWatched={addWatched}
            userId={id}
          />
        )}
        {list === 'favourite' && (
          <FavouriteList
            bookmarkedIds={bookmarkedIds}
            addBookMark={addBookMark}
            favouriteIds={favouriteIds}
            addFavourite={addFavourite}
            watchedIds={watchedIds}
            addWatched={addWatched}
            userId={id}
          />
        )}
        {list === 'watched' && (
          <WatchedList
            bookmarkedIds={bookmarkedIds}
            addBookMark={addBookMark}
            favouriteIds={favouriteIds}
            addFavourite={addFavourite}
            watchedIds={watchedIds}
            addWatched={addWatched}
            userId={id}
          />
        )}
      </div>
    </>
  )
}

export default List
