import React from 'react'
import Wrapper from '../assets/wrappers/StatsContainer'
import StatItem from './StatItem'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
function StatsContainer({statValues}) {

  const statitems=[
    {
      title:'Pending Applications',
      icon:<FaSuitcaseRolling/>,
      count:statValues.pending,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title:'declined Applications',
      icon:<FaCalendarCheck/>,
      count:statValues.declined,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title:'interviewed Applications',
      icon:<FaBug/>,
      count:statValues.interview,
      color: '#d66a6a',
      bcg: '#ffeeee',
    }
  ]
  return (
    <Wrapper>
      {
        statitems.map((item)=>{
         return <StatItem key={item.title} {...item} />
        })
      }
      </Wrapper>
  )
}

export default StatsContainer