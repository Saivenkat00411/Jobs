import React from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'
export const action=async ({request,params})=>{
  try {
    await customFetch.delete(`/jobs/${params.id}`)
    toast.success('Job Deleted')
  } catch (error) {
    return error
  }
  return redirect('../AllJobs')
  }
function DeleteJob() {
  return (
    <div>DeleteJob</div>
  )
}

export default DeleteJob