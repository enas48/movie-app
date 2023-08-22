import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import { MdLocalMovies } from 'react-icons/md'
import { PiTelevisionBold } from 'react-icons/pi'
import { useParams, useLocation } from 'react-router-dom'
import Loading from '../uiElements/preloading'
import MovieDetails from './movie/MovieDetails'
import TvDetails from './series/TvDetails'
import Person from './Person'

function SearchItem (props) {
  const { id } = useParams()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const { data } = location.state
  console.log(data)
  console.log(id)
  const [type, setType] = useState('')
  useEffect(() => {
    setIsLoading(true)
    setType(data.media_type)
    setIsLoading(false)
  }, [data])

  return (
    <>
      {isLoading && <Loading />}
      {type === 'movie' && (
        <MovieDetails
        bookmarkedIds={props.bookmarkedIds}
        addBookMark={props.addBookMark}
        show={props.show}
        handleClose={props.handleClose}
        onLogin={props.login}
        onLogout={props.logout}
        />
      )}
      {type === 'tv' && (
        <TvDetails
        bookmarkedIds={props.bookmarkedIds}
        addBookMark={props.addBookMark}
        show={props.show}
        handleClose={props.handleClose}
        onLogin={props.login}
        onLogout={props.logout}

        />
      )}
      {type === 'person' && (
        <Person
        bookmarkedIds={props.bookmarkedIds}
        addBookMark={props.addBookMark}
        show={props.show}
        handleClose={props.handleClose}
        onLogin={props.login}
        onLogout={props.logout}
     
        />
      )}
      {type !== 'movie' || type !== 'tv' || (type !== 'person' && 'no result')}
    </>
  )
}

export default SearchItem
