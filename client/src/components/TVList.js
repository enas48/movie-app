import React, { useEffect, useState } from 'react'
// import Carousel from "react-grid-carousel";
import Slider from 'react-slick'
import * as TvSeriesApi from '../api/TvSeriesApi'

import Loading from '../uiElements/preloading'
import CarouselItem from './CarouselItem'
import { LinkContainer } from 'react-router-bootstrap'

function TvList (props) {
  let {
    kind,
    id,
    addBookMark,
    bookmarkedIds,
    favouriteIds,
    addFavourite,
    cols
  } = props
  const [isLoading, setIsLoading] = useState(true)
  const [series, setSeries] = useState([])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: cols,
    slidesToScroll: cols,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: cols,
          slidesToScroll: cols,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const loadData = async () => {
    if (kind === 'onair') {
      setIsLoading(true)
      TvSeriesApi.onAir().then(series => {
        TvSeriesApi.list(series.results).then(data => {
          setSeries(data.slice(0, 18))
          setIsLoading(false)
        })
      })
    }
    if (kind === 'topRated') {
      setIsLoading(true)
      TvSeriesApi.topRatedSeries().then(series => {
        TvSeriesApi.list(series.results).then(data => {
          setSeries(data.slice(0, 18))
          setIsLoading(false)
        })
      })
    }
    if (kind === 'popular') {
      setIsLoading(true)
      TvSeriesApi.popularSeries().then(series => {
        TvSeriesApi.list(series.results).then(data => {
          setSeries(data.slice(0, 18))
          setIsLoading(false)
        })
      })
    }
    if (kind === 'similar') {
      setIsLoading(true)
      TvSeriesApi.similarSeries(id).then(series => {
        TvSeriesApi.list(series.results).then(data => {
          setSeries(data.slice(0, 18))
          setIsLoading(false)
        })
      })
    }
  }

  useEffect(() => {
    setIsLoading(true)
    loadData()
    setIsLoading(false)
  }, [kind, id])

  return (
    <div className='list'>
      {series.length !== 0 && (
        <>
          <div className='d-flex align-items-start justify-content-between'>
            <h3 className='px-md-4 mb-4'>
              {kind === 'popular' && 'Popular Tv Series'}
              {kind === 'topRated' && 'Top rated Tv Series'}
              {kind === 'onair' && 'On The Air'}
              {kind === 'similar' && 'Related Tv Series'}
            </h3>
            {kind !== 'similar' && (
              <LinkContainer to={`/allseries/${kind}`}>
                <button className='btn custom-btn'>View more</button>
              </LinkContainer>
            )}
          </div>
          {isLoading ? (
            <Loading content={true} />
          ) : (
            <div className='col-11 mx-auto mb-5 movieList'>
              <Slider {...settings}>
                {series.length !== 0 &&
                  series.map((item, i) => {
                    return (
                      <CarouselItem
                        key={i}
                        link={`/details/series/${item.id}`}
                        type='tv'
                        item={item}
                        addBookMark={addBookMark}
                        bookmarkedIds={bookmarkedIds}
                        favouriteIds={favouriteIds}
                        addFavourite={addFavourite}
                      />
                    )
                  })}
              </Slider>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default TvList
