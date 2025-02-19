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
        <div className='flex-1 h-screen bg-white'>
             <AdminSidebar sidebarToggle={sidebarToggle} setsidebarToggle={setsidebarToggle}/>  
        <div className={`flex-1 transition-all duration-300 ${sidebarToggle ? "ml-64" : "ml-0"} `}>
 
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

export default AdminDashboard