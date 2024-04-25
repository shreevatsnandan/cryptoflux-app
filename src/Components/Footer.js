import React from 'react';
import { Link } from 'react-router-dom';
import './footerd.css'

export default function Footer() {
 
  return (
    <div>
      <div className='footer'>
        <div className='about-app'>
        <div className='app-name'>
                <img src='../assets/app_logo.png' alt='logo' className='logo'/>Cryptoflux
            </div>
            

        </div>
        <div className='pages'>
            <h3>Pages</h3>
            <ul>
                    <Link to="/"><li>Explore</li></Link>
                    <Link to="/NewsPage"><li>Newsletter</li></Link>
                    <Link to="/About"><li>About</li></Link>
                </ul>

        </div>
        <div className='learn-more'>
        <h3>Learn more</h3>
            <ul>
                <li>Privacy</li>
                <li>Security</li>
                <li>Terms</li>
            </ul>

        </div>
      </div>
    </div>
  )
}