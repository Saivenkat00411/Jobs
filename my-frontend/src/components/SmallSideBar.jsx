import React, { useContext } from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import Logo from './Logo'
import links from '../utils/Links'
import { NavLink } from 'react-router-dom'
import { DashboardContext } from '../pages/DashboardLayout'
function SmallSideBar() {
    const {ToggleSideBar,isSideBar,user}=useContext(DashboardContext)
    const sideBarCSS=isSideBar ? 'sidebar-container show-sidebar':'sidebar-container'
    return (
        <Wrapper>
            <div className={sideBarCSS}>
                <div className='content'>
                    <button type='button' className='close-btn' onClick={ToggleSideBar}>
                    <FaTimes/></button>
                    <header><Logo/></header>
                    <div className='nav-links'>
                        {
                        links.map((item)=>{
                            const {text,path,icon}=item
                            const {role}=user
                            if(role!=='admin' && path==='Admin')
                                return
                            return <NavLink key={text} className='nav-link' to={path} onClick={ToggleSideBar}><span>{icon}</span>{text}</NavLink>
                        })
}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default SmallSideBar