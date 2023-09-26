import React, { useState, useEffect } from 'react'
import './searchlist.css'
import Loading from '../../components/uiElements/preloading'
import Paginations from '../../components/Pagination '
import { LinkContainer } from 'react-router-bootstrap'
import { MdPerson } from 'react-icons/md'
import { PiTelevisionBold } from 'react-icons/pi'
import { BiCameraMovie } from 'react-icons/bi'
import { useParams, useOutletContext } from 'react-router-dom'
import * as MovieApi from '../../api/MovieApi'

function ListItem () {
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [results, setResults] = useState(0)
  const [images, setImages] = useState([])
  const [badWords, setBackwords] = useState([])
  const { type, query } = useParams()

  let [handleChange, currentPage] = useOutletContext()
  const preloadImages = async data => {
    let imageArr = []
    for (let item of data) {
      if (item?.poster_path && item?.poster_path !== null) {
        const response = await fetch(
          `https://image.tmdb.org/t/p/w780/${item.poster_path}`
        )
        const image = await response
        if (image?.url) {
          imageArr.push({
            id: item.id,
            image: image.url
          })
        } else {
          if (item?.id) {
            imageArr.push({
              id: item.id,
              image: ''
            })
          }
        }
      } else if (
        item?.media_type === 'person' &&
        item?.profile_path &&
        item?.profile_path !== null
      ) {
        const response = await fetch(
          `https://image.tmdb.org/t/p/w780/${item.profile_path}`
        )
        const image = await response
        if (image?.url) {
          imageArr.push({
            id: item.id,
            image: image.url
          })
        } else {
          if (item?.id) {
            imageArr.push({
              id: item.id,
              image: ''
            })
          }
        }
      } else {
        if (item?.id) {
          imageArr.push({
            id: item.id,
            image: ''
          })
        }
      }
    }
    return imageArr
  }

  const preloadPersonImages = async data => {
    let imageArr = []
    for (let item of data) {
      if (item?.profile_path && item?.profile_path !== null) {
        const response = await fetch(
          `https://image.tmdb.org/t/p/w780/${item.profile_path}`
        )
        const image = await response
        if (image?.url) {
          imageArr.push({
            id: item.id,
            image: image.url
          })
        } else {
          if (item?.id) {
            imageArr.push({
              id: item.id,
              image: ''
            })
          }
        }
      } else {
        if (item?.id) {
          imageArr.push({
            id: item.id,
            image: ''
          })
        }
      }
    }
    return imageArr
  }

  const loadData = async (currentPage, type) => {
    window.scrollTo(0, 0)
    setIsLoading(true)
    if (type === 'all') {
      MovieApi.Search(query, currentPage).then(data => {
        setResults(data.total_results)
        if (data.total_pages >= 500) {
          setTotalPages(500)
        } else {
          setTotalPages(data.total_pages)
        }
        let filtered = data.results.filter(i => {
          const helloExist = badWords.some(item =>
            (i?.name || i?.title).toLowerCase().includes(item)
          )

          if (!helloExist) {
            return i
          }
        })
        setList(filtered)
        if (data.media_type === 'person') {
          preloadPersonImages(data.results).then(data => {
            setImages(data)
          })
        } else {
          preloadImages(data.results).then(data => {
            setImages(data)
          })
        }
      })
    } else {
      MovieApi.Search(query, currentPage, type).then(data => {
        setResults(data.total_results)
        if (data.total_pages >= 500) {
          setTotalPages(500)
        } else {
          setTotalPages(data.total_pages)
        }
        let filtered = data.results.filter(i => {
          const helloExist = badWords.some(item =>
            (i?.name || i?.title).toLowerCase().includes(item)
          )

          if (!helloExist) {
            return i
          }
        })

        setList(filtered)
        if (type === 'person') {
          preloadPersonImages(data.results).then(data => {
            setImages(data)
          })
        } else {
          preloadImages(data.results).then(data => {
            setImages(data)
          })
        }
      })
    }
    setIsLoading(false)
  }

  const handlePageChange = page => {
    handleChange(page)
    loadData(page, type)
  }

  useEffect(() => {
    MovieApi.badWords().then(data => setBackwords(data))
    if (type === 'all') {
      loadData(currentPage)
    } else {
      loadData(currentPage, type)
    }
  }, [query, currentPage, type])

  return (
    <div className='d-flex flex-column justify-content-between'>
      {isLoading ? (
        <Loading content={true} />
      ) : list.length !== 0 ? (
        <div className=''>
          <p> {results} results</p>

          {list.map((item, i) => {
            return (
              <div key={i} className='item'>
                <LinkContainer
                  key={i}
                  to={`/search/${item?.media_type}/${item.id}`}
                  state={{ data: item }}
                >
                  <div className='cursor-pointer d-flex align-items-start gap-2 search-item'>
                    <div className='img-container'>
                      {images.map(
                        img =>
                          img.id === item.id && (
                            <div key={img.id} className='img-container'>
                              {img.image === '' ? (
                                <img
                                  src={
                                    process.env.PUBLIC_URL + '../../noimage.png'
                                  }
                                  alt=''
                                />
                              ) : (
                                <img src={img.image} alt='' />
                              )}
                            </div>
                          )
                      )}
                    </div>
                    <div>
                      <span>{item?.title}</span>
                      <span>{item?.name}</span>
                      <p className='text-white-50'>
                        <span>type:&nbsp;</span>
                        {(item?.media_type === 'movie' || type === 'movie') && (
                          <>
                            <BiCameraMovie className='search-icon flex-shrink-0' />
                            <span>&nbsp;movie</span>
                          </>
                        )}
                        {(item?.media_type === 'tv' || type === 'tv') && (
                          <>
                            <PiTelevisionBold className='search-icon flex-shrink-0' />
                            <span>&nbsp;tv series</span>
                          </>
                        )}
                        {(item?.media_type === 'person' ||
                          type === 'person') && (
                          <>
                            <MdPerson className='search-icon flex-shrink-0' />
                            <span>&nbsp;person</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </LinkContainer>
              </div>
            )
          })}
        </div>
      ) : (
        <div className=''>
          <span className='p-3'>No Results found</span>
        </div>
      )}
      {list.length !== 0 && totalPages > 1 && (
        <Paginations
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default ListItem
