import React, { useContext } from 'react'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { Form, useLoaderData, useNavigation } from 'react-router-dom'
import FormRow from '../components/FormRow'
import customFetch from '../utils/customFetch'
import { DashboardContext } from './DashboardLayout'
import { toast } from 'react-toastify'
// export const loader=async({})=>{

//   const {data}=await customFetch.get('/users/currentUser')
//   console.log(data)
//   return null
// }
export const action = async ({ request }) => {
  const formData = await request.formData();

  const file = formData.get('avatar');
  // if (file && file.size > 500000) {
  //   toast.error('Image size too large');
  //   return null;
  // }

  try {
    const data =await customFetch.patch('/user/updateUser', formData);
    // console.log(data)
    toast.success('Profile updated successfully');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error
  }
  return null;
};
function Profile() {
  // const data=useLoaderData()
  const { user } = useContext(DashboardContext);
  // console.log(user);
  const submit=useNavigation()
  const isSubmitting=submit.state==='submitting'
  return (
    <Wrapper>
      <Form method='post' encType='multipart/form-data'>
        <h4 className='form-title'> Profile </h4>
        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='image' className='form-label'>select an image </label>
            <input type='file' id='avatar' name='avatar' className='form-input' accept='image/*' />
          </div>
          <FormRow type={'text'} name='name' defaultValue={user.data.current.name} />
          <FormRow type={'text'} name={'lastName'} defaultValue={user.data.current.lastName} />
          <FormRow type={'email'} name='email' defaultValue={user.data.current.email} />
          <FormRow type={'text'} name='location' defaultValue={user.data.current.location} />
          <button className='btn btn-blocl form-btn' type='submit' disabled={isSubmitting}>{isSubmitting ? 'submitting...' : 'save changes'} </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default Profile