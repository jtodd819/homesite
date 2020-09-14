import React, {Component} from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import AccountForm from './AccountForm';

class UserBar extends Component {

    constructor(props) {
        super(props);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
        this.handleEditSave = this.handleEditSave.bind(this);
        this.state = {
            showModal: false
        }
    }

    /**
     * Handlers for edit account modal state
     */
    
    handleEditOpen() {
        this.setState({showModal: true})
    }

    handleEditClose() {
        this.setState({showModal: false})
    }

    /**
     * Handler for updating a user
     * @param {*} user updated user
     */
    handleEditSave(user) {
        this.setState({showModal: false});
        this.props.onUpdate(user);
    }

    render() {
        return(
            <Container fluid>
                <Row>
                    <Col>
                        Welcome {this.props.user.userName}!
                    </Col>
                    <Col>
                        <Button onClick={this.handleEditOpen}>Edit Account</Button>
                    </Col>
                    <Col>
                        <Button variant="danger" onClick={this.props.onLogout}>Logout</Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.handleEditClose}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AccountForm editAccount={this.props.user} onSubmit={this.handleEditSave}/>
                    </Modal.Body>
                </Modal>
            </Container>
        )
    }
}

export default UserBar;