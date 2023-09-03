import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import SidebarLayout from '../components/sidebarLayout'
import MessageModal from '../uiElements/messageModel'
import Loading from '../uiElements/preloading'
import AuthContext from '../helpers/authContext'

import { AiFillCamera } from 'react-icons/ai'

const imageMimeType = /image\/(png|jpg|jpeg)/i

function Profile (props) {
  const [loading, setLoading] = useState(false)
  const { userId } = useContext(AuthContext)
  const [image, setImage] = useState('')
  const [data, setFormData] = useState({ username: '', user: userId })
  const { username } = data
  const [file, setFile] = useState(null)
  const [fileDataURL, setFileDataURL] = useState(null)
  const [message, setMessage] = useState({ text: null, state: 'error' })
  const [profileId, setProfileId] = useState(null)
  const navigate = useNavigate()

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${userId}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )

      if (result.data.profile) {
        setFormData({
          ...data,
          username: result.data.profile.user.username
        })
        setImage(result.data.profile.image)
        setProfileId(result.data.profile._id)
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const onImageChange = e => {
    const file = e.target.files[0]
    if (!file.type.match(imageMimeType)) {
      setMessage({ text: 'Image is not valid', state: 'error' })
      return
    }
    setFile(file)
    setImage(file)
  }

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    for (var key in data) {
      formData.append(key, data[key])
    }
    if (file) {
      formData.append('image', file)
    } else {
      formData.append('image', image)
    }
    axios
      .put(process.env.REACT_APP_APP_URL + '/profile/' + profileId, formData)
      .then(response => {
        if (response?.data.status === 200) {
          setMessage({ text: response.data.message, state: 'success' })
          setTimeout(() => {
            navigate(0)
          }, 1000)
        }
      })
      .catch(err => {
        if (err.response?.data.message) {
          setMessage({
            text: err.response.data.message || 'something want wrong',
            state: 'error'
          })
        } else {
          setMessage({
            text: err.message || 'something want wrong',
            state: 'error'
          })
        }
      })
  }

  const handleClear = () => {
    setMessage({ text: null, state: 'error' })
  }

  useEffect(() => {
    if (userId) {
      fetchUserProfile()
    }
    let fileReader,
      isCancel = false
    if (file) {
      fileReader = new FileReader()
      fileReader.onload = e => {
        const { result } = e.target
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file)
    }
    return () => {
      isCancel = true
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort()
      }
    }
  }, [file])

  return (
    <>
      {loading && <Loading />}
      {message.text && <MessageModal message={message} onClear={handleClear} />}
      <SidebarLayout>
        <div className='p-3'>
          <h3 className='px-4'>Profile</h3>
          <div className='form-container'>
            <div className=' form'>
              <h2 className='mb-4 text-center'>Edit Profile</h2>
              <div className='circle1'></div>
              <div className='circle2'></div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-4' controlId='formimage'>
                  <div className='profile-container'>
                    <AiFillCamera className='icon' />
                    <div className='overlay'></div>
                    <input
                      type='file'
                      name='image'
                      accept='image/*'
                      onChange={onImageChange}
                    />
                    <div className='profile-image'>
                      {!fileDataURL && (
                        <img
                      
                          src={
                            image === ''
                              ? process.env.PUBLIC_URL + './person.png'
                              : image
                          }
                          alt=''
                        />
                      )}
                      {fileDataURL && <img src={fileDataURL} alt='' />}
                    </div>
                  </div>
                </Form.Group>
                <Form.Group className='mb-4' controlId='formBasicusername'>
                  <Form.Control
                    value={username}
                    name='username'
                    type='text'
                    autoComplete='username'
                    placeholder='username'
                    onChange={onChange}
                  />
                </Form.Group>
                <Button
                  variant='primary'
                  className='mb-4 custom-btn d-flex align-items-center gap-2'
                  type='submit'
                >
                  Edit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  )
}

export default Profile
