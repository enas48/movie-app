import React from 'react'
import Header from '../header/Header'

import LeftSidebar from './leftSidebar'
import './sidebarLayout.css'

function SidebarLayout (props) {
  return (
    <>
      <div className='content-container'>
        <Header type='leftsidebar' />
        <div className='d-flex'>
          <LeftSidebar />
        </div>
        <div className='content d-flex flex-column '>{props.children}</div>
      </div>
    </>
  )
}

export default SidebarLayout
