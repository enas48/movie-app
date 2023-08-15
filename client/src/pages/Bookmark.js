import React from "react";
import SidebarLayout from "../components/sidebarLayout";
import { useState, useEffect,useMemo } from 'react'
import Loading from '../uiElements/preloading'
import Search from '../components/search'

function Bookmark(props) {
    const [loading, setLoading] = useState(true)
    const[bookmarks,setBookmarks]=useState([])
    let imageArr = useMemo(() => [], []);
    
    useEffect(() => {
      // props.bookmarkedIds.forEach(element => {
        
      // });
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
           <Search label="Search for Bookmark"/>
           Bookmark
           {bookmarks.length !==0 && bookmarks.map(bookmark=>{
            return (<p>{bookmark.title}</p>)
           })}
            </SidebarLayout>
 </>
    )};
}

export default Bookmark;