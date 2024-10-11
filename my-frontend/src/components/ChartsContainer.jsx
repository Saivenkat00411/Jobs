import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/ChartsContainer'
import ArearChartjsx from './ArearChartjsx'
import BarChartjsx from './BarChartjsx'

function ChartsContainer({ chartValues }) {
    const [area, setarea] = useState(false)
    const handleClick = () => {
        setarea(!area)
    }
    return (
        <Wrapper>
            <h4>Monthly</h4>
            <button type='buttpn' onClick={(handleClick)}>{area ? 'Bar chart' : 'Area chart'}</button>
            {
                area ? <ArearChartjsx data={chartValues} /> : <BarChartjsx data={chartValues} />

            }
        </Wrapper>
    )
}

export default ChartsContainer