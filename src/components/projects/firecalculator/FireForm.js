import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import  { Formik } from 'formik';
import * as Yup from 'yup';

class FireForm extends Component {

    constructor(props) {
        super(props);
        this.schema = this.getFormSchema.bind(this);
    }

	/**
	 * Sets up Yup form schema for validation
	 */
	getFormSchema() {
		return Yup.object().shape({
			period: Yup.string().required('Please choose a period to use for entering values.').default('month'),
            netIncome: Yup.number()
                .default(0)
                .required(`Please enter your net income per ${this.parent.period}.`)
				.min(0, 'Please enter a non-negative value for your net income.'),
            currentExpenses: Yup.number()
                .default(0)
                .required(`Please enter your current expenses per ${this.parent.period}.`)
				.min(0, 'Please enter a non-negative value for your current expenses.'),
            assets: Yup.number()
                .default(0)
                .required(`Please enter your current assets.`)
				.min(0, 'Please enter a non-negative value for your assets.'),
            afterExpenses: Yup.number()
                .default(0)
                .required(`Please enter your expected expenses per ${this.parent.period} after independence.`)
				.min(0, `Please enter a non-negative value for your expected expenses per ${this.parent.period} after independence.`),
            investmentPer: Yup.number()
                .default(0)
                .required(`Please enter your investment per ${this.parent.period}.`)
                .min(0, `Please enter a non-negative value for your investment per ${this.parent.period}.`),
            withdrawalRate: Yup.number()
                .default(4)
                .required('Please enter your withdrawal rate percentage per year.')
                .min(0, 'Please enter a non-negative value for your withdrawl rate percentage per year.')
		});
	}

	render(){
		return(
			<Formik
				validationSchema={this.schema}
				onSubmit={this.props.onSubmit}
				validateOnBlur={true}
				validateOnChange={true}
			>
				{({
					values,
					dirty,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isValid
				}) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group controlId="validationFormikPeriod">
							<Form.Label>From:</Form.Label>
							<Form.Control
								name="from"
								type="text"
								value={dirty ? values.from : userEmail}
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

export default FireForm;