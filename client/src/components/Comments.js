import React, { useEffect, useState, useContext } from 'react'

import axios from 'axios'
import AuthContext from '../helpers/authContext'
import Comment from './Comment'
import { LinkContainer } from 'react-router-bootstrap'
import CommentForm from './CommentForm'
import { BsSendFill } from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'

function Comments ({ type, id }) {
  const { userId } = useContext(AuthContext)
  const [userImage, setImage] = useState(process.env.PUBLIC_URL + '/person.png')
  const [activeComments, setActiveComments] = useState({
    id: null,
    type: 'add'
  })
  const [backendComments, setBackendComments] = useState([])
  const [authorized, setAuthorized] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showEmojis, setShowEmojis] = useState(false)

 
  const rootComments = backendComments
    .filter(c => c.parentCommentId === null)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  const getReplies = commentId => {
    return backendComments
      .filter(item => item.parentCommentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
  }


  const addComment = (text, parentId= null) => {
 
    let comment = {
      userId: userId,
      text: text,
      post_id: id,
      type: type,
      parentCommentId: parentId
    }
    setLoading(true)
    axios
      .post(`${process.env.REACT_APP_APP_URL}/comments`, comment)
      .then(response => {
        if (response?.status === 200) {
          setBackendComments([response.data.comment, ...backendComments])
          setActiveComments({
            id: null,
            type: 'add'
          })
          setShowEmojis(false)
          setLoading(false)
        }
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }
  const updateComment = (text, commentId) => {
    let comment = {
      userId: userId,
      text: text
    }
    setLoading(true)
    axios
      .put(`${process.env.REACT_APP_APP_URL}/comments/${commentId}`, comment)
      .then(response => {
        if (response?.status === 200) {
          const updatedComments = backendComments.map(item => {
            if (item._id === commentId) {
              return { ...item, text: text }
            }
            return item
          })

          setBackendComments(updatedComments)
          setActiveComments({
            id: null,
            type: 'add'
          })
          setShowEmojis(false)
          setLoading(false)
        }
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  const deleteComment = commentId => {
    axios
      .delete(`${process.env.REACT_APP_APP_URL}/comments/${commentId}`)
      .then(response => {
        if (response.status === 200) {
          const updatedComments = backendComments.filter(
            item => item._id !== commentId
          )
          setBackendComments(updatedComments)
          setActiveComments({
            id: null,
            type: 'add'
          })
          setShowEmojis(false)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const fetchComents = async () => {
    axios
      .get(`${process.env.REACT_APP_APP_URL}/comments/${type}/${id}`)
      .then(response => {
        if (response?.status === 200) {
          setBackendComments(response.data.comments)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const fetchUser = async () => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${userId}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      if (result.data.profile.image !== '') {
        setImage(result.data.profile.image)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!userId) {
      setAuthorized(false)
    }
    if (userId) {
      fetchUser()
    }
    fetchComents()
  }, [type, id, userId])

  return (
    <div className='details-related-content ' style={{ zIndex: '13' }}>
      <h3 className='mb-4'> {rootComments.length}&nbsp;Comments &nbsp;<FaRegComment/></h3>
      <div className='container'>
        <div className='comments-container '>
          {!authorized && (
            <div className='login-comments d-flex align-items-center gap-2 justify-content-between flex-wrap '>
              <p className='mb-0'>Login or signup to leave a comment</p>
              <div className='d-flex gap-2'>
                <LinkContainer to='/login'>
                  <button className='btn  btn-outline rounded'>Login</button>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <button className='btn custom-btn rounded'>Signup</button>
                </LinkContainer>
              </div>
            </div>
          )}
        </div>
        <div className='comments-container '>
          {authorized && (
            <CommentForm
              type={type}
              id={id}
              submitLabel={<BsSendFill />}
              handleSubmit={addComment}
              avaterUrl={userImage}
              setActiveComments={setActiveComments}
              kind='add'
              activeComments={activeComments}
              loading={loading}
              showEmojis={showEmojis}
              setShowEmojis={setShowEmojis}
            />
          )}
        </div>
        <div className='comments-container'>
          {rootComments.length === 0 && <div>No Comment yet</div>}
          {rootComments.map(item => (
            <Comment
              type={type}
              id={id}
              commentuserId={item.userId}
              key={item._id}
              comment={item}
              replies={getReplies(item._id)}
              deleteComment={deleteComment}
              activeComments={activeComments}
              setActiveComments={setActiveComments}
              addComment={addComment}
              updateComment={updateComment}
              userImage={userImage}
              loading={loading}
              showEmojis={showEmojis}
              setShowEmojis={setShowEmojis}
            
             
          
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Comments
