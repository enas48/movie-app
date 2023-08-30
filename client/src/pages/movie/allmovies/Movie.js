import React, { useState, useEffect } from 'react'
import * as MovieApi from '../../../api/MovieApi'
import CarouselItem from '../../../components/CarouselItem'
import Paginations from '../../../components/Pagination '
import Loading from '../../../uiElements/preloading'
import { useOutletContext, useParams } from 'react-router-dom'

function Movie (props) {
  let { addBookMark, bookmarkedIds, favouriteIds, addFavourite } = props
  let [date,country, handleChange, currentPage, filteredGenre] = useOutletContext()
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  let { type } = useParams()
console.log(country)
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

  const loadByDateAndGenere = async (currentPage, order, genre,country) => {
    setIsLoading(true)
    let year = new Date().toISOString().split('T')[0]
    MovieApi.SortByGenreAndDate(currentPage, order, genre, year,country).then(movie => {
      console.log(movie)
      if (movie.total_pages >= 500) {
        setTotalPages(500)
      } else {
        setTotalPages(movie.total_pages)
      }
      MovieApi.list(movie.results).then(data => {
        console.log(data)
        setMovies(data)
        setIsLoading(false)
      })
    })
  }

  const loadByGenre = async (currentPage, genre,country) => {
    setIsLoading(true)
    let genres = genre.length > 1 ? genre.join(', ') : genre.toString()
    MovieApi.SortByGenre(currentPage, genres,country).then(movie => {
      console.log(movie)
      if (movie.total_pages >= 500) {
        setTotalPages(500)
      } else {
        setTotalPages(movie.total_pages)
      }
      MovieApi.list(movie.results).then(data => {
        console.log(data)
        setMovies(data)
        setIsLoading(false)
      })
    })
  }

  const loadCountry= async currentPage => {
    setIsLoading(true)
  
      MovieApi.SortByCountry(currentPage,country).then(movie => {
        console.log(movie)
        if (movie.total_pages >= 500) {
          setTotalPages(500)
        } else {
          setTotalPages(movie.total_pages)
        }
        MovieApi.list(movie.results).then(data => {
          setMovies(data)
          setIsLoading(false)
        })
      })
  
  }

  const loadData = async currentPage => {
    setIsLoading(true)
    if (type === 'topRated') {
      MovieApi.topRatedMovies(currentPage).then(movie => {
        if (movie.total_pages >= 500) {
          setTotalPages(500)
        } else {
          setTotalPages(movie.total_pages)
        }
        MovieApi.list(movie.results).then(data => {
          setMovies(data)
          setIsLoading(false)
        })
      })
    } else if (type === 'upcoming') {
      MovieApi.upcomingMovies(currentPage).then(movie => {
        console.log(movie)
        if (movie.total_pages >= 500) {
          setTotalPages(500)
        } else {
          setTotalPages(movie.total_pages)
        }
        MovieApi.list(movie.results).then(data => {
          console.log(data)
          setMovies(data)
          setIsLoading(false)
        })
      })
    } else {
      MovieApi.trendingMovies(currentPage).then(movie => {
        console.log(movie)
        if (movie.total_pages >= 500) {
          setTotalPages(500)
        } else {
          setTotalPages(movie.total_pages)
        }
        MovieApi.list(movie.results).then(data => {
          let latest = data.sort((a, b) => b.year - a.year)
          console.log(latest)

          setMovies(latest.slice(0, 20))
          setIsLoading(false)
        })
      })
    }
  }

  useEffect(() => {
    // if(country !=='') {
    //   loadCountry(currentPage)
    // }
    // else 
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
    window.scrollTo(0, 80)
  }, [currentPage, date,country, type, filteredGenre])

  return (
    <div className='d-flex flex-column justify-content-between'>
      {isLoading ? (
        <Loading content={true} />
      ) : movies.length !== 0 ? (
        <div className='col-12 mb-4 movieList bookmarks mt-4 h-100'>
          <div className='row'>
            {movies.length !== 0 &&
              movies.map((item, i) => {
                return (
                  <div key={i} className='col-sm-6 col-md-4 col-lg-3 mb-4'>
                    <CarouselItem
                      link={`/details/movies/${item.id}`}
                      type='movie'
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

export default Movie
