import React, { useState, useEffect } from 'react'
import * as TvSeriesApi from '../../../api/TvSeriesApi'
import CarouselItem from '../../../components/CarouselItem'
import Paginations from '../../../components/Pagination '
import Loading from '../../../uiElements/preloading'
import { useOutletContext, useParams } from 'react-router-dom'

function Tv (props) {
  let { addBookMark, bookmarkedIds, favouriteIds, addFavourite } = props
  let [date, handleChange, currentPage, filteredGenre] = useOutletContext()
  const [series, setSeries] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  let { type } = useParams()

  const handlePageChange = async pageNumber => {
    handleChange(pageNumber)
    if (filteredGenre.length > 0 && date === 'all') {
      loadByGenre(pageNumber, filteredGenre)
    } else if (date === 'latest' && filteredGenre.length > 0) {
      loadByDateAndGenere(pageNumber, 'desc', filteredGenre)
    } else if (date === 'latest') {
      loadByDateAndGenere(pageNumber, 'desc')
    } else if (date === 'oldest' && filteredGenre.length > 0) {
      loadByDateAndGenere(pageNumber, 'asc', filteredGenre)
    } else if (date === 'oldest') {
      loadByDateAndGenere(pageNumber, 'asc')
    } else {
      loadData(pageNumber)
    }
  }
  const loadByDateAndGenere = async (currentPage, order, genre) => {
    setIsLoading(true)
    let year = new Date().toISOString().split('T')[0]
    TvSeriesApi.SortByGenreAndDate(currentPage, order, genre, year).then(
      series => {
        console.log(series)
        if (series.total_pages >= 500) {
          setTotalPages(500)
        } else {
          setTotalPages(series.total_pages)
        }
        TvSeriesApi.list(series.results).then(data => {
          console.log(data)
          setSeries(data)
          setIsLoading(false)
        })
      }
    )
  }

  const loadByGenre = async (currentPage, genre) => {
    setIsLoading(true)
    let genres = genre.length > 1 ? genre.join(', ') : genre.toString()
    TvSeriesApi.SortByGenre(currentPage, genres).then(series => {
      console.log(series)
      if (series.total_pages >= 500) {
        setTotalPages(500)
      } else {
        setTotalPages(series.total_pages)
      }
      TvSeriesApi.list(series.results).then(data => {
        console.log(data)
        setSeries(data)
        setIsLoading(false)
      })
    })
  }

  const loadData = async currentPage => {
    setIsLoading(true)
    if (type === 'topRated') {
      TvSeriesApi.topRatedSeries(currentPage).then(series => {
        if (series.total_pages >= 500) {
          setTotalPages(500)
        } else {
          setTotalPages(series.total_pages)
        }
        TvSeriesApi.list(series.results).then(data => {
          setSeries(data)
          setIsLoading(false)
        })
      })
    } else if (type === 'popular') {
      TvSeriesApi.popularSeries(currentPage).then(series => {
        console.log(series)
        if (series.total_pages >= 500) {
          setTotalPages(500)
        } else {
          setTotalPages(series.total_pages)
        }
        TvSeriesApi.list(series.results).then(data => {
          console.log(data)
          setSeries(data)
          setIsLoading(false)
        })
      })
    } else {
      TvSeriesApi.onAir(currentPage).then(series => {
        console.log(series)
        if (series.total_pages >= 500) {
          setTotalPages(500)
        } else {
          setTotalPages(series.total_pages)
        }
        TvSeriesApi.list(series.results).then(data => {
          let latest = data.sort((a, b) => b.year - a.year)
          console.log(latest)

          setSeries(latest.slice(0, 20))
          setIsLoading(false)
        })
      })
    }
  }

  useEffect(() => {
    if (filteredGenre.length > 0 && date === 'all') {
      loadByGenre(currentPage, filteredGenre)
    } else if (date === 'latest' && filteredGenre.length > 0) {
      loadByDateAndGenere(currentPage, 'desc', filteredGenre)
    } else if (date === 'latest') {
      loadByDateAndGenere(currentPage, 'desc')
    } else if (date === 'oldest' && filteredGenre.length > 0) {
      loadByDateAndGenere(currentPage, 'asc', filteredGenre)
    } else if (date === 'oldest') {
      loadByDateAndGenere(currentPage, 'asc')
    } else {
      loadData(currentPage)
    }
    window.scrollTo(0, 150)
  }, [currentPage, date, type, filteredGenre])

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
