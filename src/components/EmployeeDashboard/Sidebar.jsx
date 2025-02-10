import React from 'react'
import { FaBuilding, FaCogs, FaTachometerAlt, FaUsers } from 'react-icons/fa'
import {NavLink} from 'react-router-dom'

const Sidebar = ({sidebarToggle, setsidebarToggle}) => {

    const sidebarRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setsidebarToggle(false);
        }
      };
  
      // Ajouter l'écoute pour `mousedown` (desktop) et `touchstart` (mobile)
      if (sidebarToggle) {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
      }
  
      // Cleanup
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }, [sidebarToggle]);

  return (
    <div  className={`fixed w-64 h-full px-4 py-2 bg-gray-800 transition-transform duration-300 ease-in-out ${
      sidebarToggle ? 'translate-x-0' : '-translate-x-full'
    }`}>
        <div className='my-2 mb-5'>
          <h1 className='text-2xl font-bold text-white'>Employés</h1>
        </div>
        <hr />
        <ul className='mt-3 font-bold text-white'>
          <li className='py-2 mb-2 rounded shadow hover:shadow hover:bg-blue-700'>
            <NavLink to="/employee-dashboard" className="px-3">
              <FaTachometerAlt className='inline-block w-6 h-6 mb-1 mr-2'/>
                Tableau de bord
            </NavLink>
          </li>
          <li className='py-2 mb-2 rounded shadow hover:shadow hover:bg-blue-700'>
            <NavLink to="/employee-dashboard/employees" className="px-3">
              <FaUsers className='inline-block w-6 h-6 mb-1 mr-2'/>
               Employés
            </NavLink>
          </li>
          <li className='py-2 mb-2 rounded shadow hover:shadow hover:bg-blue-700'>
            <NavLink to="/employee-dashboard" className="px-3">
              <FaCogs className='inline-block w-6 h-6 mb-1 mr-2'/>
               Paramètres
            </NavLink>
          </li>
        </ul>
    </div>
  )
}

export default Sidebar