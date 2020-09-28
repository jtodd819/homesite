import React, { Component } from 'react';
import FireForm from './FireForm';
import FireGraph from './FireGraph';
import { Container, Row, Col, Card } from 'react-bootstrap';

class FireCalculator extends Component {

    constructor(props) {
        super(props);
        this.state = {fireNumber: 0, yearsUntilFire: 0, netWorths: [0]};
        this.calculateFire = this.calculateFire.bind(this);
        this.netWorthEachYear = this.netWorthEachYear.bind(this);
    }

    /**
     * Calculates the net worth at each year until financial indpendence
     * @param {*} numberOfYears How long until financial independence
     * @param {*} marketRateOfReturn Market annual return rate on investment
     * @param {*} annualSavings How much will you save per year
     * @param {*} currentSavings How much have you currently saved
     */
    netWorthEachYear(numberOfYears, marketRateOfReturn, annualSavings, currentSavings) {
        const valuesAtYear = [currentSavings];
        for (let i = 1; i < numberOfYears; i++) {
            const compoundValue = currentSavings * Math.pow(1 + marketRateOfReturn, i);
            const annuityValue = annualSavings * ((Math.pow(1 + marketRateOfReturn, i) - 1) / marketRateOfReturn);
            valuesAtYear.push(parseInt(compoundValue + annuityValue, 10));
        }
        const lastCompoundValue = currentSavings * Math.pow(1 + marketRateOfReturn, numberOfYears);
        const lastAnnuityValue = annualSavings * ((Math.pow(1 + marketRateOfReturn, numberOfYears) - 1) / marketRateOfReturn);
        valuesAtYear.push(parseInt(lastCompoundValue + lastAnnuityValue, 10));
        return valuesAtYear;
    }

    /**
     * Calculates fire number and years until fire
     * @param {*} values form input values for calculation
     */
    calculateFire(values) {
        const marketReturnRate = (values['annualReturnRate'] - values['annualInflationRate']) / 100;
        const annnualSavingsRate = values['investmentPer']  / values['netIncome'];
        const yearlyIncome = values['netIncome'] * (values['period'] === 'month' ? 12  : 1);
        const yearlyExpenses = yearlyIncome - (annnualSavingsRate * yearlyIncome);
        const fireNumber = yearlyExpenses * 25;
        const annualWithdrawalRate = values['annualWithdrawalRate'] / 100;
        const netWorth = values['assets'];
        const divisorDivisor = (yearlyIncome * ((marketReturnRate * -Math.abs(annnualSavingsRate)) + marketReturnRate + (annnualSavingsRate * annualWithdrawalRate)));
        const divisorDividend = annualWithdrawalRate * ((yearlyIncome * annnualSavingsRate) + (netWorth * marketReturnRate));
        const yearEquationDivisor = Math.log(divisorDivisor / divisorDividend);
        const yearEquationDividend =  Math.log(marketReturnRate + 1);
        let yearsUntilFire = yearEquationDivisor / yearEquationDividend;
        const netWorths = this.netWorthEachYear(yearsUntilFire, marketReturnRate, yearlyIncome - yearlyExpenses, netWorth);
        yearsUntilFire = Math.round(yearsUntilFire * 10) / 10;
        this.setState({yearsUntilFire: yearsUntilFire, fireNumber: fireNumber, netWorths: netWorths});
    }

    render() {
        return (
            <Container>
                <h1>Financial Independence Calculator</h1>
                <Row>
                    <Col>
                        <FireForm onSubmit={this.calculateFire}/>
                    </Col>
                    <Col style={{'marginTop': '40px', 'marginBottom': '40px'}}>
                        <Row>
                            <FireGraph fireNumber={this.state.fireNumber} netWorths={this.state.netWorths} yearsUntilFire={this.state.yearsUntilFire}/>
                        </Row>
                        <Row >
                            <Card border='info' text='dark' className='mb-2'>
                                <a style={{color: 'blue'}} href="https://en.wikipedia.org/wiki/Financial_independence">What is Financial Independence?</a>
                                Assumptions
                                <ul>
                                    <li>Financial Independence number is calculated from yearly expenses multiplied by 25.</li>
                                    <li>Yearly expenses are calculated by subtracting current investments per year from current net income.</li>
                                </ul>
                                <em>This information is private and not saved or sent anywhere.</em>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default FireCalculator;