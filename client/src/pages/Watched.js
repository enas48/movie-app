import React, { useState, useEffect, useMemo, useContext } from 'react'
import axios from 'axios'

import AuthContext from '../helpers/authContext'
import SidebarLayout from '../components/sidebar/sidebarLayout'
import Search from '../components/search/search'
import Loading from '../components/uiElements/preloading'

import * as MovieApi from '../api/MovieApi'
import * as TvSeriesApi from '../api/TvSeriesApi'
import BfwItem from '../components/bookFavWatch/BfwItem'

function Watched (props) {
  const {
    addBookMark,
    bookmarkedIds,
    favouriteIds,
    addFavourite,
    watchedIds,
    addWatched
  } = props
  const [isLoading, setIsLoading] = useState(false)
  const [watchedMovie, setWatchedMovie] = useState([])
  const [WatchedTv, setWatchedTv] = useState([])
  const { userId } = useContext(AuthContext)

  let movieArr = useMemo(() => [], [])
  let tvArr = useMemo(() => [], [])

  const handleWatched = (e, id, type) => {
    e.stopPropagation()
    addWatched(id, type)

    if (type === 'movie') {
      let filteredWatched = watchedMovie.filter(item => {
        return item.id !== id
      })
      setWatchedMovie(filteredWatched)
    }
    if (type === 'tv') {
      let filteredWatched = WatchedTv.filter(item => {
        return item.id !== id
      })
      setWatchedTv(filteredWatched)
    }
  }
  const handleBookmark = (e, id, type) => {
    e.stopPropagation()
    addBookMark(id, type)
  }
  const handleFavourite = (e, id, type) => {
    e.stopPropagation()
    addFavourite(id, type)
  }

  const loadMovieData = async ids => {
    for (let data of ids) {
      const response = await MovieApi.getMovieDetails(data).then(movie => {
        return movie
      })
      const movie = await response
      movieArr.push(movie)
    }
    MovieApi.list(movieArr).then(data => {
      setWatchedMovie(data)
    })
  }

  const loadTvData = async ids => {
    for (let data of ids) {
      const response = await TvSeriesApi.getSeriesDetails(data).then(tv => {
        return tv
      })
      const tv = await response
      tvArr.push(tv)
    }
    TvSeriesApi.list(tvArr).then(data => {
      setWatchedTv(data)
    })
  }

  const fetchWatched= async () => {
    try {
      setIsLoading(true)
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/watched/${userId}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      if (result.data.watched) {
        let movieWatchedIds = result.data.watched
          .filter(item => item.type === 'movie')
          .map(item => item.watched_id)

        let tvWatchedIds = result.data.watched
          .filter(item => item.type === 'tv')
          .map(item => item.watched_id)

        loadMovieData(movieWatchedIds)
        loadTvData(tvWatchedIds)
      }
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchWatched()
  }, [])

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <div className='p-3'>
          <Search />
          <div className='col-12 mb-4 movieList bookmarks mt-lg-5'>
            <div className='row'>
              {watchedMovie.length !== 0 && <h3 className='mb-3'>Movies</h3>}
              {watchedMovie.length !== 0 &&
                watchedMovie.map((item, i) => {
                  return (
                    <BfwItem
                      key={i}
                      link='/details/movies'
                      item={item}
                      type='movie'
                      addBookMark={handleBookmark}
                      bookmarkedIds={bookmarkedIds}
                      favouriteIds={favouriteIds}
                      addFavourite={handleFavourite}
                      watchedIds={watchedIds}
                      addWatched={handleWatched}
                    />
                  )
                })}
            </div>
            <div className='row'>
              {WatchedTv.length !== 0 && <h3 className='mb-3'>Tv Series</h3>}
              {WatchedTv.length !== 0 &&
                WatchedTv.map((item, i) => {
                  return (
                    <BfwItem
                      key={i}
                      link='/details/series'
                      item={item}
                      type='tv'
                      addBookMark={handleBookmark}
                      bookmarkedIds={bookmarkedIds}
                      favouriteIds={favouriteIds}
                      addFavourite={handleFavourite}
                      watchedIds={watchedIds}
                      addWatched={handleWatched}
                    />
                  )
                })}
            </div>
            <div className='row'>
              {WatchedTv.length === 0 && watchedMovie.length === 0 && (
                <h3 className='mb-3'>No data found</h3>
              )}
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  )
}

export default Watched
