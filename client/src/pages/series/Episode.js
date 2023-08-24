import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaPlay } from 'react-icons/fa'
import * as TvSeriesApi from '../../api/TvSeriesApi'
import { LazyLoadImage } from 'react-lazy-load-image-component'

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
        if (link?.link && (link.link != '') & (link.link !== null)) {
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
      {episode.image !== '' &&   <LazyLoadImage
          src={episode.image} alt={episode.name} />}
      {episode.image === '' && (
        <img  loading="lazy" src={process.env.PUBLIC_URL + '../../noimg2.jpg'} alt='' />
      )}
      <div className='overlay'></div>

      <div className='card-body'>
        <span>
          <span className='episode-num  fw-bold fs-5'>
            Eposide {episode.episode_number}
          </span>
          <br />
          <span className='text-secondry'>
            {episode?.name && episode.name.length > 60
              ? episode.name.slice(0, 60 - 1) + '…'
              : episode.name}{' '}
          </span>
        </span>
        <button
          disabled={disabled}
          className='btn icon-container'
          onClick={e => handlePlay(episode.episode_number)}
        >
          <FaPlay />
        </button>
        {episode?.overview && <span className='episode-content'> {episode.overview} </span>}
      </div>
    </div>
  )
}

export default Episode
