import React, { useEffect, useState } from 'react'
import { useFetcher, useParams } from 'react-router-dom'

import * as TvSeriesApi from '../../api/TvSeriesApi'

import SidebarLayout from '../../components/sidebarLayout'
import StarRating from '../../components/StarRating'
import TvList from '../../components/TVList'
import SeasonList from '../../components/SeasonList'
import RegisterModal from '../../uiElements/RegisterModal'
import Loading from '../../uiElements/preloading'

import { MdLanguage, MdSystemSecurityUpdateWarning } from 'react-icons/md'

function SeasonDetails (props) {
  const [isLoading, setIsLoading] = useState(true)
  const { id, seasonNum } = useParams()
  const [details, setDetails] = useState({})
  const [image, setImage] = useState(null)
  const [season, setSeason] = useState({})
  const [crew, setCrew] = useState([])

  const preloadImages = async data => {
    if (data?.poster_path && data.poster_path !== null) {
      const response = await fetch(
        `https://image.tmdb.org/t/p/original/${data.poster_path}`
      )
      const image = await response
      if (image.url) setImage(image.url)
    }
  }

  const fetchSeries = async id => {
    try {
      TvSeriesApi.getSeriesDetails(id).then(series => {
        setDetails(series)
      })
    } catch (err) {
      console.log(err)
    }
  }
  const fetchSeason = async (id, seasonNum) => {
    try {
      TvSeriesApi.seasonDetails(id, seasonNum).then(season => {
        console.log(season)
        preloadImages(season, 'series')
        setSeason(season)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchCrew = async id => {
    try {
      TvSeriesApi.cast(id).then(crew => {
        TvSeriesApi.crewList(crew.cast).then(data => {
          console.log(data)
          setCrew(data)
        })
      })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (id && seasonNum) {
      setIsLoading(true)
      fetchSeries(id)
      fetchSeason(id, seasonNum)
      fetchCrew(id)
      setIsLoading(false)
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
                  Episodes:&nbsp;
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
<div className='details-related-content'>
  

            {crew.length !== 0 && (
              <>
                <h3>Cast</h3>
                <div className='row m-0 p-3 d-flex'>
                  {crew.map(item => {
                    return (
                      <div
                        key={item.id}
                        className='d-flex flex-column crew card'
                      >
                        <div className='img-container'>
                          {item.image !== '' && (
                            <img src={item.image} alt={item.name} />
                          )}
                          {item.image === '' && (
                            <img
                              src={process.env.PUBLIC_URL + '../../noimage.png'}
                              alt=''
                            />
                          )}
                        </div>
                        <div className='card-body'>
                          <span className='text-secondry'> {item.name}</span>
                          <br />
                          <span> {item.character} </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}

            {season?.episodes &&
              season.episodes.length !== 0 &&
              season.episodes.map(item => {
                return (
                  <div key={item.id} className='d-flex flex-column'>
                    <span>epsiode {item.episode_number} </span>
                    <span>name {item.name}</span>
                  </div>
                )
              })}
</div>
            <div className='details-related-content'>
              {details?.seasons && details.seasons.length !== 0 && (
                <SeasonList
                  bookmarkedIds={props.bookmarkedIds}
                  addBookMark={props.addBookMark}
                  seasons={details.seasons}
                  seriesId={id}
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
