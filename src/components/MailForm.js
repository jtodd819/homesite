import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import '../style/MailForm.css';

//Form for Sending Mail to my Address
class MailForm extends Component{

	//messages are composed of address,subject, and message
	constructor(props){
		super(props);
		this.state = {address:'', subject:'', message:''};
		this.handleTextInput = this.handleTextInput.bind(this);
		this.handleSend = this.handleSend.bind(this);
		this.getLengthValidation = this.getLengthValidation.bind(this);
		this.getAddressValidation = this.getAddressValidation.bind(this);
	}

	//update state of each input based on user input
	handleTextInput(event){
		const value = event.target.value;
		const name = event.target.name;
		this.setState({[name]: value});
	}

	//If the address subject and message are specified send mail using nodemail posted to the express sendmail route
	handleSend(event){
		if(this.state.address === '' || this.state.subject === '' || this.state.message === ''){
			alert('Please include a valid address, subject, and message to send a contact email.');
		}else{
			fetch('/sendmail', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					address: this.state.address,
					subject: this.state.subject,
					message: this.state.message,
				}),
			}).then(alert('Message Sent!'));
		}
		event.preventDefault();
	}
	
	//Return the validity of an input field based on its length
	getLengthValidation(length){
		console.log(length);
		if(length > 0){
			return 'success';
		}
		return 'error';
	}

	//validate email address based on regex pattern
	getAddressValidation(address){
		if(/[^\s@]+@[^\s@]+\.[^\s@]+/.test(address)){
			return 'success';
		}
		return 'error';
	}

	//create form for submitting email
	render(){
		return(
			<form className='mailForm' onSubmit={this.handleSend}>
				<FormGroup validationState={this.getAddressValidation(this.state.address)}>
					<ControlLabel>Address:</ControlLabel><br/>
					<FormControl name='address' type='text' value={this.state.address} 
					onChange={this.handleTextInput}/><br/>
				</FormGroup>
				<FormGroup validationState={this.getLengthValidation(this.state.subject.length)}>
					<ControlLabel>Subject:</ControlLabel><br/>
					<FormControl name='subject' type='text' value={this.state.subject} 
					onChange={this.handleTextInput}/><br/>
				</FormGroup>
				<FormGroup validationState={this.getLengthValidation(this.state.message.length)}>
					<ControlLabel>Message:</ControlLabel><br/>
					<FormControl name='message' type='text' value={this.state.message}
					componentClass='textarea' onChange={this.handleTextInput}/><br/>
				</FormGroup>
				<div style={{textAlign: 'center'}}>
					<input type='submit' value='Send'/>
				</div>
			</form>
		);
	}
}

export default MailForm;
