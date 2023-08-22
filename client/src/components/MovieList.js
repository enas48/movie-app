import React, { useEffect, useState } from 'react'
import Carousel from 'react-grid-carousel'

import * as MovieApi from '../api/MovieApi'

import Loading from '../uiElements/preloading'
import CarouselItem from './CarouselItem'

function MovieList (props) {
  let { kind, id, addBookMark, bookmarkedIds ,cols} = props
  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState([])

  const loadData = async () => {
    if (kind === 'trending') {
      MovieApi.trendingMovies().then(movie => {
        MovieApi.list(movie.results).then(data => {
          setMovies(data.slice(0, 20))
        })
      })
    }
    if (kind === 'topRated') {
      MovieApi.topRatedMovies().then(movie => {
        MovieApi.list(movie.results).then(data => {
          setMovies(data.slice(0, 20))
        })
      })
    }
    if (kind === 'upcoming') {
      MovieApi.upcomingMovies().then(movie => {
        MovieApi.list(movie.results).then(data => {
          setMovies(data.slice(0, 20))
        })
      })
    }
    if (kind === 'similar') {
      MovieApi.similarMovie(id).then(movie => {
        MovieApi.list(movie.results).then(data => {
          setMovies(data.slice(0, 20))
        })
      })
    }
  }

  useEffect(() => {
    setIsLoading(true)
    loadData()
    setIsLoading(false)
  }, [kind, id])

  return (
    <>
      {isLoading && <Loading />}
      {movies.length !== 0 && (
        <>
          <h3 className='px-md-4 mb-4'>
            {kind === 'trending' && 'Trending movies'}
            {kind === 'topRated' && 'Top rated movies'}
            {kind === 'upcoming' && 'Upcoming movies'}
            {kind === 'similar' && 'Related Movies'}
          </h3>
          <div className='col-12 mb-4 movieList'>
            <Carousel cols={cols} rows={1} gap={10} loop autoplay={6000}>
              {movies.length !== 0 &&
                movies.map((item, i) => {
                  return (
                    <Carousel.Item key={i}>
                      <CarouselItem
                        link={`/details/movies/${item.id}`}
                        type='movie'
                        item={item}
                        addBookMark={addBookMark}
                        bookmarkedIds={bookmarkedIds}
                      />
                    </Carousel.Item>
                  )
                })}
            </Carousel>
          </div>
        </>
      )}
    </>
  )
}

export default MovieList
