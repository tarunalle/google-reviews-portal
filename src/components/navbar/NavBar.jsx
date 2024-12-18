import { useAuth0 } from "@auth0/auth0-react";
import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom';

const NavBar = () => {

    const { user, loginWithRedirect , isAuthenticated , logout } = useAuth0();

  return (
    <header className="header">
        <a href="https://www.restaverse.com/" className='logo'>RESTAVERSE</a>

        {isAuthenticated && <h3>Hello {user.name}</h3>}

        <nav className='navbar'>
        

        {isAuthenticated ? (            //if user is authenticated logout and select reviews are shown
                <a><a  href='/home'>Select Reviews</a></a>
            ):(
                <a onClick={e => loginWithRedirect()}>Log in</a> 
            )}
            {isAuthenticated ? (   
                <a onClick={e => logout()}>Logout</a>
            ):(
            <a onClick={e => loginWithRedirect()}>Sign up</a> 
            )}    
            
        </nav>
    </header>
  )
}

export default NavBar