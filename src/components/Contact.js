import React, {Component} from 'react';
import MailForm from './MailForm';
import { Container } from 'react-bootstrap';

class Contact extends Component{
	render(){
		return(
			<Container style = {{'background-color': 'rgb(209, 224, 224)', 'padding': '30px 15px 30px 15px'}}>
				<MailForm user = {this.props.user} />
			</Container>
		);
	}
}

export default Contact;
