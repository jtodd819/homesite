import React, {Component} from 'react';
import MailForm from './MailForm';
import { Container } from 'react-bootstrap';

class Contact extends Component{
	render(){
		return(
			<Container>
				<MailForm />
			</Container>
		);
	}
}

export default Contact;
