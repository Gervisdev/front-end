import React, { useState } from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar'


const EmployeeDashboard = () => {
   const [sidebarToggle, setsidebarToggle] = useState(false)
  return (
      <div className='flex h-screen'>
         <div className={`flex-1 transition-all duration-300 ${sidebarToggle ? "" : ""} w-full`}>
            <Sidebar 
            sidebarToggle={sidebarToggle}
            setsidebarToggle={setsidebarToggle}/>
            <div className='flex-1 w-full bg-gray-100'>
            <Navbar
                 sidebarToggle={sidebarToggle}
                 setsidebarToggle={setsidebarToggle}
            />
            <Outlet/>
            </div>
        </div>
        </div>
  )
}

export default EmployeeDashboard