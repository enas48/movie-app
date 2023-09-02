import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaPlay } from 'react-icons/fa'
import * as TvSeriesApi from '../../api/TvSeriesApi'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { HiOutlinePlayCircle } from 'react-icons/hi2'

function Episode ({ episode }) {
  const [disabled, setDisabled] = useState(false)
  const { id, seasonNum } = useParams()
  const [youtubevideo, setYoutubevideo] = useState('')
  const [video, setVideo] = useState('')

  const handlePlay = epNum => {
    // fetchSerisVideoYoutbe(id, seasonNum, epNum)
    // if (youtubevideo !== '') {
    //     window.open(video, '_blank')
    // }
    fetchSeriesVideo(id)
    if (video !== '') {
      window.open(video, '_blank')
    }
  }
  const fetchSerisVideoYoutbe = async (id, season_number, episode_number) => {
    try {
      setDisabled(true)
      TvSeriesApi.getSeriesVideoYoutube(id, season_number, episode_number).then(
        data => {
          if (data?.results && data.results.length !== 0) {
            let link = data.results[0].key
            if (link !== null) {
              setYoutubevideo(`https://www.youtube.com/embed/${link}`)
              setDisabled(false)
            }
          }
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  const fetchSeriesVideo = async id => {
    try {
      setDisabled(true)
      TvSeriesApi.getSeriesVideo(id).then(data => {
        let firstKey = Object.keys(data.results)[0]
        let link = data.results[firstKey]
        if (link?.link && (link.link !== '') & (link.link !== null)) {
          setVideo(link.link)
          setDisabled(false)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchSeriesVideo(id)
    // fetchSerisVideoYoutbe(id,seasonNum,episode.episode_number)
  }, [])

  return (
    <div className='d-flex flex-column episode-container card card-container'>
      {episode.image !== '' && (
        <LazyLoadImage src={episode.image} alt={episode.name} />
      )}
      {episode.image === '' && (
        <img
          loading='lazy'
          src={process.env.PUBLIC_URL + '../../noimg2.jpg'}
          alt=''
        />
      )}
      <div className='overlay'></div>

        <button
          disabled={disabled}
          className='btn icon-container p-0'
          onClick={e => handlePlay(episode.episode_number)}
        >
          <HiOutlinePlayCircle className='play-icon' />
        </button>
      <div className='card-body'>
        <span className='episode-num  fw-bold d-flex justify-content-between'>
          <span className='h5'> Eposide {episode?.episode_number}</span>
          <span className='text-white-50'>
            {episode?.runtime && (
              <>
                {episode.runtime} <span>m</span>
              </>
            )}
          </span>
        </span>
        {episode?.overview && (
          <span className='episode-content'>
            <span className='text-secondry'>
              {episode?.name && episode.name.length > 60
                ? episode.name.slice(0, 60 - 1) + '…'
                : episode.name}
            </span>
            <br />
            {episode.overview}
          </span>
        )}
      </div>
    </div>
  )
}

export default Episode
