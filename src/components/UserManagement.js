import React, {Component} from 'react';
import LoginButton from './LoginButton';
import UserBar from './UserBar';

class UserManagement extends Component {

	constructor(props) {
		super(props)
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogin(user) {
		this.props.setUser(user);
	}
	
	handleLogout() {
		this.props.setUser(null);
	}

	render() {
		const isLoggedIn = !!this.props.user;
		let managementComponent;
		if (isLoggedIn) {
			managementComponent = <UserBar onLogout={this.handleLogout}/>
		} else {
		   managementComponent = <LoginButton onLogin={this.handleLogin}/>
		}
		return({managementComponent});
	}
}

export default UserManagement;
