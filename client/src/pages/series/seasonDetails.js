import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import * as TvSeriesApi from '../../api/TvSeriesApi'

import SidebarLayout from '../../components/sidebarLayout'
import SeasonList from '../../components/SeasonList'
import Crew from '../../components/Crew'
import TvList from '../../components/TVList'
import RegisterModal from '../../uiElements/RegisterModal'
import Loading from '../../uiElements/preloading'
import Episodes from './Episodes'

function SeasonDetails (props) {
  const [isLoading, setIsLoading] = useState(true)
  const { id, seasonNum } = useParams()
  const [details, setDetails] = useState({})
  const [image, setImage] = useState(null)
  const [bg, setBg] = useState(null)
  const [season, setSeason] = useState({})
const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const preloadImages = async (data, type) => {
    if (type === 'img') {
      if (data?.poster_path && data.poster_path !== null) {
        const response = await fetch(
          `https://image.tmdb.org/t/p/original/${data.poster_path}`
        )
        const image = await response
        if (image.url) setImage(image.url)
      }
    }
    if (type === 'bg') {
      if (data?.backdrop_path && data.backdrop_path !== null) {
        const response = await fetch(
          `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
        )
        const image = await response
        if (image.url) setBg(image.url)
      }
    }
  }

  const fetchSeries = async id => {
    try {
      TvSeriesApi.getSeriesDetails(id).then(series => {
        console.log(series)

        preloadImages(series, 'bg')
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
        preloadImages(season, 'img')
        setSeason(season)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchAll = async () => {
    setIsLoading(true)
    if (id && seasonNum) {
      await Promise.all([fetchSeries(id), fetchSeason(id, seasonNum)])
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchAll()
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
          <div className='details-container '>
            <div className=' details-content row m-auto d-flex justify-content-center'>
              <div
                style={{ backgroundImage: `url(${bg})` }}
                className='episode-bg'
              ></div>
              <div className='overlay eposide-overlay'></div>
              <div className='col-md-5 col-lg-3 order-md-2 text-center mb-3'>
                <img
                  src={image}
                  className='img-fluid rounded eposide '
                  alt=''
                />
              </div>
              <div className='col-md-7 col-lg-9'>
                <div className='d-flex flex-column gap-1'>
                  <h1>{details?.name}</h1>
                  {season?.season_number && (
                    <span className='d-flex gap-1'>
                      <span className='text-secondry fw-bold'>Season: </span>
                      <span>{season.season_number}</span>
                    </span>
                  )}
                  {season?.episodes && (
                    <span className='d-flex gap-1'>
                      <span className='text-secondry fw-bold'>Episodes: </span>
                      <span>{season.episodes.length}</span>
                    </span>
                  )}
                  {details?.last_air_date
                    ? season?.air_date && (
                        <span className='d-flex'>
                          <span className='text-secondry fw-bold'>
                            Release&nbsp;Date:&nbsp;
                          </span>
                          <span className='d-flex flex-wrap'>
                            <span className='text-nowrap'>
                              {new Date(season.air_date).getDate()} &nbsp;
                              {month[new Date(season.air_date).getMonth()]}
                              ,&nbsp;
                              {new Date(season.air_date).getFullYear()}
                            </span>
                            &nbsp;-&nbsp;
                            <span className='text-nowrap'>
                              {new Date(details.last_air_date).getDate()} &nbsp;
                              {
                                month[
                                  new Date(details.last_air_date).getMonth()
                                ]
                              }
                              ,&nbsp;
                              {new Date(details.last_air_date).getFullYear()}
                            </span>
                          </span>
                        </span>
                      )
                    : season?.air_date && (
                        <span className='d-flex gap-1'>
                          <span className='text-secondry fw-bold'>Release Date: </span>
                          <span className='text-nowrap'>
                            {new Date(season.air_date).getDate()} &nbsp;
                            {month[new Date(season.air_date).getMonth()]},&nbsp;
                            {new Date(season.air_date).getFullYear()}
                          </span>
                        </span>
                      )}
                  {details?.spoken_languages &&
                    details.spoken_languages[0]?.english_name && (
                      <span className='d-flex gap-1'>
                        <span className='text-secondry fw-bold'>Language: </span>
                        <span>{details.spoken_languages[0].english_name}</span>
                      </span>
                    )}
                  {details?.genres && details.genres.length !== 0 && (
                    <span className='d-flex gap-1'>
                      <span className='text-secondry fw-bold'>Genres: </span>
                      {details.genres.map((item, i) => {
                        return (
                          <span className='flex-shrink' key={item.id}>
                            {item.name}
                            {(i === 0 && details.length === 1) ||
                            i === details.genres.length - 1
                              ? ''
                              : ', '}
                          </span>
                        )
                      })}
                    </span>
                  )}
                  {details?.production_countries &&
                    details.production_countries[0]?.name && (
                      <span className='d-flex gap-1'>
                        <span className='text-secondry fw-bold'>Country: </span>
                        <span>{details.production_countries[0].name}</span>
                      </span>
                    )}

                  {details?.overview && (
                    <div>
                      <h4 className='text-secondry fw-bold mt-3'>Overview: </h4>
                      <p className='col-lg-8'>{details?.overview}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Crew id={id} type='tv' />
            {season?.episodes && (
              <Episodes
                episodes={season?.episodes && season.episodes}
                id={id}
                season_number={seasonNum}
              />
            )}
            <div className='details-related-content'>
              {details?.seasons && details.seasons.length !== 0 && (
                <SeasonList
                  bookmarkedIds={props.bookmarkedIds}
                  addBookMark={props.addBookMark}
                  seasons={details.seasons}
                  seriesId={id}
                />
              )}

              <TvList
                bookmarkedIds={props.bookmarkedIds}
                addBookMark={props.addBookMark}
                kind='similar'
                id={id}
              />
            </div>
          </div>
        )}
      </SidebarLayout>
    </>
  )
}

export default SeasonDetails
