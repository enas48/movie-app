import './notification.css'
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../../helpers/authContext'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { IoIosNotificationsOutline } from 'react-icons/io'
import {BiMessageRoundedError} from 'react-icons/bi'
import Badge from 'react-bootstrap/Badge';


function Notification ({}) {
  const { userId } = useContext(AuthContext)
  const [notification, setNotification] = useState([])

  //   const getLikesDetails = async commentLikes => {
  //     try {
  //       let arr = []
  //       for (let data of commentLikes) {
  //         const response = await axios(
  //           `${process.env.REACT_APP_APP_URL}/profile/users/${data}`,
  //           {
  //             headers: {
  //               Accept: 'application/json'
  //             }
  //           }
  //         ).then(details => {
  //           return details.data.profile
  //         })
  //         const details = await response
  //         arr.push(details)
  //       }

  //       setLikesList(arr)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }

  useEffect(() => {}, [])

  return (
    <Dropdown className='notification'>
      <Dropdown.Toggle variant='success' id='notification' className='notifiction-icon'>
      {notification.length !==0 && <Badge  className='rounded-circle'>9</Badge>}
   <IoIosNotificationsOutline className='icon'/>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {notification.length !== 0?
          notification.map(item => {
            console.log(item)
            return (
              <Dropdown.Item
                key={item._id}
                className='d-flex gap-2 align-items-center'
              >
                <Link to={`/profile/${item.user._id}`} className='w-100'>
                  <div className='d-flex gap-2 align-items-center w-100'>
                    <div className='img-container'>
                      {item.profileImage !== '' && (
                        <LazyLoadImage
                          src={item.profileImage}
                          alt={item.user?.username}
                          className='img-fluid'
                        />
                      )}
                      {item.profileImage === '' && (
                        <LazyLoadImage
                          className='no-img img-fluid'
                          src={process.env.PUBLIC_URL + '../../person.png'}
                          alt=''
                        />
                      )}
                    </div>
                    <span>
                      {item.user?.username}
                    </span>
                  </div>
                </Link>
              </Dropdown.Item>
            )
          }) :<span>No Notification <BiMessageRoundedError/></span>}
      </Dropdown.Menu>
    </Dropdown>
  )
}
export default Notification
