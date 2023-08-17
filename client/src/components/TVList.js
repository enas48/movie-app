import React, { useEffect, useState, useMemo } from 'react'
import * as TvSeriesApi from '../api/TvSeriesApi'
import Loading from '../uiElements/preloading'
import Carousel from 'react-grid-carousel'
import { LinkContainer } from 'react-router-bootstrap'
import {
  MdOutlineBookmarkBorder,
  MdOutlineBookmark,
  MdStar
} from 'react-icons/md'
import { PiTelevisionBold } from 'react-icons/pi'
import * as Series from '../helpers/fetchSeries'

function TvList (props) {
  let { kind, id } = props
  const [isLoading, setIsLoading] = useState(true)
  const [series, setSeries] = useState([])

  const handleBookmark = (e, id) => {
    e.stopPropagation()
    props.addBookMark(id)
  }

  useEffect(() => {
    const loadData = async () => {
      if (kind === 'onair') {
        TvSeriesApi.onAir().then(series => {
          setIsLoading(true)
          Series.list(series.results).then(data => {
            setSeries(data.slice(0, 18))
          })
          setIsLoading(false)
        })
      }
      if (kind === 'topRated') {
        TvSeriesApi.topRatedSeries().then(series => {
          setIsLoading(true)
          Series.list(series.results).then(data => {
            setSeries(data.slice(0, 18))
          })
          setIsLoading(false)
        })
      }
      if (kind === 'popular') {
        TvSeriesApi.popularSeries().then(series => {
          setIsLoading(true)
          Series.list(series.results).then(data => {
            setSeries(data.slice(0, 18))
          })
          setIsLoading(false)
        })
      }
      if (kind === 'similar') {
        TvSeriesApi.similarSeries(id).then(series => {
          setIsLoading(true)
          console.log(series.results)
          Series.list(series.results).then(data => {
            setSeries(data.slice(0, 18))
          })
          setIsLoading(false)
        })
      }
  
    }
    loadData()
  }, [kind, id])

  function cols () {
    if (kind === 'similar') {
      return 5
    } else if (kind === 'onair') {
      return 2
    } else if (kind === 'topRated') {
      return 3
    } else {
      return 4
    }
  }
  return (
    <>
      {isLoading && <Loading />}
      <h3 className='px-md-4 mb-4'>
        {kind === 'popular' && 'Popular Tv Series'}
        {kind === 'topRated' && 'Top rated'}
        {kind === 'onair' && 'On The Air'}
        {kind === 'similar' && 'Related Tv Series'}
      </h3>
      <div className='col-12 mb-5 movieList'>
        <Carousel cols={cols()} rows={1} gap={10} loop autoplay={6000}>
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
                      <img src={item.image} alt={item.title} />
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
    </>
  )
}

export default TvList
