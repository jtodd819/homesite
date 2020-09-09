import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import  { Formik } from 'formik'
import * as Yup from 'yup';
import '../style/MailForm.css';

//Form for Sending Mail to my Address
class MailForm extends Component{

	//messages are composed of address, subject, and message
	constructor(props){
		super(props);
		this.state = { address:'', subject:'', message:'' };
		this.handleSend = this.handleSend.bind(this);
		this.schema = this.getFormSchema.bind(this);
	}

	/**
	 * Sets up Yup form schema for validation
	 */
	getFormSchema() {
		return Yup.object().shape({
			from: Yup.string()
				.email('Invalid email')
				.required('Required'),
			subject: Yup.string()
				.max(50, 'Too Long!')
				.required('Required'),
			body: Yup.string()
				.required('Required')
		});
	}

	//If the address subject and message are specified send mail using nodemail posted to the express sendmail route
	handleSend(event){
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
		event.preventDefault();
	}

	//create form for submitting email
	render(){
		return(
			<Formik
				validationSchema={this.schema}
				onSubmit={console.log}
				initialValues={{
					from: "",
					subject: "",
					body: ""
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleSubmit,
					isValid,
				}) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group controlId="validationFormikFrom">
							<Form.Label>From:</Form.Label>
							<Form.Control
								name="from"
								type="text"
								value={values.from}
								onChange={handleChange}
								isValid={touched.from && !errors.from}/>
							<Form.Control.Feedback>Nice!</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>To:</Form.Label>
							<Form.Control plaintext readOnly defaultValue="me@james-todd.net"/>
						</Form.Group>
						<Form.Group controlId="validationFormikSubject">
							<Form.Label>Subject:</Form.Label>
							<Form.Control
								name="subject"
								type="text"
								value={values.subject}
								onChange={handleChange}
								isValid={touched.subject && !errors.subject}/>
							<Form.Control.Feedback>Nice!</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="validationFormikBody">
							<Form.Label>Body:</Form.Label>
							<Form.Control
								name="body"
								type="text"
								value={values.body}
								onChange={handleChange}
								isValid={touched.body && !errors.body}/>
							<Form.Control.Feedback>Nice!</Form.Control.Feedback>
						</Form.Group>
						<Button type="submit"></Button>
					</Form>
				)}
			</Formik>
		);
	}
}

export default MailForm;
