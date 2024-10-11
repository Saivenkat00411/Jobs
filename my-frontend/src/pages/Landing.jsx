import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import main from '../assets/images/main.svg'
import Logo from '../components/Logo'
// import Wrapper from '../assets/wrappers/LandingPage'

const Wrapper=styled.section`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
    margin-bottom: 1.5rem;
  }
  p {
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }
  .register-link {
    margin-right: 1rem;
  }
  .main-img {
    display: none;
  }
  .btn {
    padding: 0.75rem 1rem;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`

function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>Job <span>Tracking</span> App</h1>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non nulla mi. Sed imperdiet efficitur nisl, sollicitudin eleifend risus tempus a. Nunc gravida orci eget dapibus posuere. Sed convallis eros vel eros accumsan, vitae cursus purus mollis. Vestibulum suscipit neque lacus, ac aliquet erat cursus vel. Praesent consequat turpis a mauris euismod, sit amet volutpat nisl scelerisque. Suspendisse augue lacus, ultrices a molestie quis, faucibus quis nisi</p>
          <Link to='/Register' className='btn register-link'>Register</Link>
          <Link to='/Login' className='btn'>Login/Demo User</Link>
        </div>
        <img src={main} alt='Landing Page Image' className='img main-img'/>
      </div>
    </Wrapper>
  )
}

export default Landing