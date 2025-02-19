import React, { useState } from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar'


const EmployeeDashboard = () => {
   const [sidebarToggle, setsidebarToggle] = useState(false)
  return (
      <div className='flex h-screen bg-white'>
             <Sidebar 
            sidebarToggle={sidebarToggle}
            setsidebarToggle={setsidebarToggle}/>
         <div className={`flex-1 transition-all duration-300 ${sidebarToggle ? "ml-64" : "ml-0"}`}>
            <Navbar
                 sidebarToggle={sidebarToggle}
                 setsidebarToggle={setsidebarToggle}
            />
              <div className='p-4'>
            <Outlet/>
            </div>
        </div>
        </div>
  )
}

export default EmployeeDashboard