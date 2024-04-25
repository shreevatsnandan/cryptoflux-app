import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar_style.css';

export default function Navbar() {

    const [theme, setTheme] = useState("light-theme");

    const toggleButton = () => {
        if (theme === "dark-theme"){
            setTheme("light-theme");
        }else {
            setTheme("dark-theme");
        }     
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    
    return (
        <div className='Navbar'>
            <Link to="/">
                <div className='app-logo'>
                    <div className='logoimg'><img src='../assets/app_logo.png' alt='logo'/></div>
                    <div className='logotxt'>Cryptoflux</div>
                </div>
            </Link>
            <div className='nav-option'>
                <ul>
                    <Link to="/"><li>Explore</li></Link>
                    <Link to="/NewsPage"><li>Newsletter</li></Link>
                    <Link to="/About"><li>About</li></Link>
                </ul>
            </div>
            <div className='nav-state'>
                <div className="switch">
                    <button className='theme-cng' onClick={() => toggleButton()}>
                        <img src={theme === "light-theme" ? "../assets/dark_icon.png" : "../assets/light_icon.png"} alt='logo'/>
                    </button>
                </div>
            </div>
        </div>
    );
}
