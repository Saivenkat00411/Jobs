import React, { createContext, useState } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import SmallSideBar from '../components/SmallSideBar'
import BigSideBar from '../components/BigSideBar'
import NavBar from '../components/NavBar'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const DashboardContext = createContext('')

export const loader = async () => {
  try {
    const data = await customFetch.get('/user/currentUser');
    // console.log(data);
    return data
  } catch (error) {
    return redirect('/')
  }
  // return data
}
const defaultTheme = localStorage.getItem('themeValue') === 'true'
document.body.classList.toggle('dark-theme', defaultTheme)
function DashboardLayout() {
  const navigate = useNavigate()
  const user = useLoaderData()
  // console.log(user)

  const [isSideBar, setSideBar] = useState(false)
  const [isDarkTheme, setDarkTheme] = useState(defaultTheme)
  const ToggleSideBar = () => {
    setSideBar(!isSideBar)
  }
  const ToggleTheme = () => {
    const toggleTheme = !isDarkTheme
    setDarkTheme(toggleTheme)
    document.body.classList.toggle('dark-theme', toggleTheme)
    // console.log('Toggle Theme')
    localStorage.setItem('themeValue', toggleTheme)
  }
  const LogoutUser = async () => {
    try {
      navigate('/')
      await customFetch.get('/user/logout')
      // return redirect('/')
    } catch (error) {
      return error
    }
    console.log('Logout User')
  }


  return (
    <DashboardContext.Provider value={{ isSideBar, isDarkTheme, ToggleSideBar, ToggleTheme, LogoutUser, user }}>
      <Wrapper>
        <main className='dashboard'>
          <SmallSideBar />
          <BigSideBar />
          <div>
            <NavBar />
            <div className='dashboard-page'>
              <Outlet />
            </div>
          </div>

        </main>

      </Wrapper>
    </DashboardContext.Provider>
  )
}
export default DashboardLayout