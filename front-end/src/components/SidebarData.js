import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as FcIcons from 'react-icons/fc';


export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Login',
    path: '/login',
    icon: <IoIcons.IoMdLogIn />,
    cName: 'nav-text'
  },
  {
    title: 'Sobre',
    path: '/sobre',
    icon: <FcIcons.FcAbout />,
    cName: 'nav-text'
  }
];