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
			period: Yup.string().required('Please choose a period to use for entering values.'),
            netIncome: Yup.number()
                .required('Please enter your net income.')
				.min(0, 'Please enter a non-negative value for your net income.'),
            assets: Yup.number()
                .required('Please enter your current assets.'),
            afterExpenses: Yup.number()
                .required('Please enter your expected expense after independence.')
				.min(0, 'Please enter a non-negative value for your expected expenses after independence.'),
            investmentPer: Yup.number()
				.required('Please enter your investment.')
				.lessThan(Yup.ref('netIncome'), 'Nice try. You cannot invest more than you make.')
                .min(0, 'Please enter a non-negative value for your investment.'),
            annualReturnRate: Yup.number()
                .required('Please enter your expected annual return rate percentage.')
                .min(0, 'Please enter a non-negative value for your expected annual return rate percentage.'),
            annualInflationRate: Yup.number()
                .required('Please enter the expected annual inflation rate percentage.')
                .min(0, 'Please enter a non-negative value for the expected annual inflation rate percentage.'),
            annualWithdrawalRate: Yup.number()
                .required('Please enter your expected annual withdrawal rate percentage.')
                .min(0, 'Please enter a non-negative value for your expected annual withdrawal rate percentage.')
		});
	}

	render(){
		return(
			<Formik
				validationSchema={this.schema}
				onSubmit={this.props.onSubmit}
				validateOnBlur={true}
				validateOnChange={true}
				initialValues={{
					period: 'month',
					netIncome: 0,
					assets:0,
					afterExpenses: 0,
					investmentPer: 0,
					annualReturnRate: 10,
					annualInflationRate: 2,
					annualWithdrawalRate:4
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
						<Form.Group controlId="validationFormikPeriod">
							<Form.Label>Which time period would you like to input values for?</Form.Label>
							<Form.Control
								name="period"
								as="select"
								value={values.period}
								onChange={handleChange}
								onBlur={handleBlur}
								isInvalid={touched.period && !!errors.period}
								isValid={touched.period && !errors.period}>
							<option value="month">Month</option>
							<option value="year">Year</option>
							</Form.Control>
							<Form.Control.Feedback type="invalid">{errors.from}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="validationFormikNetIncome">
							<Form.Label>What is your net income per {values.period}?</Form.Label>
							<Form.Control
								name="netIncome"
								type="number"
								value={values.netIncome}
								onChange={handleChange}
								onBlur={handleBlur}
								isInvalid={touched.netIncome && !!errors.netIncome}
								isValid={touched.netIncome && !errors.netIncome}/>
							<Form.Control.Feedback type="invalid">{errors.netIncome}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="validationFormikAfterExpenses">
							<Form.Label>What are your expected expenses after independence per {values.period}?</Form.Label>
							<Form.Control
								name="afterExpenses"
								type="number"
								value={values.afterExpenses}
								onChange={handleChange}
								onBlur={handleBlur}
								isInvalid={touched.afterExpenses && !!errors.afterExpenses}
								isValid={touched.afterExpenses && !errors.afterExpenses}/>
							<Form.Control.Feedback type="invalid">{errors.afterExpenses}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="validationFormikInvestmentPer">
							<Form.Label>How much will you invest per {values.period}?</Form.Label>
							<Form.Control
								name="investmentPer"
								type="number"
								value={values.investmentPer}
								onChange={handleChange}
								onBlur={handleBlur}
								isInvalid={touched.investmentPer && !!errors.investmentPer}
								isValid={touched.investmentPer && !errors.investmentPer}/>
							<Form.Control.Feedback type="invalid">{errors.investmentPer}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="validationFormikAssets">
							<Form.Label>How much are your current assets worth?</Form.Label>
							<Form.Control
								name="assets"
								type="number"
								value={values.assets}
								onChange={handleChange}
								onBlur={handleBlur}
								isInvalid={touched.assets && !!errors.assets}
								isValid={touched.assets && !errors.assets}/>
							<Form.Control.Feedback type="invalid">{errors.assets}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="validationFormikAnnualWithdrawalRate">
							<Form.Label>What percent of your assets do you intend to withdraw per year after independence?</Form.Label>
							<Form.Control
								name="annualWithdrawalRate"
								type="number"
								value={values.annualWithdrawalRate}
								onChange={handleChange}
								onBlur={handleBlur}
								isInvalid={touched.annualWithdrawalRate && !!errors.annualWithdrawalRate}
								isValid={touched.annualWithdrawalRate && !errors.annualWithdrawalRate}/>
							<Form.Control.Feedback type="invalid">{errors.annualWithdrawalRate}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="validationFormikAnnualInflationRate">
							<Form.Label>What do you expect the inflation rate percentage will be per year?</Form.Label>
							<Form.Control
								name="annualInflationRate"
								type="number"
								value={values.annualInflationRate}
								onChange={handleChange}
								onBlur={handleBlur}
								isInvalid={touched.annualInflationRate && !!errors.annualInflationRate}
								isValid={touched.annualInflationRate && !errors.annualInflationRate}/>
							<Form.Control.Feedback type="invalid">{errors.annualInflationRate}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="validationFormikAnnualReturnRate">
							<Form.Label>What is your expected perecent return rate per year on your assets?</Form.Label>
							<Form.Control
								name="annualReturnRate"
								type="number"
								value={values.annualReturnRate}
								onChange={handleChange}
								onBlur={handleBlur}
								isInvalid={touched.annualReturnRate && !!errors.annualReturnRate}
								isValid={touched.annualReturnRate && !errors.annualReturnRate}/>
							<Form.Control.Feedback type="invalid">{errors.annualReturnRate}</Form.Control.Feedback>
						</Form.Group>
						<Button type="submit">Calculate</Button>
					</Form>
				)}
			</Formik>
		);
	}
}

export default FireForm;