import React from 'react'

import LeftSidebar from '../components/leftSidebar'
import './sidebarLayout.css'

function SidebarLayout (props) {
  return (
    <>
      <div className='content-container'>
        <div className='d-flex'>
          <LeftSidebar />
        </div>
        <div className='content d-flex flex-column gap-2'>
          
          {props.children}</div>
      </div>
    </>
  )
}

export default SidebarLayout
