import React, { Component } from 'react';
import FireForm from './FireForm';
import FireGraph from './FireGraph';
import { Container, Row } from 'react-bootstrap';

class FireCalculator extends Component {

    constructor(props) {
        super(props);
        this.state = { fireNumber: null, yearsUntilFire: null};
        this.calculateFire = this.calculateFire.bind(this);
    }

    calculateFire(values) {
        const fireNumber = values['afterExpenses'] * 25 * (values['period'] === 'month' ? 12 : 1);
        const savingsRate = values['investmentPer'] / values['netIncome'];
        const compoundingRate = values['annualReturnRate'] / 100;
        let yearsUntilFire = Math.log(((fireNumber - values['assets']) * compoundingRate / savingsRate) + 1) / Math.log(1 + compoundingRate);
        yearsUntilFire = yearsUntilFire < 0 ? yearsUntilFire : 0;
        this.setState({yearsUntilFire: yearsUntilFire, fireNumber: fireNumber});
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <FireForm onSubmit={this.calculateFire}/>
                </Row>
                <Row>
                {this.state.fireNumber && this.state.timeToFire && <FireGraph fireNumber={this.state.fireNumber} timeToFire={this.state.timeToFire}/>}
                </Row>
            </Container>
        )
    }
}

export default FireCalculator;