import React, {Component} from 'react';
import MailForm from './MailForm';

class Contact extends Component{
	render(){
		return(
			<div>
				<MailForm />
				<div className='alert-info text-white' style={{width: 300, height: 'auto', margin:'auto'}}>
					<a href='https://github.com/jtodd819'><i className='fa fa-github'/> </a>
					<a href='mailto:me@james-todd.net'><i className='fa fa-envelope'/></a>
				</div>
			</div>
		);
	}
}

export default Contact;
