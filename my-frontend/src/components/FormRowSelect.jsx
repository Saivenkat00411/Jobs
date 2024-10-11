import React, { Children } from 'react'
import { JOBSTATUS, JOBTYPE } from '../utils/Links';

function FormRowSelect({ name, field, defaultValue,onChange }) {
    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {name}
            </label>
            <select
                name={name}
                id={name}
                className='form-select'
                defaultValue={defaultValue}
                onChange={onChange}
            >
                {Object.values(field).map((itemValue) => {
                    return (
                        <option key={itemValue} value={itemValue}>
                            {itemValue}
                        </option>
                    );
                })}
            </select>
        </div>
    )
}

export default FormRowSelect