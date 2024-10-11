import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
function BarChartjsx({data}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis dataKey={'data'}/>
          <YAxis allowDecimals={false}/>
          <Tooltip/>
          <Bar dataKey="data" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
  )
}

export default BarChartjsx