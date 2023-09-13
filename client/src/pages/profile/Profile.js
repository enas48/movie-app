import React, { useState } from 'react'
import { useParams, Outlet } from 'react-router-dom'

import SidebarLayout from '../../components/sidebar/sidebarLayout'
import './profile.css'
function Profile () {
  const { id } = useParams()

  return (
    <>
      <SidebarLayout>
        <div className=''>
          <Outlet />
        </div>
      </SidebarLayout>
    </>
  )
}

export default Profile
