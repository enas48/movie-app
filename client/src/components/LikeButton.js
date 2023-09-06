// LikeButton.js
import React, { useState, useEffect } from 'react'
import { AiFillLike } from 'react-icons/ai'

function LikeButton ({ handleLike, commentId, likes, liked }) {
  return (
    <div className='d-flex align-items-center gap-1'>
      <span>{likes} </span>

      <button
        className={`like-button btn p-0 text-white-50 `}
        onClick={() => {
          handleLike(commentId)
        }}
      >
        <AiFillLike className={` like ${liked ? 'text-secondry' : ''}`} />
      </button>
    </div>
  )
}
export default LikeButton
