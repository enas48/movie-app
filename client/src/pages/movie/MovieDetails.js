import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'

import * as MovieApi from '../../api/MovieApi'

import SidebarLayout from '../../components/sidebar/sidebarLayout'
import MovieList from '../../components/MovieList'
import Crew from '../../components/crew/Crew'
import Search from '../../components/search/search'
import Loading from '../../components/uiElements/preloading'
import RegisterModal from '../../components/uiElements/RegisterModal'
import Video from '../../components/video/Video'
import Comments from '../../components/comment/Comments'
import AuthContext from '../../helpers/authContext'
import MovieDetailsItem from './MovieDetailsItem'

function MovieDetails ({
  addBookMark,
  bookmarkedIds,
  favouriteIds,
  addFavourite,
  watchedIds,
  addWatched,
  handleClose,
  show
}) {
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const [details, setDetails] = useState({})
  const [image, setImage] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [key, setKey] = useState(null)
  const [video, setvideo] = useState('')
  const [trailerVideo, setTrailervideo] = useState('')
  const { userId } = useContext(AuthContext)

  const handleBookmark = (e, id, type) => {
    e.stopPropagation()
    addBookMark(id, type)
  }
  const handleFavourite = (e, id, type) => {
    e.stopPropagation()
    addFavourite(id, type)
  }
  const handleWatched = (e, id, type) => {
    e.stopPropagation()
    addWatched(id, type)
  }
  const handlePlay = id => {
    fetchMovieVideo(id)
    window.open(video, '_blank')
  }

  const clearVideoKey = () => {
    setKey(null)
  }

  const fetchMovieVideo = async id => {
    try {
      MovieApi.getMovieVideo(id).then(movie => {
        let firstKey = Object.keys(movie.results)[0]
        let link = movie.results[firstKey]
        setDisabled(true)
        if (link) {
          setvideo(link.link)
          setDisabled(false)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchTrailer = async id => {
    try {
      MovieApi.Trailer(id).then(data => {
        let youtubeVideos = data.results.filter(d => d.site === 'YouTube')
        setTrailervideo(youtubeVideos)
        if (youtubeVideos[0]?.key && key === null) {
          setKey(youtubeVideos[0].key)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  const playVideo = key => {
    setKey(key)
  }

  let preloadImages = async movie => {
    if (movie?.backdrop_path && movie.backdrop_path !== null) {
      const response = await fetch(
        `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
      )
      const image = await response
      if (image.url) setImage(image.url)
    }
  }

  const fetchMovie = async id => {
    try {
      MovieApi.getMovieDetails(id).then(movie => {
        preloadImages(movie)
        setDetails(movie)
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await new Promise(r => setTimeout(r, 1000))
      setIsLoading(false)
    }
    loadData()
    if (id) {
      fetchMovie(id)
      fetchMovieVideo(id)
      fetchTrailer(id)
    }
  }, [id, key])

  return (
    <>
      {isLoading && <Loading />}

      <SidebarLayout>
        <Search />
        <RegisterModal show={show} handleCloseModal={handleClose} />
        {details?.id && (
          <div className='details-container '>
            <MovieDetailsItem
              bookmarkedIds={bookmarkedIds}
              addBookMark={handleBookmark}
              favouriteIds={favouriteIds}
              addFavourite={handleFavourite}
              watchedIds={watchedIds}
              addWatched={handleWatched}
              details={details}
              image={image}
              handlePlay={handlePlay}
              disabled={disabled}
            />
           
            <Crew id={id} type='movie' />
            <Video keyVideo={key} playVideo={playVideo} video={trailerVideo} />
            <Comments id={id} type='movie' currentUserId={userId} />
            <div className='details-related-content'>
              <MovieList
                bookmarkedIds={bookmarkedIds}
                favouriteIds={favouriteIds}
                watchedIds={watchedIds}
                addBookMark={addBookMark}
                addFavourite={addFavourite}
                addWatched={addWatched}
                kind='similar'
                cols={4}
                id={id}
                clearVideoKey={clearVideoKey}
              />
            </div>
          </div>
        )}
      </SidebarLayout>
    </>
  )
}

export default MovieDetails
