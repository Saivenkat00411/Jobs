import React from 'react'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { Form, redirect, useNavigation } from 'react-router-dom'
import FormRow from '../components/FormRow'
import customFetch from '../utils/customFetch'
import FormRowSelect from '../components/FormRowSelect'
import { JOBSTATUS,JOBTYPE } from '../utils/Links'
import { toast } from 'react-toastify'
export const action=async({request})=>{
  const response=await request.formData();
  const data=Object.fromEntries(response)
  console.log(data);
  try {
    await customFetch.post('/jobs',data);
    toast.success('Job Created');
    return redirect('AllJobs');
  } catch (error) {
    return error
  }
}

function AddJob() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Add Job</h4>
        <div className='form-center'>
          <FormRow type={'text'} name='position' labelTxt={'position'} />
          <FormRow type={'text'} name={'company'} />
          <FormRow type={'text'} name='jobLocation' />
          <FormRowSelect name={'jobType'} field={JOBTYPE} defaultValue={JOBTYPE.FULLTIME} />
          <FormRowSelect name={'jobStatus'} field={JOBSTATUS} defaultValue={JOBSTATUS.PENDING} />
          <button type='submit' className='btn btn-block form-btn ' disabled={isSubmitting}>{isSubmitting ? 'submitting' : 'submit'}</button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddJob