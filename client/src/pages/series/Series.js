import React, { useState, useEffect } from 'react'

import SidebarLayout from '../../components/sidebarLayout'
import Search from '../../components/search'
import TvList from '../../components/TVList'
import Loading from '../../uiElements/preloading'
import RegisterModal from '../../uiElements/RegisterModal'

function Series (props) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      await new Promise(r => setTimeout(r, 800))
      setIsLoading(false)
    }
    loadData()
  }, [])

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <RegisterModal
          show={props.show}
          onLogin={props.onLogin}
          handleCloseModal={props.handleClose}
        />

        <div className='p-3'>
          <Search label='Search for Tv series' />
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind='onair'
          />
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind='topRated'
          />
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind='popular'
          />
        </div>
      </SidebarLayout>
    </>
  )
}

export default Series
