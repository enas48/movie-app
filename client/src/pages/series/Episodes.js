import React, { useEffect, useState } from 'react'
import './episodes.css';
import Episode from './Episode'
function Episodes ({ episodes }) {
  const [allEpisodes, setEpisodes] = useState([])
  const imagePerRow = 20
  const [next, setNext] = useState(imagePerRow)

  const handleMoreImage = () => {
    setNext(next + imagePerRow)
  }

  const loadEpisode = async episodes => {
    let tvArr=[];
    if (episodes.length !== 0) {
      for (let data of episodes) {
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
              runtime: data?.runtime && data.runtime,
              episode_number: data?.episode_number && data.episode_number,
              image: image.url
            })
          } else {
            if (data.id) {
              tvArr.push({
                id: data.id,
                overview: data?.overview && data.overview,
                name: data?.name && data.name,
                runtime: data?.runtime && data.runtime,
                episode_number: data?.episode_number && data.episode_number,
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
              runtime: data?.runtime && data.runtime,
              episode_number: data?.episode_number && data.episode_number,
              image: ''
            })
          }
        }
      }
      setEpisodes(tvArr)
    }
  }
  useEffect(() => {
    setEpisodes(episodes)
    loadEpisode(episodes)
  }, [episodes])

  return (
    <>
      <div className='details-related-content eposides'>
        {allEpisodes.length !== 0 && (
          <>
            <h3 className='mb-4 px-md-2'>Episodes</h3>
            <div className='row m-0 gap-4 d-flex justify-content-center '>
              {allEpisodes?.slice(0, next)?.map((item,i) => {
                return <Episode key={i} episode={item} />
              })}
            </div>
            {next < allEpisodes?.length && (
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

export default Episodes
