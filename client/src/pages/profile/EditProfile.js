import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Button, Nav, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import MessageModal from '../../components/uiElements/messageModel'
import Loading from '../../components/uiElements/preloading'
import SidebarLayout from '../../components/sidebar/sidebarLayout'
import AuthContext from '../../helpers/authContext'
import Search from '../../components/search/search'
import { AiFillCamera } from 'react-icons/ai'
import { BiSolidEditAlt } from 'react-icons/bi'
import './profile.css'

const imageMimeType = /image\/(png|jpg|jpeg)/i

function EditProfile ({ handleUpdate,setEdit }) {
  const [loading, setLoading] = useState(false)
  const { userId, userProfile } = useContext(AuthContext)
  const { id } = useParams()
  const [image, setImage] = useState('')
  const [bgImage, setbgImage] = useState('')
  const [data, setFormData] = useState({ username: '', user: userId })
  const { username } = data
  const [file, setFile] = useState(null)
  const [bgfile, setbgFile] = useState(null)
  const [bgfileDataURL, setbgFileDataURL] = useState(null)
  const [fileDataURL, setFileDataURL] = useState(null)
  const [message, setMessage] = useState({ text: null, state: 'error' })
  const [profileId, setProfileId] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const onImageChange = e => {
    const file = e.target.files[0]
    if (!file.type.match(imageMimeType)) {
      setMessage({ text: 'Image is not valid', state: 'error' })
      return
    }
    console.log(file)
    setFile(file)
    setImage(file)
  }

  const onBgChange = e => {
    const file = e.target.files[0]
    if (!file.type.match(imageMimeType)) {
      setMessage({ text: 'Image is not valid', state: 'error' })
      return
    }
    console.log(file)
    setbgFile(file)
    setbgImage(file)
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
    if (bgfile) {
      formData.append('bgImage', bgfile)
    } else {
      formData.append('bgImage', bgImage)
    }
    setDisabled(true)

    axios
      .put(process.env.REACT_APP_APP_URL + '/profile/' + profileId, formData)
      .then(response => {
        if (response?.data.status === 200) {
          setMessage({ text: response.data.message, state: 'success' })
          setDisabled(false)
          handleUpdate()
          setTimeout(() => {
            setEdit(false);
          }, 5000);
        }
      })
      .catch(err => {
        setDisabled(false)
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
    if (id !== userId) {
      navigate(`/profile/${id}`)
    }
    if (id && userProfile) {
      setLoading(true)
      setFormData({
        ...data,
        username: userProfile?.user.username
      })
      setImage(userProfile?.image)
      setbgImage(userProfile?.bgImage)
      setProfileId(userProfile?._id)
      setLoading(false)
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
    if (bgfile) {
      fileReader = new FileReader()
      fileReader.onload = e => {
        const { result } = e.target
        if (result && !isCancel) {
          setbgFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(bgfile)
    }
    return () => {
      isCancel = true
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort()
      }
    }
  }, [file, bgfile, id, userProfile])

  return (
    <>
      {loading && <Loading />}
      {message.text && <MessageModal message={message} onClear={handleClear} />}
      {/* <SidebarLayout>
        <Search /> */}
      <div className='header-bg'>
        <Form
          onSubmit={handleSubmit}
          multi
          className=' '
        >
          <Form.Group className='edit-cover'>
            <div className='profile-container '>
              <div className='icon-container'>
                <AiFillCamera className='icon' />
              </div>
              {/* <div className="overlay"></div> */}
              <input
                type='file'
                name='bgImage'
                accept='image/*'
                onChange={onBgChange}
              />

              <div className='profile-image'>
                <div className='overlay'></div>
                {!bgfileDataURL && (
                  <img
                    src={
                      bgImage === ''
                        ? process.env.PUBLIC_URL + './person.png'
                        : bgImage
                    }
                    alt=''
                  />
                )}
                {bgfileDataURL && <img src={bgfileDataURL} alt='' />}
              </div>
            </div>
          </Form.Group>
          <div className=' profile-header container'>

          <Form.Group className='mb-3 ' controlId='formimage'>
            <div className='profile-container'>
              <div className='icon-container'>
                <AiFillCamera className='icon' />
              </div>
              {/* <div className="overlay"></div> */}
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
          <Form.Group
            className='mb-3 position-relative'
            controlId='formBasicusername'
          >
            <Form.Control
              value={username}
              name='username'
              type='text'
              autoComplete='username'
              placeholder='username'
              onChange={onChange}
            />
            <Button
              type='submit'
              className='edit-icon btn-outline'
              disabled={disabled}
            >
              <BiSolidEditAlt />
            </Button>
          </Form.Group>
          <Button
            variant='primary'
            className='mb-3 custom-btn d-flex align-items-center gap-2 ms-auto'
            type='submit'
            disabled={disabled}
          >
            Edit Profile
          </Button>
          </div>
        </Form>
      </div>

      {/* </SidebarLayout> */}
    </>
  )
}

export default EditProfile
