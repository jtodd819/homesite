import React, { Component } from 'react';

//Form for Sending Mail to my Address
class MailForm extends Component{
	constructor(props){
		super(props);
		this.state = {address:'', subject:'', message:'', sent: false};
		this.handleTextInput = this.handleTextInput.bind(this);
		this.handleSend = this.handleSend.bind(this);
	}
	handleTextInput(event){
		const value = event.target.value;
		const name = event.target.name;
		this.setState({[name]: value});
	}
	handleSend(event){
		alert('Message Sent.');
		event.preventDefault();
	}
	render(){
		return(
			<form onSubmit={this.handleSend}>
				<label>Address:
					<input name='address' type='text' value={this.state.address} onChange={this.handleTextInput}/>
				</label>
				<label>Subject:
					<input name='subject' type='text' value={this.state.subject} onChange={this.handleTextInput}/>
				</label>
				<br/>
				<label>Message:
					<input name='message' type='text' value={this.state.message} onChange={this.handleTextInput}/>
				</label>
				<input type='submit' value='Send'/>
			</form>
		);
	}
}

export default MailForm;
