import React, {Component} from 'react';
import LoginDropdown from './LoginDropdown';
import UserDropdown from './UserDropdown';
import { NotificationManager } from 'react-notifications';

class UserManagement extends Component {

	constructor(props) {
		super(props)
		this.handleUser = this.handleUser.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	/**
	 * Callback to handler login and user update events
	 * @param {*} user new or updated user to set
	 */
	handleUser(user) {
		this.props.setUser(user);
	}

	/**
	 * Callback to logout the current user
	 */
	handleLogout() {
		this.props.setUser(null);
		NotificationManager.success('Your account has been logged out.', 'Logged Out', 3000);
	}


	render() {
		const isLoggedIn = !!this.props.user;
		let managementComponent;
		if (isLoggedIn) {
			managementComponent = <UserDropdown user={this.props.user} onUpdate={this.handleUser} onLogout={this.handleLogout}/>
		} else {
			managementComponent = <LoginDropdown onLogin={this.handleUser}/>
		}
		return(managementComponent);
	}
}

export default UserManagement;
