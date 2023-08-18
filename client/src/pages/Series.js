import React from "react";
import SidebarLayout from "../components/sidebarLayout";
import { useState, useEffect } from 'react'
import Loading from '../uiElements/preloading'
import Search from '../components/search'
import TvList from "../components/TVList";
import RegisterModal from "../uiElements/RegisterModal";

function Series(props) {
    const [loading, setIsLoading] = useState(true)
    useEffect(() => {
      // Loading function to load data or
      // fake it using setTimeout;
      const loadData = async () => {
        // Wait for two second
        await new Promise(r => setTimeout(r, 800))
        // Toggle loading state
        setIsLoading(false)
      }
      loadData()
    }, [])
  
    if (loading) {
      return <Loading />
    } else {
    return ( 
        <>
           <SidebarLayout>
           <RegisterModal show={props.show} onLogin={props.onLogin} handleCloseModal={props.handleClose}/>  
           <div className="p-3">
          <Search label="Search for Movie" />
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind="onair"
          />
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind="topRated"
          />
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind="popular"
          />
        </div>
            </SidebarLayout>
 </>
    )};
}

export default Series;