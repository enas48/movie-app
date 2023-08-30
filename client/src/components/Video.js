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
            <div className=' my-2 w-100 w-md-60 rounded overflow-hidden'>
              {video.map(
                (item,i) =>
                  item.key === keyVideo && (
                    <>
                      <ReactPlayer
                        key={i}
                        className={
                          item.key === keyVideo
                            ? 'm-auto d-block w-auto video-player'
                            : 'm-auto   d-none '
                        }
                        url={`https://www.youtube-nocookie.com/embed/${item.key}?showinfo=0&enablejsapi=1&origin=http://localhost:3000'`}
                        controls={true}
                      />
                      <h3 className='py-3'>{item?.name}</h3>
                    </>
                  )
              )}
            </div>
            {video.length !== 0 && (
              <div className=' my-2  w-md-40'>
                <div className='video-container d-flex flex-column'>
                  {video.map((item, i) => (
                    <div
                      className={
                        item.key === keyVideo
                          ? 'card card-container active'
                          : 'card card-container'
                      }
                      key={i}
                      onClick={() => playVideo(item.key)}
                    >
                      <div className='card-body row'>
                        <div className='col-4 d-flex align-items-center gap-2'>
                          <div style={{ minWidth: '16px' }}>
                            {item.key === keyVideo ? (
                              <FaPlay />
                            ) : (
                              <span>{i + 1}</span>
                            )}
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
