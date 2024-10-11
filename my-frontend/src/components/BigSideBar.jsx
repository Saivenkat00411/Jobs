import React, { useContext } from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import { DashboardContext } from '../pages/DashboardLayout'
import Logo from './Logo'
import links from '../utils/Links'
import { NavLink } from 'react-router-dom'
function BigSideBar() {
  const data = useContext(DashboardContext)
  // console.log(data.user.data)
  const sideBarCSS = data.isSideBar ? 'sidebar-container show-sidebar' : 'sidebar-container'

  return (
    <Wrapper>
      <div className={sideBarCSS}>
        <div className='content'>
          <header><Logo /></header>
          <div >
            {links.map((item) => {
              const { path, text, icon } = item
              const { role } = data.user.data.current
              
              if (role !== 'admin' && path === 'Admin')
                return
              return <NavLink className='nav-link' to={path} key={text} end><span className='icon' >{icon}</span>{text}</NavLink>
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSideBar