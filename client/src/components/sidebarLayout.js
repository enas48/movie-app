import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import { RiMovie2Fill } from 'react-icons/ri'
import LeftSidebar from '../components/leftSidebar'
import './sidebarLayout.css'
import { AiOutlineMenu } from 'react-icons/ai'
import { Button } from 'react-bootstrap'

function SidebarLayout (props) {
  const [active, setActive] = useState(false)
  const toggle = () => {
    setActive(!active)
  }
  return (
    <>
      <div className='content-container'>
        <div className='d-flex'>

 
        <LeftSidebar/>
        </div>
        <div className='content d-flex flex-column gap-2'>{props.children}</div>
      </div>
    </>
  )
}

export default SidebarLayout
