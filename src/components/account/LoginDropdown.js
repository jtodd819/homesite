import React, {Component} from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import AccountForm from './AccountForm';

class LoginDropdown extends Component {

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
            <>
                <Dropdown style={{textAlign: "right"}}>
                    <Dropdown.Toggle variant="info">Log In</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.handleLoginOpen}>Sign in to Existing Account</Dropdown.Item>
                        <Dropdown.Item onClick={this.handleSignUpOpen}>Create New Account</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        {this.state.newAccount && <Modal.Title>Create A New Account</Modal.Title>}
                        {!this.state.newAccount && <Modal.Title>Sign In</Modal.Title>}
                    </Modal.Header>
                    <Modal.Body>
                        <AccountForm newAccount={this.state.newAccount} onSubmit={this.handleLogin}/>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default LoginDropdown;