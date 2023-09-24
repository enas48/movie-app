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
  const itemPerRow = 5
  const [next, setNext] = useState(itemPerRow)
  const handleMoreItem = e => {
    e.stopPropagation()
    setNext(next + itemPerRow)
  }
  const getNotifications = async userId => {
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
   
        setNotification(response.data.notifications)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (userId) {
      getNotifications(userId)
    }

    socket?.on('connect', () => {
      socket.emit('setUserId', userId)
      socket.emit('getNotificationsLength', userId)

      socket?.on('notificationsLength', data => {
        setNotificationsLength(data)
      })

      socket?.on('set-notification', data => {
        socket.emit('getNotificationsLength', userId)
        if (userId === data.userId) {
          setNotification(notification => [...notification, data])
        }
      })
      socket?.on('delete-notification', data => {
        socket.emit('getNotificationsLength', userId)
        if (userId === data.userId) {
          setNotification(data)
        }
      })
      socket?.on('update-notification', data => {
        socket.emit('getNotificationsLength', userId)
        if (userId === data.userId) {
          setNotification(data)
        }
      })
      socket?.on('disconnect', () => {})
    })

    return () => {
      socket?.off('connect')
      socket?.off('disconnect')
      socket?.off('notifications')
    }
  }, [userId, socket, notificationLength])

  return (
    <Dropdown className='notification'>
      <DropdownButton
        variant='success'
        id='dropdown'
        drop='down-centered'
        title={
          <div className='notification-icon'>
            {notification.length !== 0 && notificationLength !== 0 && (
              <Badge className='rounded-circle'>{notificationLength}</Badge>
            )}
            <IoIosNotificationsOutline className='icon' />
          </div>
        }
      >
        {notification.length !== 0 ? (
          notification
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            ?.slice(0, next)
            ?.map(item => {
              return <Notification key={item?._id} notification={item} />
            })
        ) : (
          <Dropdown.Item>
            No Notification <BiMessageRoundedError />
          </Dropdown.Item>
        )}
        <Dropdown.Item className='p-0'>
          {next < notification?.length && (
            <button
              className='m-auto btn  my-2'
              onClick={e => handleMoreItem(e)}
            >
              Load more
            </button>
          )}
        </Dropdown.Item>
      </DropdownButton>
    </Dropdown>
  )
}
export default Notifications
