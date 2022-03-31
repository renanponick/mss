import React from 'react';
import * as BiIcons from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Auth from '../services/Auth';
import './Navbar.css';
import { IconContext } from 'react-icons';



function NavBarLogOut() {
    const logOut = () => {
        Auth.logOut()
    };
  return (
    
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <BiIcons.BiLogOut onClick={logOut}/>
          </Link>
        </div>
      </IconContext.Provider>
  );
}

export default NavBarLogOut;