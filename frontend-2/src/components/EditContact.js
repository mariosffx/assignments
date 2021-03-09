import React, { Component } from 'react';
import axios from 'axios';

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeName         = this.onChangeName.bind(this);
    this.onChangeEmail        = this.onChangeEmail.bind(this);
    this.onChangeAddress      = this.onChangeAddress.bind(this);
    this.onChangeTelephones   = this.onChangeAddress.bind(this);
    this.onSubmit             = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      address: '',
      telephones: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/contacts/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          address: res.data.address,
          telephones: res.data.telephones          
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    
  }


  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }


  onChangeTelType (i, e) {
    let telephoneArray = [...this.state.telephones];
    let telephoneObj = {...telephoneArray[i]} 
    telephoneObj.telType = e.target.value; 
    telephoneArray[i] = telephoneObj; 
    
    this.setState({telephones: telephoneArray});
}

onChangeTelNumber (i, e) {
  let telephoneArray = [...this.state.telephones];
  let telephoneObj = {...telephoneArray[i]} 
  telephoneObj.telNumber = e.target.value; 
  telephoneArray[i] = telephoneObj; 
  this.setState({telephones: telephoneArray});
}

onAddTelephone(e) {
  e.preventDefault();
  this.setState({ telephones: [...this.state.telephones, {}] });
}
onRemTelephone(e) {
  e.preventDefault();
  let newTels = [...this.state.telephones];
  newTels.pop();

  this.setState({ telephones: [ ...newTels ] });
}
  

  onSubmit(e) {
    e.preventDefault();

    const contact = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      telephones: this.state.telephones
    }

    console.log(contact);

    axios.post('http://localhost:5000/contacts/update/' + this.props.match.params.id, contact)
      .then(res => console.log(res.data));
  }



  render() {
    return (
    <div>
      <h3>Edit Contact</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Name: </label>
          <input  
              type="text"
              required
              placeholder="John Doe"
              title="Cannot be blank"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
          />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input 
              type="email" 
              required
              placeholder= "johndoe@example.com"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
          />
        </div>
        <div className="form-group">
          <label>Address: </label>
          <input 
              type="text" 
              placeholder="Brooklyn Str. 44, New York"
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
          />
        </div>


        <div className="form-group">
        {this.state.telephones.map((telephone, i) => (
          <div className="row" key={i}>
            <div className="col-4">
              <label>Type: </label>
              <select 
                required 
                className="form-control"
                value={telephone.telType}
                onChange={value => this.onChangeTelType(i, value)}
              >
                <option key="Select"    >Select</option>
                <option key="home"      value="Home">Home</option>
                <option key="mobile"    value="Mobile">Mobile</option>
                <option key="office"    value="Office">Office</option>
                <option key="emergency" value="Emergency">Emergency</option>
              </select>
            </div>
            <div className="col-4">
              <label>Number: </label>
              <input 
                type="number" 
                className="form-control"
                value=    {telephone.telNumber}
                onChange= {value => this.onChangeTelNumber(i, value)}
              />
            </div>
          </div>
        ))}
          <button className="btn btn-success m-2" 
            onClick={(e) => this.onAddTelephone(e)}>
            Add new Number
          </button>
          <button className="btn btn-danger m-2" 
            onClick={(e) => this.onRemTelephone(e)}>
            Remove Last Number
          </button>
        </div>

        <div className="form-group">
          <input 
          type="submit" 
          value="Update Contact" 
          className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}