import React, { useState } from 'react';

function FormRow({ type, name, labelTxt, defaultValue = '', onSubmit }) {
  const [formFieldValue, setFormFieldValue] = useState(defaultValue);

  const handleInputChange = (e) => {
    setFormFieldValue(e.target.value);
    
    if (onSubmit) {
      onSubmit(e.currentTarget.form);
    }
  };

  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelTxt || name}
      </label>
      <input
        name={name}
        className='form-input'
        type={type}
        placeholder={labelTxt}
        value={formFieldValue}
        onChange={handleInputChange}  
      />
    </div>
  );
}

export default FormRow;
