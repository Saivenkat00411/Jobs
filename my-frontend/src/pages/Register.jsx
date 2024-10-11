import React, { useState } from 'react'
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import FormRow from '../components/FormRow'
import Logo from '../components/Logo'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
export const action=async ({request})=>{
  // console.log(request)
  const formData=await request.formData();
  // console.log(formData);
  const data=Object.fromEntries(formData);
  // console.log([...formData])  
  // console.log(data)
  try {
    customFetch.post('/user/register',data);
    toast.success('Registration successful')
    return redirect('/Login');
  } catch (error) {
    // console.log(error);
    toast.error(error?.respomse?.data?.msg);
    return error;
  }
}
function Register() {

  const navigation=useNavigation()
  const isSubmitting = navigation.state === 'submitting';
  // console.log(navigation);
  return (
    <Wrapper>
      <Form method='post' className='form'> 
      <Logo/>
      <h4>Register</h4>
      <FormRow type='text' name={'name'} labelTxt={'firstName'}  />
      <FormRow type='text' name={'lastName'} labelTxt={'lastname'} />
      <FormRow type='text' name={'location'} labelTxt={'location'}  />
      <FormRow type='email' name={'email'} labelTxt={'email'}  />
      <FormRow type='password' name={'password'} labelTxt={'password'}  />
      <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>      <p>
        Already a Member?
        <Link to='/Login' className='member-btn'>Login</Link>
      </p>
      </Form>
    </Wrapper>
  )
}

export default Register