import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link, useNavigation } from 'react-router-dom';
import { JOBTYPE, JOBSTATUS, SORT_BY } from '../utils/Links';
function SearchContainer({data,params}) {
  const submit=useSubmit()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const statuslist = [...Object.values(JOBSTATUS)]
  statuslist.unshift('all')
  const typeList = [...Object.values(JOBTYPE)]
  typeList.unshift('all')
  const {jobs,currentPage,numfPages,totalJobs}=data
  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>

          <FormRow type='search' name='search' defaultValue='' onSubmit={submit}/>
          <FormRowSelect
            labelText='job status'
            name='jobstatus'
            field={statuslist}
            defaultValue={params.jobstatus}
            onChange={(e)=>submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText='job type'
            name='jobtype'
            field={typeList}
            defaultValue={params.jobType}
            onChange={(e)=>submit(e.currentTarget.form)}
          />
          <FormRowSelect
            name='sort'
            defaultValue='newest'
            field={SORT_BY}
            onChange={(e)=>submit(e.currentTarget.form)}
          />

          <Link to='/Dashboard/AllJobs' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
          {/* <button type='submit' className='btn btn-block form-btn ' disabled={isSubmitting}>{isSubmitting ? 'submitting' : 'submit'}</button> */}
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer