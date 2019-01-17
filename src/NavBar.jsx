import React, {Component} from 'react';

//module that adds number of users to navigation bar based on props
function NavBar(props)  {
  const userCount = parseInt(props.userCount);
  if (userCount == 1) {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-users">👤 1 user online</span>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-users">👥 {userCount} users online</span>
      </nav>
    );
  }
}


export default NavBar;