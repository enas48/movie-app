import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { FaPlay } from 'react-icons/fa'

function Video ({ video, keyVideo, playVideo }) {
  return (
    <>
      {video.length !== 0 && (
        <div className='details-related-content'>
          <h3 className='mb-4'>Videos</h3>
          <div className='gap-4 d-flex justify-content-center flex-wrap'>
            <div className='text-center my-2 w-100 w-md-60 rounded overflow-hidden'>
            
                {video.map(
                  item =>
                    item.key === keyVideo && (
                      <ReactPlayer
                        key={item.id}
                        className={
                          item.key === keyVideo
                            ? 'm-auto d-block w-auto '
                            : 'm-auto   d-none'
                        }
                        url={`https://www.youtube-nocookie.com/embed/${item.key}?showinfo=0&enablejsapi=1&origin=http://localhost:3000'`}
                        controls={true}
                        />
                    )
                )}
            
            </div>
            {video.length !== 0 && (
              <div className=' my-2  w-md-40'>
                <div className='video-container d-flex flex-column'>
                  {video.map(item => (
                    <div
                      className={ item.key === keyVideo ?'card card-container active':'card card-container'}
                      key={item.id}
                      onClick={() => playVideo(item.key)}
                    >
                      <div className='card-body row'>
                        <div className='col-4 d-flex align-items-center gap-2'>
                          <div className={item.key === keyVideo ?'opacity-100':'opacity-0'}>

                         <FaPlay />
                          </div>
                          <div className='img-container'>
                          <img
                            src={`https://i.ytimg.com/vi/${item.key}/maxresdefault.jpg`}
                            className='img-fluid rounded'
                            alt=''
                          />
                          </div>
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
