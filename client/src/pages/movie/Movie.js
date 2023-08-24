import React, { useEffect, useState } from 'react'

import SidebarLayout from '../../components/sidebarLayout'
import Search from '../../components/search'
import MovieList from '../../components/MovieList'
import RegisterModal from '../../uiElements/RegisterModal'
import Loading from '../../uiElements/preloading'
import { useParams } from 'react-router-dom'

function Movie (props) {
  const [isLoading, setIsLoading] = useState(true)
  const { movietype } = useParams()
  console.log(movietype)
  useEffect(() => {
    const loadData = async () => {
      await new Promise(r => setTimeout(r, 1000))
      setIsLoading(false)
    }
    loadData()
  }, [])

  return (
    <>
      <div>{movietype} movie</div>
    </>
  )
}

export default Movie
