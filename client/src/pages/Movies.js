import React, { useEffect, useState, useMemo } from 'react'
import SidebarLayout from '../components/sidebarLayout'
import * as MovieApi from '../api/MovieApi'
import Loading from '../uiElements/preloading'
import Search from '../components/search'
import Carousel from 'react-grid-carousel'
import { LinkContainer } from 'react-router-bootstrap'
import {
  MdLocalMovies,
  MdOutlineBookmarkBorder,
  MdOutlineBookmark
} from 'react-icons/md'

function Movies (props) {
  const [isLoading, setIsLoading] = useState(false)
  const [trendMovies, setTrendMovies] = useState([])
  const [bookmarkedIds, setBookMarkedId] = useState([])

  let imageArr = useMemo(() => [], [])

  const handleBookmark = (e, id) => {
    e.stopPropagation()
    if (bookmarkedIds.includes(id)) {
      let filteredBookmarks = bookmarkedIds.filter(item => {
        return item !== id
      })
      setBookMarkedId(filteredBookmarks)
    } else {
      setBookMarkedId([...bookmarkedIds, id])
    }
  }
  useEffect(() => {
    const loadData = async () => {
      let preloadImages = async results => {
        setIsLoading(true)

        for (let data of results) {
          if (data?.backdrop_path && data.backdrop_path !== null) {
            const response = await fetch(
              `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
            )
            const image = await response
            if (image?.url) {
              imageArr.push({
                id: data.id,
                title: data.title,
                year: new Date(data.release_date).getFullYear(),
                type: data.media_type,
                image: image.url
              })
            }
          }
        }
        setTrendMovies(imageArr.slice(0, 18))
        await new Promise(r => setTimeout(r, 800))
        setIsLoading(loading => !loading)
      }

      MovieApi.trendingMovies().then(movie => {
        preloadImages(movie.results)
      })
    }
    loadData()
  }, [imageArr])

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <Search label='Search for Movie' />
        <h3 className='px-md-4'>Trending</h3>
        <div className='col-12'>
          <Carousel cols={3} rows={1} gap={10} loop autoplay={6000}>
            {trendMovies.length !== 0 &&
              trendMovies.map((item, i) => {
                return (
                  <Carousel.Item key={i} >
                    <LinkContainer to='/'>
                      <div className='card trending d-flex flex-column justify-content-between'>
                        <img src={item.image} alt={item.title} />
                        <div className='overlay'></div>
                        <button
                          onClick={e => handleBookmark(e, item.id)}
                          className='btn-outline bookmark-btn text-white d-flex justify-content-end gap-2 '
                        >
                          {bookmarkedIds.includes(item.id) ? (
                            <MdOutlineBookmark className='bookmark_icon' />
                          ) : (
                            <MdOutlineBookmarkBorder className='bookmark_icon' />
                          )}
                        </button>
                        <div className='d-flex   flex-column '>
                          <div className='d-flex gap-2'>
                            <span>{item.year}</span>
                            <span>
                              <MdLocalMovies /> {item.type}
                            </span>
                          </div>
                          <h5>{item.title}</h5>
                        </div>
                      </div>
                    </LinkContainer>
                  </Carousel.Item>
                )
              })}
          </Carousel>
        </div>
      </SidebarLayout>
    </>
  )
}

export default Movies
