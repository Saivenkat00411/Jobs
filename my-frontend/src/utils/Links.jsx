import React from 'react';
import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';
const links=[
    {text:'add job',path:'.',icon:<FaWpforms/>},
    {text:'stats',path:'Stats',icon:<IoBarChartSharp/>},
    {text:'all jobs',path:'AllJobs',icon:<MdQueryStats/>},
    {text:'profile',path:'Profile',icon:<ImProfile/>},
    {text:'admin',path:'Admin',icon:<MdAdminPanelSettings/>},
]
export const JOBSTATUS={
    INTERVIEW:'interview',
    DECLINED:'declined',
    PENDING:'pending'
}
export const JOBTYPE={
    INTERNSHIP:'internship',
    FULLTIME:'full-time',
    PARTTIME:'part-time'
}
export const SORT_BY={
    NEWEST:'newest',
    OLDEST:'oldest',
    ASEC:'a-z',
    DESC:'z-a'
}

export default links;