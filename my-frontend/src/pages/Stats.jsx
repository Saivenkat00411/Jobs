import React from 'react'
import StatsContainer from '../components/StatsContainer'
import ChartsContainer from '../components/ChartsContainer'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
export const loader=async()=>{
  const {data}=await customFetch.get('/jobs/stats');
  // console.log(data);
  return data
}

function Stats() {
  const data=useLoaderData()
  return (
    <>
    <StatsContainer statValues={data.stats}/>
    <ChartsContainer chartValues={data.monthlyApplications}/>
    </>
  )
}

export default Stats