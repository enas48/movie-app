import React, { useEffect, useState } from 'react'
import * as MovieApi from '../api/MovieApi'
import SidebarLayout from '../components/sidebarLayout'
import Loading from '../uiElements/preloading'
import Search from '../components/search'
import { Navigate, useParams } from 'react-router-dom'

function Details (props) {
  const [isLoading, setIsLoading] = useState(true)
  const { id, type } = useParams()
  const [details, setDetails] = useState({})
  console.log(id)
  console.log(type)

  useEffect(() => {

    let preloadImages = async movie => {
      if (movie?.backdrop_path && movie.backdrop_path !== null) {
        const response = await fetch(
          `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
        )
        const image = await response
        if (image.url) setDetails({ ...details, image: image.url })
      }
    }

    const fetchMovie = async id => {
      setIsLoading(true)

      try {
        MovieApi.getMovieDetails(id).then(movie => {
          console.log(movie)
          preloadImages(movie)
          setDetails({ ...details, ...movie })
        })
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        console.log(err)
      }
    }

    const fetchSeries = async id => {
      setIsLoading(true)
      try {
        MovieApi.getSeriesDetails(id).then(series => {
          console.log(series)
          preloadImages(series)
          setDetails({ ...details, ...series })
        })
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        console.log(err)
      }
    }
    if (type === 'movies' && id) {
      fetchMovie(id)
    }
    if (type === 'series' && id) {
      fetchSeries(id)
    }
  }, [id])

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout >
        <div
          className='details-bg'
          style={{ backgroundImage: `url(${details?.image})` }}
        ></div>
        <h1>{details?.title}</h1>
      </SidebarLayout>
    </>
  )
}

export default Details
