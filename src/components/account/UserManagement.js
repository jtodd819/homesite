import React, {Component} from 'react';
import LoginButtons from './LoginButtons';
import UserBar from './UserBar';

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
	}


	render() {
		const isLoggedIn = !!this.props.user;
		let managementComponent;
		if (isLoggedIn) {
			managementComponent = <UserBar user={this.props.user} onUpdate={this.handleUser} onLogout={this.handleLogout}/>
		} else {
			managementComponent = <LoginButtons onLogin={this.handleUser}/>
		}
		return(managementComponent);
	}
}

export default UserManagement;
