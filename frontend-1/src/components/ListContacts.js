import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contact = props => (
  <tr>
    <td>{props.contact.name}</td>
    <td>{props.contact.email}</td>
    <td>{props.contact.address}</td>
    <td>{props.contact.telephones.map((tel, index) => 
      (
        <span key={index}>
          <span>{tel.telType}: </span>
          <span>{tel.telNumber}</span>
          <br />
        </span>
      ))
    }
    </td>
    <td>
      <Link to={"/edit/"+props.contact._id}>
        <button className="btn btn-primary m-1">
          Edit
        </button>
      </Link> 
        <button className="btn btn-danger" onClick={() => 
          { props.deleteContact(props.contact._id) }}>
            Delete
        </button>
    </td>
  </tr>
)

export default class ContactsList extends Component {
  constructor(props) {
    super(props);

    this.deleteContact = this.deleteContact.bind(this)

    this.state = {contacts: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/contacts/')
      .then(response => {
        this.setState({ contacts: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteContact(id) {
    console.log(id)
    axios.delete('http://localhost:5000/contacts/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      contacts: this.state.contacts.filter(el => el._id !== id)
    })
  }

  contactList() {
    return this.state.contacts.map(currentContact => {
      return (
      <Contact 
        contact={currentContact} 
        deleteContact={this.deleteContact} 
        key={currentContact._id}
      />
      )
    })
  }

  render() {
    return (
      <div>
        <h3>Contact List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Telephones</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.contactList() }
          </tbody>
        </table>
      </div>
    )
  }
}