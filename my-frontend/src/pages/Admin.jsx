import React from 'react'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from '../components/StatItem';
import { FaSuitcaseRolling,FaCalendarCheck } from 'react-icons/fa';
export const loader = async ({ params }) => {

  try {
    const { data } = await customFetch('jobs/usersGroup')
    return data
  } catch (error) {
    return error
  }
  // console.log(data);
}

function Admin() {
  const data = useLoaderData()
  console.log(data)
  return (
    <Wrapper>
     <StatItem
        title='current users'
        count={data.users}
        color='#e9b949'
        bcg='#fcefc7'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='total jobs'
        count={data.jobs}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  )
}

export default Admin