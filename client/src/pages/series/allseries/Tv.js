import React, { useState, useEffect } from 'react'
import * as TvSeriesApi from '../../../api/TvSeriesApi'
import CarouselItem from '../../../components/CarouselItem'
import Paginations from '../../../components/Pagination '
import Loading from '../../../uiElements/preloading'
import { useOutletContext, useParams } from 'react-router-dom'

function Tv (props) {
  let { addBookMark, bookmarkedIds, favouriteIds, addFavourite } = props
  let [
    date,
    country,
    handleChange,
    currentPage,
    filteredGenre
  ] = useOutletContext()
  const [series, setSeries] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  let { type } = useParams()

  const handlePageChange = async pageNumber => {
    handleChange(pageNumber)
 
    if (filteredGenre.length > 0 && date === 'all') {
      loadByDateAndGenere(pageNumber, 'all', filteredGenre, country)
    } else if (date === 'latest') {
      loadByDateAndGenere(pageNumber, 'desc', filteredGenre, country)
    } else if (date === 'oldest') {
      loadByDateAndGenere(pageNumber, 'asc', filteredGenre, country)
    } else {
      loadData(pageNumber)
    }
  }
  const loadByDateAndGenere = async (currentPage, order, genre, country) => {
    setIsLoading(true)
    let genres = genre.length > 1 ? genre.join(', ') : genre.toString()
    TvSeriesApi.SortByGenreAndDate(currentPage, order, genres, country,type).then(
      series => {
        if (series.total_pages >= 10) {
          setTotalPages(10)
        } else {
          setTotalPages(series.total_pages)
        }
        TvSeriesApi.list(series.results).then(data => {
          setSeries(data)
          setIsLoading(false)
        })
      }
    )
  }

  const loadData = async currentPage => {
    setIsLoading(true)
    if (type === 'topRated') {
      TvSeriesApi.topRatedSeries(currentPage, country).then(series => {
        if (series.total_pages >= 10) {
          setTotalPages(10)
        } else {
          setTotalPages(series.total_pages)
        }
        console.log(series)
        TvSeriesApi.list(series.results).then(data => {
          setSeries(data)
          setIsLoading(false)
        })
      })
    } else if (type === 'popular') {
      TvSeriesApi.popularSeries(currentPage, country).then(series => {
        if (series.total_pages >= 10) {
          setTotalPages(10)
        } else {
          setTotalPages(series.total_pages)
        }
        console.log(series)
        TvSeriesApi.list(series.results).then(data => {
          setSeries(data)
          setIsLoading(false)
        })
      })
    } else {
      TvSeriesApi.onAir(currentPage, country).then(series => {
        if (series.total_pages >= 10) {
          setTotalPages(10)
        } else {
          setTotalPages(series.total_pages)
        }
        console.log(series)
        TvSeriesApi.list(series.results).then(data => {
          setSeries(data)
          setIsLoading(false)
        })
      })
    }
  }

  useEffect(() => {
    console.log(filteredGenre)
    if (filteredGenre.length > 0 && date === 'all') {
      console.log('1')
      loadByDateAndGenere(currentPage, 'all', filteredGenre, country)
    } else if (date === 'latest') {
      console.log('2')
      loadByDateAndGenere(currentPage, 'desc', filteredGenre, country)
    } else if (date === 'oldest') {
      console.log('3')
      loadByDateAndGenere(currentPage, 'asc', filteredGenre, country)
    } else {
      console.log('4')
      loadData(currentPage)
    }
    window.scrollTo(0, 0)
  }, [currentPage, date, country, type, filteredGenre])

  return (
    <div className='d-flex flex-column justify-content-between'>
      {isLoading ? (
        <Loading content={true} />
      ) : series.length !== 0 ? (
        <div className='col-12 mb-4 movieList bookmarks mt-4 h-100'>
          <div className='row'>
            {series.length !== 0 &&
              series.map((item, i) => {
                return (
                  <div key={i} className='col-sm-6 col-md-4 col-lg-3 mb-4'>
                    <CarouselItem
                      link={`/details/series/${item.id}`}
                      type='tv'
                      item={item}
                      addBookMark={addBookMark}
                      bookmarkedIds={bookmarkedIds}
                      favouriteIds={favouriteIds}
                      addFavourite={addFavourite}
                    />
                  </div>
                )
              })}
          </div>
        </div>
      ) : (
        <p className='text-center p-2'>No data</p>
      )}
      <Paginations
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Tv
