import React from 'react'
import {useAuth} from '../../context/AuthContext'
import { FaBars, FaBell, FaSearch, FaUser, FaUserCircle } from 'react-icons/fa'

const Navbar = ({sidebarToggle, setsidebarToggle}) => {
    const {user, logout} = useAuth()
  return ( 
    <nav className='flex justify-between px-4 py-3 bg-gray-800 '>
      <div className='flex items-center text-xl'>
        <FaBars className='text-white cursor-pointer me-4'
         onClick={()=>setsidebarToggle(!sidebarToggle)}/>
        <span className='font-bold text-white'>Société Patrimoine</span>
      </div>
      <div className='flex items-center gap-x-5'>
        <div className='relative'>
          <button className='text-white group' onClick={logout}>
            <FaUserCircle className="w-6 h-6 mt-1"/>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar