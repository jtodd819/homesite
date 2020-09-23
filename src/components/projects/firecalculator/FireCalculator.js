import React, { Component } from 'react';
import FireForm from './FireForm';
import FireGraph from './FireGraph';
import { Container, Row, Col, Card } from 'react-bootstrap';

class FireCalculator extends Component {

    constructor(props) {
        super(props);
        this.state = {fireNumber: 0, yearsUntilFire: 0};
        this.calculateFire = this.calculateFire.bind(this);
    }

    calculateFire(values) {
        const yearlyExpenses = values['afterExpenses'] * (values['period'] === 'month' ? 12 : 1);
        const fireNumber = yearlyExpenses * 25;
        const marketReturnRate = (values['annualReturnRate'] - values['annualInflationRate']) / 100;
        const annnualSavingsRate = values['investmentPer']  / values['netIncome'];
        const yearlyIncome = values['netIncome'] * (values['period'] === 'month' ? 12  : 1);
        const annualWithdrawalRate = values['annualWithdrawalRate'] / 100;
        const netWorth = values['assets'];
        const divisorDivisor = (yearlyIncome * ((marketReturnRate * -Math.abs(annnualSavingsRate)) + marketReturnRate + (annnualSavingsRate * annualWithdrawalRate)));
        const divisorDividend = annualWithdrawalRate * ((yearlyIncome * annnualSavingsRate) + (netWorth * marketReturnRate));
        const yearEquationDivisor = Math.log(divisorDivisor / divisorDividend);
        const yearEquationDividend =  Math.log(marketReturnRate + 1);
        let yearsUntilFire = yearEquationDivisor / yearEquationDividend;
        yearsUntilFire = Math.round(yearsUntilFire * 10) / 10;
        this.setState({yearsUntilFire: yearsUntilFire, fireNumber: fireNumber, showGraph: true});
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
                            <FireGraph fireNumber={this.state.fireNumber} yearsUntilFire={this.state.yearsUntilFire}/>
                        </Row>
                        <Row >
                            <Card border='info' text='dark' className='mb-2'>
                                <a style={{color: 'blue'}} href="https://en.wikipedia.org/wiki/Financial_independence">What is Financial Independence?</a>
                                Financial Independence number is calculated from expected yearly expenses multiplied by 25.<br/>
                                This information is private and not saved or sent anywhere.
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default FireCalculator;