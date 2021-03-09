import React from 'react';
import { object,func } from 'prop-types';

export class ContactForm extends React.Component{

    static defaultProps = {
        data : {
            name:'',
            email:'',
            option:'A',
            select: 1,
            message:'',
            terms: false
        }
    }

    static propTypes = {
        onChange: func.isRequired,
        onSubmit: func.isRequired,
        data: object.isRequired
    }

    constructor(props){
        super(props)
        this.state = {
            data: {...this.defaultProps}
        }
        this.isSelected = this.isSelected.bind(this);
    }


    /**
     * When form is submitted forward contact data to parent
     * @param {event} DOMEvent
     */

     handleSubmit(event){
        event.preventDefault();
        this.props.onSubmit(this.props.data)
    }

    fieldChange(event){
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const newData = {...this.props.data}
        newData[target.name] = value; 
        this.props.onChange(newData);
    }



    isSelected(key, option){
        return this.props.data.option === key;
    }

    options = [
        {id:1, label:'I have question about my membership'},
        {id:2, label:'I have technical question'},
        {id:3, label:'I would like to change membership'},
        {id:4, label:'Other question'}
    ]

    render(){
        const data = this.props.data;

        return <form onSubmit={(e) => this.handleSubmit(e)}>

        <h3>Contact Form</h3>

        <div className="form-group">
            <label className="form-label">Your Name:</label>
            <input 
                name="name" 
                className="form-control" 
                value={data.name}
                onChange={(e) =>  this.fieldChange(e) }
            />
        </div>

        <div className="form-group">
            <label className="form-label">Your Best Email:</label>
            <input 
                name="email" 
                className="form-control" 
                value={data.email}
                onChange={(e) =>  this.fieldChange(e) }

            />
        </div>

        <label className="form-label">Select your membership option:</label>
        <div 
            className="form-group row"
            >
            <label className="form-label col-xs-4">
                <input 
                    type="radio" 
                    name="option" 
                    value="A"
                    onChange={(e) => this.fieldChange(e)}
                    checked={data.option ===  "A"}
                    
                    /> 
                    Option A
            </label>
            <label className="form-label col-xs-4">
                <input 
                    type="radio" 
                    name="option" 
                    onChange={(e) => this.fieldChange(e)}
                    value="B"
                    checked={data.option ===  "B"}
                    /> 
                    Option B
                </label>
            <label className="form-label col-xs-4">
                <input 
                    type="radio" 
                    name="option" 
                    onChange={(e) => this.fieldChange(e)}
                    value="C"
                    checked={data.option ===  "C"}
                /> 
                    Option C
                </label>
        </div>

        <hr/>

        <div className="form-group">
            <label className="form-label">
                What can we help you with:
            </label>
            <select  
                className="form-control" 
                name="select"
                onChange={(e) => this.fieldChange(e)}
                value={this.options[data.select -1].id}
                >
               {this.options.map (option => 
                    <option 
                        key={option.id}
                        value={option.id}
                    >
                        {option.label}
                    </option>
               
                )}


            </select>
        </div>

        <div className="form-group">
            <label className="form-label">Message:</label>
            <textarea 
                name="message" rows="10" 
                value={data.message}
                onChange={(e) =>  this.fieldChange(e)}
                placeholder="Please type your question here" 
                className="form-control"/>
        </div>

        <div className="form-group">
            <label className="form-label"> 
                <input type="checkbox" 
                    name="terms"
                    onChange={(e) =>  this.fieldChange(e)}
                /> 
                    I agree to terms and conditions 
                    {
                     this.props.alert
                     ? 
                        <div class="alert alert-danger" role="alert">
                            You should agree to terms and conditions before sending your message.
                        </div>
                     : null
                    }
                        

            </label>

        </div>
            <input 
            type="submit" 
            value="Send" 
            onClick={(e) => this.handleSubmit(e)}
            className="contactform-submit" />
        </form>
    }
}
