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
      
        <div className='text-white'>
          <FaBell className="w-6 h-6"/>
        </div>
        <div className='relative'>
          <button className='text-white group'>
            <FaUserCircle className="w-6 h-6 mt-1"/>
            <div className='absolute right-0 z-10 hidden w-32 bg-white rounded-lg shadow group-focus:block top-full'>
              <ul className='py-2 text-sm text-gray-950 '>
                <li><a href="">Profil</a></li>
                <li><a href="" onClick={logout}>Déconnexion</a></li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar