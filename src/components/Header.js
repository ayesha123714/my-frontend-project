import React from 'react'
import '../styles/Header.css';
import { CiBellOn } from "react-icons/ci";

const Header = () => {
  return (
    <div className='container'>
        <div className='text'>
      <a href='/Login' className='log'>Login</a>
      <a href='/Signup'className='sign'>Signup</a>
      <a href='/CreateProduct'className='pro'>CreateProduct</a>
      <CiBellOn />
      <a href='/CreateProduct'className='pro'>Notification</a>
      </div>
    </div>
  )
}

export default Header
