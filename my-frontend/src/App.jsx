import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeLayout from './pages/HomeLayout'
import AddJob from './pages/AddJob'
import Admin from './pages/Admin'
import AllJobs from './pages/AllJobs'
import DashboardLayout from './pages/DashboardLayout'
import DeleteJob from './pages/DeleteJob'
import EditJob from './pages/EditJob'
import Landing from './pages/Landing'
import Login, { action as loginAction } from './pages/Login'
import Profile from './pages/Profile'
import Register, { action as RegisterAction } from './pages/Register'
import Stats from './pages/Stats'
import Error from './pages/Error'
import { action as AddJobAction } from './pages/AddJob'
import { loader as dashboardLoader } from './pages/DashboardLayout'
import { loader as AllJobsLoader } from './pages/AllJobs'
import {action as DeleteAction} from './pages/DeleteJob'
import {loader as EditJobLoader,action as EditJobAction} from './pages/EditJob'
import {loader as AdminLoader} from './pages/Admin'
import {action as ProfileAction} from './pages/Profile'
import { loader as StatsLoader } from './pages/Stats'
function App() {

  const router = createBrowserRouter([

    {
      path: '/',
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />
        },
        {
          path: 'Dashboard',
          element: <DashboardLayout />,
          loader: dashboardLoader,
          children: [
            {
              index: true,
              element: <AddJob />,
              action: AddJobAction
            },
            {
              path: 'EditJob/:id',
              element: <EditJob />,
              loader:EditJobLoader,
              action:EditJobAction
            },
            {
              path:'DeleteJob/:id',
              element:<DeleteJob/>,
              action:DeleteAction
            },
            {
              path: 'AllJobs',
              element: <AllJobs />,
              loader: AllJobsLoader
            },
            {
              path: 'Stats',
              element: <Stats />,
              loader:StatsLoader
            },
            {
              path: 'Profile',
              element: <Profile />,
              // loader:ProfileLoader
              action:ProfileAction
            },
            {
              path: 'Admin',
              element: <Admin />,
              loader:AdminLoader
            },
          ]
        },
        {
          path: 'Login',
          element: <Login />,
          action: loginAction
        },
        {
          path: 'Register',
          element: <Register />,
          action: RegisterAction

        }

      ]
    }



  ])
  return <RouterProvider router={router} />
}

export default App
