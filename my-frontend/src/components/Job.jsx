import React from 'react'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/Job';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import JobInfo from './JobInfo';
import { Form,Link } from 'react-router-dom';
day.extend(advancedFormat);


function Job({...props}) {
     
    const {_id,company,position,jobStatus,jobType,createdAt,jobLocation}=props
    // console.log(company,position,jobStatus,jobType,createdAt,jobLocation);
    const datePosted=day(createdAt).format('MMM Do, YYYY')
  return (
    <Wrapper>
        <header>
            <div className='main-icon'>
                {company.charAt(0)}
            </div>
            <div className='info'>
                <h5>{position}</h5>
                <p>{company}</p>
            </div>
        </header>
        <div className='content'>
            <div className='content-center'>
                <JobInfo icon={<FaLocationArrow/>} text={jobLocation}/>
                <JobInfo icon={<FaBriefcase/>}  text={jobType}/>
                <JobInfo icon={<FaCalendarAlt/>} text={datePosted}/>
                <div className={`status ${jobStatus}`}>{jobStatus}</div>
            </div>
            <footer className='actions'>
          <Link to={`../EditJob/${_id}`} className='btn edit-btn'>Edit</Link>
          <Form method='post' action={`../DeleteJob/${_id}`}>
            <button type='submit' className='btn delete-btn'>
              Delete
            </button>
          </Form>
        </footer>
        </div>
        

    </Wrapper>
  )
}

export default Job