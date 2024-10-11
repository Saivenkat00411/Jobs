import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import axios from 'axios'
import customFetch from './utils/customFetch.jsx'
// fetch('/api/v1/test').then((res) => res.json()).then((data) => console.log(data));
// const data=await axios.get('/api/v1/test')
// const data=await customFetch.get('/test');
// console.log(data);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position='top-center'/>
  </StrictMode>,
)
