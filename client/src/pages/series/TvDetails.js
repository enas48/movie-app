import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'

import * as TvSeriesApi from '../../api/TvSeriesApi'

import SidebarLayout from '../../components/sidebar/sidebarLayout'
import TvList from '../../components/TVList'
import SeasonList from '../../components/SeasonList'
import Search from '../../components/search/search'
import RegisterModal from '../../components/uiElements/RegisterModal'
import Loading from '../../components/uiElements/preloading'
import Video from '../../components/video/Video'
import Comments from '../../components/comment/Comments'
import AuthContext from '../../helpers/authContext'
import DetailsItem from './DetailsItem'

function TvDetails ({
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
  const [key, setKey] = useState(null)
  const [video, setVideos] = useState([])
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
  const clearVideoKey = () => {
    setKey(null)
  }
  const preloadImages = async series => {
    if (series?.backdrop_path && series.backdrop_path !== null) {
      const response = await fetch(
        `https://image.tmdb.org/t/p/original/${series.backdrop_path}`
      )
      const image = await response
      if (image.url) setImage(image.url)
    }
  }

  const fetchSeries = async id => {
    try {
      TvSeriesApi.getSeriesDetails(id).then(series => {
        preloadImages(series)
        setDetails(series)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchTrailer = async id => {
    try {
      TvSeriesApi.Trailer(id).then(data => {
        let youtubeVideos = data.results.filter(d => d.site === 'YouTube')
        setVideos(youtubeVideos)
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
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await new Promise(r => setTimeout(r, 1000))
      setIsLoading(false)
    }
    loadData()
    if (id) {
      fetchSeries(id)
      fetchTrailer(id)
    }
  }, [id, key])

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        {/* <Search /> */}
        <RegisterModal show={show} handleCloseModal={handleClose} />
        {details?.id && (
          <div className='details-container '>
            <DetailsItem
              bookmarkedIds={bookmarkedIds}
              addBookMark={handleBookmark}
              favouriteIds={favouriteIds}
              addFavourite={handleFavourite}
              watchedIds={watchedIds}
              addWatched={handleWatched}
              details={details}
              image={image}
            />
            <Video keyVideo={key} playVideo={playVideo} video={video} />
            <Comments id={id} type='tv' currentUserId={userId} />
            <div className='details-related-content container'>
              {details?.seasons && details.seasons.length !== 0 && (
                <SeasonList
                  bookmarkedIds={bookmarkedIds}
                  addBookMark={addBookMark}
                  favouriteIds={favouriteIds}
                  addFavourite={addFavourite}
                  watchedIds={watchedIds}
                  addWatched={addWatched}
                  seasons={details.seasons}
                  seriesId={details.id}
                  clearVideoKey={clearVideoKey}
                />
              )}

              <TvList
                bookmarkedIds={bookmarkedIds}
                addBookMark={addBookMark}
                favouriteIds={favouriteIds}
                addFavourite={addFavourite}
                watchedIds={watchedIds}
                addWatched={addWatched}
                kind='similar'
                id={id}
                cols={4}
                clearVideoKey={clearVideoKey}
              />
            </div>
          </div>
        )}
      </SidebarLayout>
    </>
  )
}

export default TvDetails
