import React, { useContext } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft } from 'react-icons/fa'
import Logo from './Logo'
import { DashboardContext } from '../pages/DashboardLayout'
import styled from 'styled-components'
import LogOut from './LogOut'
import Theme from './Theme'

function NavBar() {
  const {ToggleSideBar}=useContext(DashboardContext)
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={ToggleSideBar}>
          <FaAlignLeft />
        </button>
       <div className='logo'>
        <Logo />
        <h4 className='logo-text'>Dashboard</h4>
       </div>
       <Theme/>
       <LogOut/>
      </div>
    </Wrapper>
  )
}

export default NavBar