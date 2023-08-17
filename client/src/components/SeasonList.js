import React, { useEffect, useMemo, useState } from 'react'
import TvList from './TVList'
import * as TvSeriesApi from '../api/TvSeriesApi'
import Carousel from 'react-grid-carousel'
import { LinkContainer } from 'react-router-bootstrap'
import {
  MdOutlineBookmarkBorder,
  MdOutlineBookmark,
  MdStar
} from 'react-icons/md'
import { PiTelevisionBold } from 'react-icons/pi'

function SeasonList (props) {
  const [image, setImage] = useState(null)
  const [series, setSeries] = useState([])
  let seasons = props.seasons
  const handleBookmark = (e, id) => {
    e.stopPropagation()
    props.addBookMark(id)
  }
  let imageArr = useMemo(() => [], [])

  let preloadImages = async results => {
    console.log(results)
    for (let data of results) {
      if (data?.poster_path && data.poster_path !== null) {
        const response = await fetch(
          `https://image.tmdb.org/t/p/original/${data.poster_path}`
        )
        const image = await response
        if (image?.url) {
          imageArr.push({
            id: data.id,
            name: data.name,
            year: new Date(data.air_date).getFullYear(),
            season_number: data.season_number,
            rate: data.vote_average.toFixed(1),
            image: image.url
          })
        }
      } else {
        imageArr.push({
          id: data.id,
          name: data.name,
          year: new Date(data.air_date).getFullYear(),
          season_number: data.season_number,
          rate: data.vote_average.toFixed(1),
          image: ''
        })
      }
      setSeries(imageArr)
    }
  }
  useEffect(() => {
    console.log(seasons)
    preloadImages(seasons)
    console.log(series)
  }, [seasons])
  return (
    <div className='seasons-list'>
      <h3 className='px-md-4 mb-4'>Seasons</h3>
      <div className='col-12 mb-5 movieList'>
        <Carousel cols={4} rows={1} gap={10} loop autoplay={6000}>
          {series.length !== 0 &&
            series.map((item, i) => {
              return (
                <Carousel.Item key={i}>
                  <LinkContainer
                    to={`/details/series/${item.id}`}
                    onClick={() =>
                      (window.location.href = `/details/series/${item.id}`)
                    }
                  >
                    <div
                      className={`
                    ${props.kind === 'trending' ? 'pc' : ''}
                    card trending   d-flex flex-column justify-content-between`}
                    >
                      {item.image !== '' && (
                        <img src={item.image} alt={item.name} />
                      )}
                      <div className='overlay'></div>
                      <div className='d-flex align-items-center gap-1'>
                        <MdStar className='text-warning' /> {item.rate}
                        <button
                          onClick={e => handleBookmark(e, item.id)}
                          className='btn-outline bookmark-btn text-white d-flex justify-content-end gap-2 '
                        >
                          {props.bookmarkedIds.includes(item.id.toString()) ? (
                            <MdOutlineBookmark className='bookmark_icon' />
                          ) : (
                            <MdOutlineBookmarkBorder className='bookmark_icon' />
                          )}
                        </button>
                      </div>
                      <div className='d-flex   flex-column '>
                        <div className='d-flex gap-2'>
                          <span>{item.year}</span>
                          <span>
                            <PiTelevisionBold />
                          </span>
                        </div>
                        <h5>
                          {item?.name && item.name.length > 20
                            ? item.name.slice(0, 30 - 1) + '…'
                            : item.name}
                        </h5>
                      </div>
                    </div>
                  </LinkContainer>
                </Carousel.Item>
              )
            })}
        </Carousel>
      </div>
    </div>
  )
}

export default SeasonList
