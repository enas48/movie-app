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

          <Search  />
        <div className='p-3 mt-lg-5'>
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind='onair'
            cols={2}
          />
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind='topRated'
            cols={3}
          />
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind='popular'
            cols={4}
          />
        </div>
      </SidebarLayout>
    </>
  )
}

export default Series
