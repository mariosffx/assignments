import React from 'react'
import { ContactForm } from './contact-form'
import { Message } from './message'
import { UserPanel } from './user-panel'


export class App extends React.Component{

    CONTACT_FORM_DEFAULTS = {
        name: '',
        email: '',
        option:'B',
        select: 2,
        type:'',
        message:'',
        terms: false
    }
    constructor(props){
        super(props)
        this.state = {
            contact: {...this.CONTACT_FORM_DEFAULTS},
            sent: false,
            currentUser: null,
            alert: false
        }
        this.contactChanged = this.contactChanged.bind(this);
        this.logIn = this.logIn.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    contactChanged(contact){
        const newState = {...this.state}
        newState.contact = {...contact}
        this.setState(() => newState )
    }

    sendContact(contact){
        // For now just mark it as `sent`
        this.setState({
            sent:true
        })
    }

    logIn () {
        const userDetails = { name:'Marios',  email:'marios@web-coders.net' }
        const newState = {...this.state};
        newState.currentUser =  userDetails ;
        newState.contact.name = userDetails.name;
        newState.contact.email = userDetails.email;
        this.setState(newState)
    }

    onSubmit() {
        if (!this.state.contact.terms) {
            const newState = {...this.state} ;
            newState.alert = true;
            this.setState(newState);
        } else {
            this.sendContact();
        }
         
    }


    render(){
        return <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="pull-right">
                        {
                            this.state.currentUser 
                            ? <UserPanel user={this.state.currentUser} />
                            :
                                <button 
                                    onClick={this.logIn}
                                    className="btn btn-default">

                                    <i className="glyphicon glyphicon-user"></i> Log In
                                </button>
                        
                        }
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <h2>Contact us</h2>
                    <p>Please fill in form on the right to get fast reply</p>
                    <img style={{width:'100%'}} alt="" src="http://via.placeholder.com/300x200"/>
                </div>
                <div className="col-md-8">
                    {  
                        this.state.sent 
                        ? <Message />
                        :  
                            <ContactForm 
                                data={this.state.contact} 
                                onChange={this.contactChanged} 
                                onSubmit={this.onSubmit}
                                alert={this.state.alert}
                            />
                    }   
                </div>
            </div>
        </div>
    }
}
