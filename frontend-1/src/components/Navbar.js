import React, { Component } from 'react';
import { Link } from 'react-router-dom';

 class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div class="container">
        <Link to="/" className="navbar-brand">Contacts Manager</Link>
        <button className="navbar-toggler" 
          type="button" 
          data-toggle="collapse"
          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collpase navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/add_contacts" 
               className="nav-link">
                Add New Contact
              </Link>
            </li>
          </ul>
        </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;