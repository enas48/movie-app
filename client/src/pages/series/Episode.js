import React, { useEffect, useState,useMemo } from 'react'
import { useParams } from 'react-router-dom'



function Episode ({ episode }) {
  const [episodes, setEpisodes] = useState([])
  const imagePerRow = 10
  const [next, setNext] = useState(imagePerRow)
  const [image, setImage] = useState(null)
  const handleMoreImage = () => {
    setNext(next + imagePerRow)
  }
  let tvArr = useMemo(() => [], [])

  const loadEpisode = async episode => {
    for (let data of episode) {
      
      if (data?.still_path && data.still_path !== null) {
        const response = await fetch(
          `https://image.tmdb.org/t/p/original${data.still_path}`
        )
        const image = await response
        if (image?.url) {
            tvArr.push({
            id: data.id,
            overview: data?.overview && data.overview,
            name: data?.name && data.name,
            episode_number:data?.episode_number && data.episode_number,
            image: image.url,
          })
        } else {
          if (data.id) {
            tvArr.push({
              id: data.id,
              overview: data?.overview && data.overview,
              name: data?.name && data.name,
              episode_number:data?.episode_number && data.episode_number,
              image: ''
            })
          }
        }
      } else {
        if (data.id) {
            tvArr.push({
            id: data.id,
            overview: data?.overview && data.overview,
            name: data?.name && data.name,
            episode_number:data?.episode_number && data.episode_number,
            image: ''
          })
        }
      }
  
    }
    setEpisodes(tvArr);
  }
  useEffect(() => {
    loadEpisode(episode)
    console.log(episodes)
  }, [])

  return (
    <>
      <div className='details-related-content'>
        {episodes.length !== 0 && (
          <>
            <h2>Episodes</h2>
            <div className='row m-0 gap-4 d-flex justify-content-center '>
              {episodes?.slice(0, next)?.map(item => {
                return (
                  <div
                    key={item.id}
                    className='d-flex flex-column episode-container card card-container'
                  >
                    <div className='img-container'>
                      {item.image !== '' && <img src={item.image} alt={item.name} />}
                      {item.image === '' && (
                        <img
                          src={process.env.PUBLIC_URL + '../../noimage.png'}
                          alt=''
                        />
                      )}
                    </div>
                    <div className='card-body'>
                      <span className='text-secondry'> {item.name}</span>
                      <br />
                      <span>Eposide {item.episode_number}</span>
                      {/* <span> {item.overview} </span> */}
                    </div>
                  </div>
                )
              })}
            </div>
            {next < episodes?.length && (
              <button
                className='m-auto btn custom-btn mt-4'
                onClick={handleMoreImage}
              >
                Load more
              </button>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Episode
