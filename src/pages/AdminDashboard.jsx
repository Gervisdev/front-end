import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import AdminSummary from '../components/dashboard/AdminSummary'
import { Outlet } from 'react-router-dom'


const AdminDashboard = () => {
    const {user} = useAuth()
    const [sidebarToggle, setsidebarToggle] = useState(false)
    return (
        <div className='flex h-screen'>
        <div className={`flex-1 transition-all duration-300 ${sidebarToggle ? "w-64" : ""} w-full`}>
            
            <div className='flex-1 w-full bg-gray-100'>
           
            <Navbar 
            sidebarToggle={sidebarToggle}
            setsidebarToggle={setsidebarToggle}
            />
             <AdminSidebar sidebarToggle={sidebarToggle} setsidebarToggle={setsidebarToggle}/>  
            <Outlet/>
            </div>
        </div>
        </div>
    )
}

export default AdminDashboard