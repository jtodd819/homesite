import React, {Component} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

class UserBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container fluid>
                <Row>
                    <Col>
                        Welcome {this.props.user.userName}!
                    </Col>
                    <Col>
                        <Button>Edit Account</Button>
                    </Col>
                    <Col>
                        <Button variant="danger" onClick={this.props.OnLogout}>Logout</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default UserBar;