import React, { useEffect, useState, useContext } from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import axios from 'axios'
import AuthContext from '../helpers/authContext'
import { PiAlignRight } from 'react-icons/pi'
function Comment ({ type, id }) {
  const { userId } = useContext(AuthContext)
//   const [image, setImage] = useState(process.env.PUBLIC_URL + '/person.png')
//   const [username, setUsername] = useState('')
  const [data, setData] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
   console.log(id)
//   console.log(userId)
//   console.log(type)
  //   const data = [
  //     {
  //       userId: '02b',
  //       comId: '017',
  //       fullName: 'Lily',
  //       userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
  //       text: 'I think you have a point🤔',
  //       avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
  //       replies: []
  //     }
  //   ]
const onSubmit=(data)=>{
    let comment={
        userId: data.userId,
        fullName: data.fullName,
        avatarUrl: data.avatarUrl,
        text:data.text,
        post_id:id,
        type:"movie"
    }
    console.log(comment)
    axios
    .post(`${process.env.REACT_APP_APP_URL}/comments`, comment)
    .then(response => {
      if (response.data.status === 200) {
        console.log(response.data)
        // setMessage({ text: response.data.message, state: 'success' })
        // return navigate('/login', { replace: true })
      }
    })
    .catch(err => {
      console.log(err)
    //   if (err.response.data?.message) {
    //     setMessage({
    //       text: err.response.data.message || 'something want wrong',
    //       state: 'error'
    //     })
    //   } else {
    //     setMessage({
    //       text: err.message || 'something want wrong',
    //       state: 'error'
    //     })
    //   }
    })
}
const onDelete=(data)=>{
    console.log(data)
}
const onReplay=(data)=>{
    console.log(data)
}
const onEdit=(data)=>{
    console.log(data)
}

useEffect(() => {

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
          console.log(result.data.profile)
        //   if (result.data.profile.image !== '') {
        //     setImage(result.data.profile.image)
        //   }
        //   setUsername(result.data.profile.user.username)
        return result.data.profile;
        //   setCurrentUser({
        //     ...currentUser,
        //     currentUserId: userId,
        //     currentUserImg: result.data.profile.image,
        //     currentUserProfile: '/profile',
        //     currentUserFullName: result.data.profile.user.username
        //   })
        } catch (err) {
          console.log(err)
        }
      }

      fetchUser().then(data=>   setCurrentUser({
        ...currentUser,
        currentUserId: userId,
        currentUserImg: data.image,
        currentUserProfile: '/profile',
        currentUserFullName: data.user.username
      }))
  }, [])

  return (
    <div className='details-related-content container'>
      <CommentSection
        removeEmoji={true}
        currentUser={currentUser}
        logIn={{
          loginLink: '/login',
          signupLink: '/register'
        }}
        commentData={data}
        onSubmitAction={data => onSubmit(data)}
        onDeleteAction={data => onDelete(data)}
        onReplyAction={(data) => onReplay(data)}
        onEditAction={(data) => onEdit(data)}
        currentData={data => {console.log(data)}}
      />
    </div>
  )
}
export default Comment
