import React from 'react'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import FormRow from '../components/FormRow'
import FormRowSelect from '../components/FormRowSelect'
import { JOBSTATUS, JOBTYPE } from '../utils/Links'
import { Form, redirect, useLoaderData, useNavigation } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const loader = async (req) => {
  // console.log(req.params);
  const { data } = await customFetch.get(`jobs/${req.params.id}`)
  // console.log(data.isJobExists);
  return data.isJobExists;
}

export const action = async ({request,params}) => {
  const formdata=await request.formData()
  const data=Object.fromEntries(formdata)
  // console.log(data);
  try {
    await customFetch.patch(`jobs/${params.id}`,data)
    toast.success('Data updated')
    return redirect('/Dashboard/AllJobs')
  } catch (error) {
    return error
  }
}
function EditJob() {
  const data = useLoaderData()
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='from'>
        <h4> Edit Job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' defaultValue={data.position} />
          <FormRow type='text' name='company' defaultValue={data.company} />
          <FormRow type='text' name='jobLocation' defaultValue={data.jobLocation} />
          <FormRowSelect name='jobStatus' field={JOBSTATUS} defaultValue={data.jobStatus} />
          <FormRowSelect name='jobType' field={JOBTYPE} defaultValue={data.jobType} />
          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default EditJob