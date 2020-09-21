import React, { Component } from 'react';
import FireForm from './FireForm';
import FireGraph from './FireGraph';
import { Container, Row } from 'react-bootstrap';

class FireCalculator extends Component {

    render() {
        return (
            <Container fluid>
                <Row>
                    <FireForm/>
                </Row>
                <Row>
                    <FireGraph/>
                </Row>
            </Container>
        )
    }
}

export default FireCalculator;