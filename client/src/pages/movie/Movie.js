import React, { useEffect, useState } from 'react'
import SidebarLayout from '../../components/sidebarLayout'
import MovieList from '../../components/MovieList'
import { useParams } from 'react-router-dom'

function Movie (props) {
  const { movietype } = useParams()
  console.log(movietype)
  useEffect(() => {

  }, [])

  return (
    <>
      <div>
        {!movietype && <p>movie</p>}
        {movietype}
      </div>
    </>
  )
}

export default Movie
