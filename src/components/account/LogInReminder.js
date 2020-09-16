import React, {Component} from 'react';
import { Alert } from 'react-bootstrap';

class LoginReminder extends Component {

    render() {
        return (
            <Alert variant="warning">
                In order to use the {this.props.title}, please sign in using the log in button in the upper right hand corner of the page.
            </Alert>
        )
    }
}

export default LoginReminder;