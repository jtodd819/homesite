import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../style/Bar.css';

//Navbar with links to each page on the site
class Bar extends Component{
	render() {
		return (
			<Navbar className='bar'>
				<Nav className='bg-light'>	
					<LinkContainer exact to='/' activeStyle={{fontWeight: 'bold', backgroundColor: '#073642'}}>
						<NavItem>Home</NavItem>
					</LinkContainer>
					<LinkContainer to='/projects' activeStyle={{fontWeight: 'bold', backgroundColor: '#073642'}}>
						<NavItem>Projects</NavItem>
					</LinkContainer>
					<LinkContainer exact to='/resume' activeStyle={{fontWeight: 'bold', backgroundColor: '#073642'}}>
						<NavItem>Resume</NavItem>
					</LinkContainer>
					<LinkContainer exact to='/contact' activeStyle={{fontWeight: 'bold', backgroundColor: '#073642'}}>
						<NavItem>Contact</NavItem>
					</LinkContainer>
				</Nav>
			</Navbar>
		);
	}
}
export default Bar;
