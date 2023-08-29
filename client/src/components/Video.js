import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { FaPlay } from 'react-icons/fa'

function Video ({ video, keyVideo, playVideo }) {
  return (
    <>
      {video.length !== 0 && (
        <div className='details-related-content'>
          <h3 className='mb-4'>Trailer</h3>
          <div className='row'>
            <div className='col-xl-8 text-center my-2 p-0'>
              <div className='w-100'>
                {video.map(
                  item =>
                    item.key === keyVideo && (
                      <ReactPlayer
                        key={item.id}
                        className={
                          item.key === keyVideo
                            ? 'm-auto m-xl-0 ms-xl-auto d-block'
                            : 'm-auto  m-xl-0 ms-xl-auto d-none'
                        }
                        url={`https://www.youtube-nocookie.com/embed/${item.key}?showinfo=0&enablejsapi=1&origin=http://localhost:3000'`}
                      />
                    )
                )}
              </div>
            </div>
            {video.length !== 0 && (
              <div className='col-xl-4 my-2 p-0'>
                <div className='video-container d-flex flex-column gap-3'>
                  {video.map(item => (
                    <div
                      className='card card-container'
                      key={item.id}
                      onClick={() => playVideo(item.key)}
                    >
                      <div className='card-body row'>
                        <div className='col-4 '>
                        {item.key === keyVideo && (<FaPlay className='icon'/>)}
                          <img
                            src={`https://i.ytimg.com/vi/${item.key}/maxresdefault.jpg`}
                            className='img-fluid rounded'
                            alt=''
                          />
                        </div>
                        <div className='col-8'>
                        {item?.name && item.name.length > 30
                    ? item.name.slice(0, 30 - 1) + '…'
                    : item.name}
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
export default Video
