import React from 'react'
import { useLoaderData } from 'react-router-dom';
import SearchContainer from '../components/SearchContainer';
import JobsContainer from '../components/JobsContainer';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
export const loader = async ({request}) => {
  try {
    const params=Object.fromEntries([... new URL(request.url).searchParams.entries()])
    // console.log(params)
    const { data } = await customFetch.get('/jobs',{params});
    // console.log(jobs)
    return {data,params}
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function AllJobs() {
  const {data,params}  = useLoaderData()
  // console.log(data);
  return (
    <>
      <SearchContainer data={data} params={params}/>
      <JobsContainer jobsData={data}/>
    </>
  )
}

export default AllJobs