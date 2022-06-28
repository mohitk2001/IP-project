import React from 'react'
import {Link} from "react-router-dom";
import './Landing.css'


const Landing = () => {
  return (
    <div className='container'>
        <div className='title-container'>
        <h1 className='landing-title'>Moyo</h1>
        <h3 className='landing-subheader'>Meditate and Connect.</h3>
        <h3 className='landing-para'>Start a focus session with ambient sounds and practise meditation</h3>
        <Link to='/timer'><button className='landing-btn' type='submit'>Start</button></Link>
        <Link to='/welcome-chat/'><button className='landing-btn'>Lets chat</button></Link>
        </div>
    </div>
  )
}

export default Landing