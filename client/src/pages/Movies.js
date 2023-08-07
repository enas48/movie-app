import React from 'react'
import SidebarLayout from '../components/sidebarLayout'
import { useState, useEffect } from 'react'
import Loading from '../uiElements/preloading'
import Search from '../components/search'

function Movies (props) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // Loading function to load data or
    // fake it using setTimeout;
    const loadData = async () => {
      // Wait for two second
      await new Promise(r => setTimeout(r, 1000))
      // Toggle loading state
      setLoading(loading => !loading)
    }
    loadData()
  }, [])

  if (loading) {
    return <Loading />
  } else {
    return (
      <>
        <SidebarLayout>
        <Search label="Search for Movie"/>
            movie</SidebarLayout>
      </>
    )
  }
}

export default Movies
