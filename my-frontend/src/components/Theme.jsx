import React, { useContext } from 'react'
import Wrapper from '../assets/wrappers/ThemeToggle'
import { DashboardContext } from '../pages/DashboardLayout'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
function Theme() {
    const {isDarkTheme,ToggleTheme}=useContext(DashboardContext)
    // console.log(isDarkTheme)
  return (
    <Wrapper className='Toggle-btn' onClick={ToggleTheme}>
       {isDarkTheme?<BsFillMoonFill/>:<BsFillSunFill/>}
    </Wrapper>
  )
}

export default Theme