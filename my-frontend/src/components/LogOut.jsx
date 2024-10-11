import React, { useContext, useState } from 'react'
import Wrapper from '../assets/wrappers/LogoutContainer'
import { DashboardContext } from '../pages/DashboardLayout'
import { FaCaretDown, FaUserCircle } from 'react-icons/fa'
function LogOut() {
  const [showLogOut, setShowLogout] = useState(false)
  const { user, LogoutUser } = useContext(DashboardContext)
  // console.log(user)
  return (
    <Wrapper>
      <button type='button' className='btn logout-btn' onClick={() => setShowLogout(!showLogOut)}>
        {
          user.data.current.avatar ? <img src={user.data.current.avatar} alt='avatar' className='img' /> :
            <FaUserCircle />
        }
        {user.data.current.name}<FaCaretDown /></button>
      <div className={showLogOut ? 'dropdown show-dropdown' : 'dropdown'}>
        <button className='dropdown-btn' type='button' onClick={LogoutUser}>Logout</button>
      </div>
    </Wrapper>
  )
}

export default LogOut