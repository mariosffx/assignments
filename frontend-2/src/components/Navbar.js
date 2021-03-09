import React, { Component } from 'react';
import { Link } from 'react-router-dom';

 class Navbar extends Component {

  render() {
    return (
      <nav>
        <Link className="home navLink" to="/">
          Contacts Manager
        </Link>
        <Link className="navLink" to="/add_contact">
          Add New Contact
        </Link>
      </nav>
    )
  }
}

export default Navbar;