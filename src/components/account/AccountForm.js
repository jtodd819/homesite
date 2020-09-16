import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import  { Formik } from 'formik';
import * as Yup from 'yup';
import API from 'api';

class AccountForm extends Component {

	constructor(props){
		super(props);
		this.schema = this.getFormSchema.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			initialValues: this.props.editAccount ? this.props.editAccount : {userName: '', emailAddress: '', password: '', confirmPassword: ''}
		}
	}

	/**
	 * Sets up Yup form schema for validation
	 */
	getFormSchema() {
        if (this.props.newAccount || this.props.editAccount) {
            return Yup.object().shape({
                userName: Yup.string().required('Required'),
                emailAddress: Yup.string().label('Optional').email('Invalid Email').max(50, 'Too Long!'),
                password: Yup.string().min(5, 'Too Short!').required('Required').max(50, 'Too Long!'),
                confirmPassword: Yup.string().required('Required').test('passwords-match', 'Passwords Must Match!', function(value) {
                    return this.parent.password === value;
                })
            });
        } else {
            return Yup.object().shape({
                userName: Yup.string().required('Required'),
				emailAddress: Yup.string(),
				password: Yup.string().required('Required').max(50, 'Too Long!'),
				confirmPassword: Yup.string()
            });
        }
	}

	/**
	 * Callback to save a user to the database after form submission
	 * @param {*} user user to save
	 */
	async onSubmit(user) {
		try {
			if (this.props.newAccount) {
				const newUser = {userName: user.userName, password: user.password};
				if (user.emailAddress) {
					newUser.emailAddress = user.emailAddress;
				}
				await API.post('/users', newUser);
			} else if (this.props.editAccount) {
				await API.put(`/users/${this.props.editAccount.id}`, {userName: user.userName, password: user.password, emailAddress: user.emailAddress});
			}
			const loginResult = await API.post('login', {userName: user.userName, password: user.password});
			if (loginResult.status === 200) {
				localStorage.setItem('token', loginResult.headers.authorization);
				const userResponse = await API.get(`/users/${user.userName}`)
				if (userResponse.status === 200) {
					user = userResponse.data;
					delete user.password;
					this.props.onSubmit(user);
				} else {
					throw 'Failed to find logged in user.';
				}
			} else {
				throw 'Failed to login with user credentials.';
			}
		} catch(err) {
			console.error(`Failed to save user account: ${err}`);
		}
	}

	render() {
		return(
			<Formik
				validationSchema={this.schema}
				onSubmit={this.onSubmit}
				validateOnBlur={true}
				validateOnChange={true}
				initialValues={{
                    userName: this.state.initialValues.userName,
                    emailAddress: this.state.initialValues.emailAddress,
                    password: "",
                    confirmPassword: ""
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isValid
				}) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group controlId="validationFormikFrom">
							<Form.Label>User Name:</Form.Label>
							{this.props.editAccount && 
								<Form.Control
									name="userName"
									value={values.userName}
									readOnly/>}
							{!this.props.editAccount && 
								<Form.Control
									name="userName"
									type="text"
									value={values.userName}
									onChange={handleChange}
									onBlur={handleBlur}
									isInvalid={touched.userName && !!errors.from}
									isValid={touched.userName && !errors.from}/>
							}
							<Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">{errors.userName}</Form.Control.Feedback>
						</Form.Group>
                        {(this.props.newAccount || this.props.editAccount) &&
                            <Form.Group controlId="validationFormikEmailAddress">
                                <Form.Label>Email Address:</Form.Label>
                                <Form.Control
                                    name="emailAddress"
                                    type="email"
                                    value={values.emailAddress}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.emailAddress && !!errors.emailAddress}
                                    isValid={touched.emailAddress && !errors.emailAddress}/>
                                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">{errors.emailAddress}</Form.Control.Feedback>
                            </Form.Group>}
						<Form.Group controlId="validationFormikPassword">
							<Form.Label>Password:</Form.Label>
							<Form.Control
								name="password"
								type="password"
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
								isInvalid={touched.password && !!errors.password}
								isValid={touched.password && !errors.password}/>
							<Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
						</Form.Group>
						{(this.props.newAccount || this.props.editAccount) &&
							<Form.Group controlId="validationFormikConfirmPassword">
								<Form.Label>Confirm Password:</Form.Label>
								<Form.Control
									name="confirmPassword"
									type="password"
									value={values.confirmPassword}
									onChange={handleChange}
									onBlur={handleBlur}
									isInvalid={touched.confirmPassword && !!errors.confirmPassword}
									isValid={touched.confirmPassword && !errors.confirmPassword}/>
								<Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
							</Form.Group>
						}
						{this.props.newAccount && <Button type="submit">Sign Up</Button>}
						{this.props.editAccount && <Button type="submit">Update Account</Button>}
						{(!this.props.newAccount && !this.props.editAccount) && <Button type="submit">Login</Button>}
					</Form>
				)}
			</Formik>
		);
	}
}

export default AccountForm;