import React from 'react'
import Header from '../header/Header'

import LeftSidebar from './leftSidebar'
import './sidebarLayout.css'

function SidebarLayout (props) {
  return (
    <>
      <div className=''>
      <Header setEdit={props?.setEdit} />
        <div className='d-flex flex-column '>{props.children}</div>
      </div>
      {/* <div className='content-container'>
      <Header  />
        <Header type='leftsidebar' />
        <div className='d-flex'>
          <LeftSidebar setEdit={props?.setEdit} />
        </div>
        <div className='content d-flex flex-column '>{props.children}</div>
      </div> */}
    </>
  )
}

export default SidebarLayout
