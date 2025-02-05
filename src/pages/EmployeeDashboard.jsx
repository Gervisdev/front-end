import React, { useState } from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar'


const EmployeeDashboard = () => {
   const [sidebarToggle, setsidebarToggle] = useState(false)
  return (
      <div className='flex h-screen'>
         <div className={`flex-1 transition-all duration-300 ${sidebarToggle ? "" : ""} w-full`}>
            <Sidebar sidebarToggle={sidebarToggle}/>
            <div className='flex-1 h-screen ml-64 bg-gray-100'>
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