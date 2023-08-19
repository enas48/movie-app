import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import * as TvSeriesApi from '../../api/TvSeriesApi'

import SidebarLayout from '../../components/sidebarLayout'
import StarRating from '../../components/StarRating'
import TvList from '../../components/TVList'
import SeasonList from '../../components/SeasonList'
import RegisterModal from '../../uiElements/RegisterModal'
import Loading from '../../uiElements/preloading'

import { MdLanguage } from 'react-icons/md'

function SeasonDetails (props) {
  const [isLoading, setIsLoading] = useState(true)
  const { id, seasonNum } = useParams()
  const [details, setDetails] = useState({})
  const [image, setImage] = useState(null)
  const [season, setSeason] = useState({})

  const preloadImages = async series => {
    if (series?.poster_path && series.poster_path !== null) {
      const response = await fetch(
        `https://image.tmdb.org/t/p/original/${series.poster_path}`
      )
      const image = await response
      if (image.url) setImage(image.url)
    }
  }

  const fetchSeries = async id => {
    setIsLoading(true)
    try {
      TvSeriesApi.getSeriesDetails(id).then(series => {
        preloadImages(series)
        setDetails(series)
      })
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }
  const fetchSeason = async (id, seasonNum) => {
    setIsLoading(true)
    try {
      TvSeriesApi.seasonDetails(id, seasonNum).then(season => {
        console.log(season)
        setSeason(season)
      })
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id && seasonNum) {
      fetchSeries(id)
      fetchSeason(id, seasonNum)
    }
  }, [id])

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <RegisterModal
          show={props.show}
          onLogin={props.onLogin}
          handleCloseModal={props.handleClose}
        />
        {details?.id && (
          <div className='details-container'>
            <div
              style={{ backgroundImage: `url(${image})` }}
              className=' details-bg details-content d-flex flex-column gap-2'
            >
              <div className='d-flex gap-3 align-items-center'>
                <span>
                  &bull;&nbsp;
                  {season?.air_date && new Date(season.air_date).getFullYear()}
                </span>
                <span>
                  &bull;&nbsp;
                  <span>{season?.name && season.name}</span>
                </span>
              </div>
              <h1>{details?.name}</h1>

              <div className='d-flex gap-2 align-items-center mb-1'>
                <StarRating
                  rate={season?.vote_average && season.vote_average.toFixed(1)}
                />
                <span>
                  {season?.vote_average && season.vote_average.toFixed(1)}/10
                </span>
              </div>
              <p className='col-md-8 col-lg-6'>{season?.overview}</p>
              <div className='d-flex gap-4 mb-4 flex-wrap'>
                <span>
                  Episodes:
                  {season?.episodes && season.episodes.length}
                </span>
                <span className='d-flex gap-2 align-items-center'>
                  <MdLanguage />
                  <span>
                    {details?.spoken_languages &&
                      details.spoken_languages[0].english_name}
                  </span>
                </span>
              </div>
            </div>
 
            <h3>crew</h3>
            {season.episodes.length !== 0 &&
              season.episodes[0].guest_stars.length !== 0 &&
              season.episodes[0].guest_stars.map(item => {
                return (
                  <div key={item.id} className='d-flex flex-column'>
                    <span>character {item.character} </span>
                    <span>name {item.name}</span>
                    <span>character {item.character} </span>
                    <span>original_name {item.original_name}</span>
                  </div>
                )
              })}

            {season.episodes.length !== 0 &&
              season.episodes.map(item => {
                return (
                  <div key={item.id} className='d-flex flex-column'>
                    <span>epsiode {item.episode_number} </span>
                    <span>name {item.name}</span>
                  </div>
                )
              })}

            <div className='details-related-content'>
              {details?.seasons && details.seasons.length !== 0 && (
                <SeasonList
                  bookmarkedIds={props.bookmarkedIds}
                  addBookMark={props.addBookMark}
                  seasons={details.seasons}
                />
              )}
            </div>
          </div>
        )}
      </SidebarLayout>
    </>
  )
}

export default SeasonDetails
