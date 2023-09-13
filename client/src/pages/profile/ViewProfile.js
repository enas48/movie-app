import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import Loading from '../../components/uiElements/preloading'
import AuthContext from '../../helpers/authContext'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'

function ViewProfile (props) {
  const [loading, setLoading] = useState(false)
  const { userId } = useContext(AuthContext)
  const { id } = useParams()
  const [image, setImage] = useState('')

  const [username, setUsername] = useState('')

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${id}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )

      if (result.data.profile) {
        setImage(result.data.profile.image)
        setUsername(result.data.profile.user.username)
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchUserProfile()
    }
  }, [id])

  return (
    <div className='header-bg'>
      {loading && <Loading />}
      <div className=' profile-header container'>
        <div className=' d-flex align-items-center gap-2 profile-info'>
          <div className='profile-container mb-2 mb-sm-3'>
            {/* <div className='overlay'></div> */}
            <div className='profile-image'>
              <img
                src={
                  image === '' ? process.env.PUBLIC_URL + './person.png' : image
                }
                alt=''
              />
            </div>
          </div>
          <p className='mb-3'>{username}</p>
        </div>
        <div className='mb-3 d-flex ms-auto btn-container'>
          {id === userId ? (
            <LinkContainer to={`edit`}>
              <Button className='custom-btn '>Edit</Button>
            </LinkContainer>
          ) : (
            <Button className='custom-btn '>Follow</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewProfile
