import React from 'react'
import { Form, Link, useNavigation, redirect, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import FormRow from '../components/FormRow'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData);
  // console.log(data);
  try {
    await customFetch.post('/user/login', data);
    toast.success('Login successful')
    return redirect('/Dashboard');
  } catch (error) {
    // console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

function Login() {
  // const formData=new FormData();
  const navigation = useNavigation()
  const navigate = useNavigate()
  const isSubmitting = navigation.state === 'submitting';
  const handleExplore = async () => {

    const data = {
      email: 'test@gmail.com',
      password: 'password'
    }
    try {
      await customFetch.post('/user/login', data)
      toast.success('Explore the App');
      navigate('/Dashboard')
    } catch (error) {
      return error
    }
  }
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type={'email'} name='email' />
        <FormRow type={'password'} name='password' />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <button type='button' className='btn btn-block' onClick={handleExplore}>Explore the App</button>
        <p>
          Not a member yet?
          <Link to='/Register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login