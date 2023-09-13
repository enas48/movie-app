import React, { useState, useEffect, useMemo, useContext } from 'react'
import axios from 'axios'
import * as MovieApi from '../../api/MovieApi'
import * as TvSeriesApi from '../../api/TvSeriesApi'
import BfwItem from '../../components/bookFavWatch/BfwItem'
import Loading from '../../components/uiElements/preloading'

function FavouriteList (props) {
  const {
    addBookMark,
    bookmarkedIds,
    favouriteIds,
    addFavourite,
    watchedIds,
    addWatched,
    userId
  } = props
  const [isLoading, setIsLoading] = useState(false)
  const [movieFavourites, setMovieFavourites] = useState([])
  const [tvFavourites, setTvFavourites] = useState([])

  let movieArr = useMemo(() => [], [])
  let tvArr = useMemo(() => [], [])

  const handleFavourite = (e, id, type) => {
    e.stopPropagation()
    addFavourite(id, type)

    if (type === 'movie') {
      let filteredFavourites = movieFavourites.filter(item => {
        return item.id !== id
      })
      setMovieFavourites(filteredFavourites)
    }
    if (type === 'tv') {
      let filteredFavourites = tvFavourites.filter(item => {
        return item.id !== id
      })
      setTvFavourites(filteredFavourites)
    }
  }
  const handleBookmark = (e, id, type) => {
    console.log(id)
    e.stopPropagation()
    addBookMark(id, type)
  }
  const handleWatched = (e, id, type) => {
    e.stopPropagation()
    addWatched(id, type)
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
      setMovieFavourites(data)
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
      setTvFavourites(data)
    })
  }

  const fetchFavourites = async () => {
    try {
      setIsLoading(true)
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/favourites/${userId}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      if (result.data.favourite) {
        let movieFavouritesIds = result.data.favourite
          .filter(item => item.type === 'movie')
          .map(item => item.favourite_id)

        let tvFavouriteIds = result.data.favourite
          .filter(item => item.type === 'tv')
          .map(item => item.favourite_id)

        loadMovieData(movieFavouritesIds)
        loadTvData(tvFavouriteIds)
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFavourites()
  }, [])

  return (
    <>
      {isLoading && <Loading />}

      <div className='col-12 mb-4 movieList bookmarks '>
        <div className='row'>
          {movieFavourites.length !== 0 && <h3 className='mb-3'>Movies</h3>}
          {movieFavourites.length !== 0 &&
            movieFavourites.map((item, i) => {
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
          {tvFavourites.length !== 0 && <h3 className='mb-3'>Tv Series</h3>}
          {tvFavourites.length !== 0 &&
            tvFavourites.map((item, i) => {
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
          {tvFavourites.length === 0 && movieFavourites.length === 0 && (
            <h3 className='mb-3'>No data found</h3>
          )}
        </div>
      </div>
    </>
  )
}

export default FavouriteList
