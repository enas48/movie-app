import React, { useEffect, useState } from 'react'
import Carousel from 'react-grid-carousel'

import * as TvSeriesApi from '../api/TvSeriesApi'

import Loading from '../uiElements/preloading'
import CarouselItem from './CarouselItem'

function TvList (props) {
  let { kind, id, addBookMark, bookmarkedIds } = props
  const [isLoading, setIsLoading] = useState(true)
  const [series, setSeries] = useState([])

  function cols () {
    if (kind === 'onair') return 2
    else if (kind === 'topRated') return 3
    else return 4
  }

  const loadData = async () => {
    if (kind === 'onair') {
      TvSeriesApi.onAir().then(series => {
        TvSeriesApi.list(series.results).then(data => {
          setSeries(data.slice(0, 18))
        })
      })
    }
    if (kind === 'topRated') {
      TvSeriesApi.topRatedSeries().then(series => {
        TvSeriesApi.list(series.results).then(data => {
          setSeries(data.slice(0, 18))
        })
      })
    }
    if (kind === 'popular') {
      TvSeriesApi.popularSeries().then(series => {
        TvSeriesApi.list(series.results).then(data => {
          setSeries(data.slice(0, 18))
        })
      })
    }
    if (kind === 'similar') {
      TvSeriesApi.similarSeries(id).then(series => {
        console.log(series.results)
        TvSeriesApi.list(series.results).then(data => {
          setSeries(data.slice(0, 18))
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
    <>
      {isLoading && <Loading />}
      {series.length !== 0 && (
        <>
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
                    <CarouselItem
                      key={i}
                      link={`/details/series/${item.id}`}
                      type='movie'
                      item={item}
                      addBookMark={addBookMark}
                      bookmarkedIds={bookmarkedIds}
                    />
                  )
                })}
            </Carousel>
          </div>
        </>
      )}
    </>
  )
}

export default TvList
