import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import  { Formik } from 'formik';
import * as Yup from 'yup';
import '../style/MailForm.css';
import API from 'api';

//Form for Sending Mail to my Address
class MailForm extends Component {

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
				.email('Invalid Email')
				.required('Required'),
			subject: Yup.string()
				.max(50, 'Too Long!')
				.required('Required'),
			body: Yup.string()
				.required('Required')
		});
	}

	/**
	 * Send email alert to website email account
	 * @param {*} mail message to send
	 */
	async handleSend (mail) {
		try {
			await API.post('/mail', {from: mail.from, subject: mail.subject, body: mail.body});
		} catch (err) {
			console.error(`Failed to send mail with subject ${mail.subject} due to error: ${err}`);
		}
	}

	//create form for submitting email
	render(){
		return(
			<Formik
				validationSchema={this.schema}
				onSubmit={this.handleSend}
				validateOnBlur={true}
				validateOnChange={true}
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
					handleBlur,
					handleSubmit,
					isValid,
				}) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group controlId="validationFormikFrom">
							<Form.Label>From:</Form.Label>
							<Form.Control
								name="from"
								type="text"
								value={values.from ? values.from : (this.props.user && this.props.user.emailAddress ? this.props.user.emailAddress : values.from)}
								onChange={handleChange}
								onBlur={handleBlur}
								isInvalid={touched.from && !!errors.from}
								isValid={touched.from && !errors.from}/>
							<Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">{errors.from}</Form.Control.Feedback>
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
								onBlur={handleBlur}
								isInvalid={touched.subject && !!errors.subject}
								isValid={touched.subject && !errors.subject}/>
							<Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="validationFormikBody">
							<Form.Label>Body:</Form.Label>
							<Form.Control
								as="textarea"
								rows="4"
								name="body"
								type="text"
								value={values.body}
								onChange={handleChange}
								onBlur={handleBlur}
								isInvalid={touched.body && !!errors.body}
								isValid={touched.body && !errors.body}/>
							<Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">{errors.body}</Form.Control.Feedback>
						</Form.Group>
						<Button type="submit">Send</Button>
					</Form>
				)}
			</Formik>
		);
	}
}

export default MailForm;
