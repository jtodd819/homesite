import React, { Component } from 'react';
import { Formik } from 'formik';
import { Form, Button }  from 'react-bootstrap';
import * as Yup from 'yup';

//a form for adding workouts to the table 
class WorkoutForm extends Component{
	constructor(props){
		super(props);
		this.schema = this.getFormSchema.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			initialValues: this.props.exercise ? this.props.exercise : {name: '', isWeighted: true, max: 10}
		};	
	}

	/**
	 * Sets up Yup form schema for validation
	 */
	getFormSchema() {
		return Yup.object().shape({
			name: Yup.string()
				.max(50, 'Too Long!')
				.required('Required'),
			isWeighted: Yup.boolean(),
			max: Yup.number()
				.positive('Only Positive Values Allowed!')
				.required('Required')
		});
	}

	/**
	 * Submission handler for Formik form
	 * @param {*} values values coming from form
	 */
	onSubmit(values) {
		// If editing pass back ID
		if (this.props.exercise && this.props.exercise.id) {
			Object.assign(values, {id: this.props.exercise.id});
		}
		this.props.save(values);
	}
	
	render(){
		return(
			<Formik
				validationSchema={this.schema}
				onSubmit={this.onSubmit}
				validateOnBlur={true}
				validateOnChange={true}
				initialValues={{
					name: this.state.initialValues.name,
					isWeighted: this.state.initialValues.isWeighted,
					max: this.state.initialValues.max
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
						<Form.Group controlId="validationFormikName">
							<Form.Label>Exercise Name:</Form.Label>
							<Form.Control
								name="name"
								type="text"
								value={values.name}
								onChange={handleChange}
								onBlur={handleBlur}
								isInvalid={touched.name && !!errors.name}
								isValid={touched.name && !errors.name}/>
							<Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="validationFormikIsWeighted">
							<Form.Check
								label="Is the exercise weighted?"
								name="isWeighted"
								type="checkbox"
								onChange={handleChange}
								value={values.isWeighted}
							/>
						</Form.Group>
						<Form.Group controlId="validationFormikMax">
							{values.isWeighted && <Form.Label>One Rep Max (lbs):</Form.Label>}
							{!values.isWeighted && <Form.Label>Maximum Rep Count:</Form.Label>}
							<Form.Control
								name="max"
								type="number"
								value={values.max}
								onChange={handleChange}
								onBlur={handleBlur}
								isInvalid={touched.max && !!errors.max}
								isValid={touched.max && !errors.max}/>
							<Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">{errors.max}</Form.Control.Feedback>
						</Form.Group>
						{!this.props.exercise && <Button type="submit">Add Exercise</Button>}
						{this.props.exercise && <Button type="submit">Update Exercise</Button>}
					</Form>
				)}
			</Formik>
		);
	}
}

export default WorkoutForm;
