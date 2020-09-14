import React, {Component} from 'react';
import { Button, Col, Container, Row, Modal } from 'react-bootstrap';
import AccountForm from './AccountForm';

class LoginButtons extends Component {

    constructor(props) {
        super(props);
        this.handleLoginOpen = this.handleLoginOpen.bind(this);
        this.handleSignUpOpen = this.handleSignUpOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            showModal: false,
            newAccount: false
        };
    }

    /**
     * Handlers for login form modal state
     */

    handleLoginOpen() {
        this.setState({showModal: true, newAccount: false});
    }

    handleSignUpOpen() {
        this.setState({showModal: true, newAccount: true});
    }

    handleClose() {
        this.setState({showModal: false, newAccount: false});
    }

    /**
     * Handler to receive logged in user from login form
     * @param {*} user Logged in user
     */
    handleLogin(user) {
        this.handleClose();
        this.props.onLogin(user);
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col>
                        <Button onClick={this.handleSignUpOpen}>Sign Up</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.handleLoginOpen}>Login</Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        {this.state.newAccount && <Modal.Title>Create A New Account</Modal.Title>}
                        {!this.state.newAccount && <Modal.Title>Sign In</Modal.Title>}
                    </Modal.Header>
                    <Modal.Body>
                        <AccountForm newAccount={this.state.newAccount} onSubmit={this.handleLogin}/>
                    </Modal.Body>
                </Modal>
            </Container>
        )
    }
}

export default LoginButtons;