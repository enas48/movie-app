import React, { useEffect, useState } from 'react'
import SidebarLayout from '../components/sidebarLayout'
import Loading from '../uiElements/preloading'
import Search from '../components/search'
import TrendingMovies from '../components/TrendingMovies'
import TopRated from '../components/TopRated'
import UpComing from '../components/UpComing'

function Movies (props) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Loading function to load data or
    // fake it using setTimeout;
    const loadData = async () => {
      // Wait for two second
      await new Promise(r => setTimeout(r, 1000))
      // Toggle loading state
      setIsLoading(false)
    }
    loadData()
  }, [])

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <div className='p-3'>
          <Search label='Search for Movie' />
          <TrendingMovies
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
          />
          <TopRated
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
          />
          <UpComing
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
          />
        </div>
      </SidebarLayout>
    </>
  )
}

export default Movies
