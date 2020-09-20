import React, {Component} from 'react';
import { Modal, Dropdown } from 'react-bootstrap';
import AccountForm from './AccountForm';

class UserDropdown extends Component {

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
            <>
                <Dropdown style={{textAlign: "right"}}>
                    <Dropdown.Toggle variant="success">{this.props.user.userName}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.handleEditOpen}>Edit Account</Dropdown.Item>
                        <Dropdown.Item onClick={this.props.onLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Modal show={this.state.showModal} onHide={this.handleEditClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Account Settings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AccountForm editAccount={this.props.user} onSubmit={this.handleEditSave}/>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default UserDropdown;