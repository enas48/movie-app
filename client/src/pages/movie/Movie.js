import React, { useEffect, useState } from 'react'
import SidebarLayout from '../../components/sidebarLayout'
import MovieList from '../../components/MovieList'
import { useParams } from 'react-router-dom'
import * as MovieApi from '../../api/MovieApi'
import CarouselItem from '../../components/CarouselItem'

function Movie (props) {
  let { addBookMark, bookmarkedIds, favouriteIds, addFavourite, cols } = props
  const { movietype } = useParams()
  console.log(movietype)
  const [movies, setMovies] = useState([])

  const loadData = async movietype => {
    if (movietype === 'trending' || !movietype) {
      MovieApi.trendingMovies().then(movie => {
        MovieApi.list(movie.results).then(data => {
          setMovies(data.slice(0, 20))
        })
      })
    }
    if (movietype === 'topRated') {
      MovieApi.topRatedMovies().then(movie => {
        MovieApi.list(movie.results).then(data => {
          setMovies(data.slice(0, 20))
        })
      })
    }
    if (movietype === 'upcoming') {
      MovieApi.upcomingMovies().then(movie => {
        MovieApi.list(movie.results).then(data => {
          setMovies(data.slice(0, 20))
        })
      })
    }
  }

  useEffect(() => {
    loadData(movietype)
  }, [movietype,movies])

  return (
    <>
      <div>
        {
          <div className='col-12 mb-4 movieList row mx-0'>
            {movies.length !== 0 &&
              movies.map((item, i) => {
                return (
                  <div key={i} className='col-sm-6 col-md-4 col-lg-3 mb-4'>
                    <CarouselItem
                      link={`/details/movies/${item.id}`}
                      type='movie'
                      item={item}
                      addBookMark={addBookMark}
                      bookmarkedIds={bookmarkedIds}
                      favouriteIds={favouriteIds}
                      addFavourite={addFavourite}
                    />
                  </div>
                )
              })}
          </div>
        }
      </div>
    </>
  )
}

export default Movie
