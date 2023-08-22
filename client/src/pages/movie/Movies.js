import React, { useEffect, useState } from 'react'

import SidebarLayout from '../../components/sidebarLayout'
import Search from '../../components/search'
import MovieList from '../../components/MovieList'
import RegisterModal from '../../uiElements/RegisterModal'
import Loading from '../../uiElements/preloading'

function Movies (props) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      await new Promise(r => setTimeout(r, 1000))
      setIsLoading(false)
    }
    loadData()
  }, [])

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout handleSearch={props.handleSearch}>
        <RegisterModal
          show={props.show}
          onLogin={props.onLogin}
          handleCloseModal={props.handleClose}
        />
        <div className='p-3'>
          <Search label='Search for Movie' handleSearch={props.handleSearch} searchList={props.searchList}/>

          <MovieList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind='trending'
          />
          <MovieList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind='topRated'
          />
          <MovieList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind='upcoming'
          />
        </div>
      </SidebarLayout>
    </>
  )
}

export default Movies
