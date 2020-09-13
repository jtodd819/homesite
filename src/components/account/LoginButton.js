import React, {Component} from 'react';
import { Button, Modal} from 'react-bootstrap';
import LoginForm from './LoginForm';

class LoginButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    /**
     * Handlers for login form modal state
     */

    handleOpen() {
        this.setState({showModal: true})
    }

    handleClose() {
        this.setState({showModal: false})
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
                <Button onClick={this.handleOpen}>Sign Up / Login</Button>
				<Modal show={this.state.showModal} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Create a new account or sign in to an existing account</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<LoginForm onLogin={this.handleLogin}/>
					</Modal.Body>
				</Modal>
            </>
        )
    }
}

export default LoginButton;