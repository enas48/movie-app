import './notification.css'
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../../helpers/authContext'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { BiMessageRoundedError } from 'react-icons/bi'
import Badge from 'react-bootstrap/Badge'
import useSocketIo from '../useSocketIo'
import Notification from './Notification'

function Notifications ({}) {
  const { socket } = useSocketIo()
  const { userId } = useContext(AuthContext)
  const [notification, setNotification] = useState([])
  const [notificationLength, setNotificationsLength] = useState(0)

  const getNotifications = async (userId) => {
    try {
      const response = await axios(
        `${process.env.REACT_APP_APP_URL}/notifications/${userId}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      if (response.data?.notifications) {
        console.log(response.data.notifications)
        setNotification(response.data.notifications)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log(notificationLength)
    if (userId) {
      getNotifications(userId)
    }
    let timer
    socket?.on('connect', () => {
      socket.emit('setUserId', userId)
      // Getting first notifications length
      socket.emit('getNotificationsLength', userId)
      socket?.on('notificationsLength', data => {
        setNotificationsLength(data)
      })
      socket?.on('set-notification', data => {
        console.log(data)
        socket.emit('getNotificationsLength', userId)
        setNotification(notification => [...notification, data])
      })
      timer = setTimeout(() => {
        console.log('d')
        socket.emit('getNotificationsLength', userId)
        getNotifications(userId)
      }, 10000) // run every 10 seconds
      socket?.on('disconnect', () => {})
    })

    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
      socket?.off("notifications");
      // clearTimeout(timer)
    }
  }, [userId, socket,])

  return (
    <Dropdown className='notification'>
      <DropdownButton
        variant='success'
        id='dropdown'
        drop='down-centered'
        title={
          <div className='notification-icon'>
            {' '}
            {notification.length !== 0 && notificationLength !== 0 && (
              <Badge className='rounded-circle'>{notificationLength}</Badge>
            )}
            <IoIosNotificationsOutline className='icon' />
          </div>
        }
      >
        {' '}
        {notification.length !== 0 ? (
          notification
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map(item => {
              return <Notification key={item?._id} notification={item} />
            })
        ) : (
          <Dropdown.Item>
            No Notification <BiMessageRoundedError />
          </Dropdown.Item>
        )}
      </DropdownButton>
      {/* <Dropdown.Toggle
        variant="success"
        id="notification"
        className="notifiction-icon"
      >
        {notificationLength !== 0 && (
          <Badge className="rounded-circle">{notificationLength}</Badge>
        )}
        <IoIosNotificationsOutline className="icon" />
      </Dropdown.Toggle> */}
      {/* <Dropdown.Menu className="p-0">
        {notification.length !== 0 ? (
          notification.map((item) => {
            return <Notification key={item?._id} notification={item} />;
          })
        ) : (
          <span>
            No Notification <BiMessageRoundedError />
          </span>
        )}
      </Dropdown.Menu> */}
    </Dropdown>
  )
}
export default Notifications
