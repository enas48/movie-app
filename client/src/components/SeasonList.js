import React, { useEffect, useState } from 'react'
import Carousel from 'react-grid-carousel'

import * as TvSeriesApi from '../api/TvSeriesApi'

import CarouselItem from './CarouselItem'

function SeasonList ({ seasons }) {
  const [series, setSeries] = useState([])

  useEffect(() => {
    console.log(seasons)
    TvSeriesApi.seasonList(seasons).then(data => {
      setSeries(data)
    })
    console.log(series)
  }, [seasons])

  return (
    <>
      {series.length !== 0 && (
        <div className='seasons-list'>
          <h3 className='px-md-4 mb-4'>Seasons</h3>
          <div className='col-12 mb-5 movieList'>
            <Carousel cols={4} rows={1} gap={10} loop autoplay={6000}>
              {series.length !== 0 &&
                series.map((item, i) => {
                  return (
                    <CarouselItem
                      key={i}
                      link='/details/series'
                      type='season'
                      item={item}
                    />
                  )
                })}
            </Carousel>
          </div>
        </div>
      )}
    </>
  )
}

export default SeasonList
