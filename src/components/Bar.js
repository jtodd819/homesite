import React, {Component} from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../style/Bar.css';

//Navbar with links to each page on the site
class Bar extends Component{
	render() {
		return (
			<Navbar className='bar'>
				<Nav className='bg-light'>	
					<NavItem>
						<NavLink exact to='/' activeStyle={{fontWeight: 'bold', color: 'red'}}>Home</NavLink>
					</NavItem>
					<NavItem>
						<NavLink to='/projects' activeStyle={{fontWeight: 'bold', color: 'red'}}>Projects</NavLink>
					</NavItem>
					<NavItem>
						<NavLink exact to='/resume' activeStyle={{fontWeight: 'bold', color: 'red'}}>Resume</NavLink>
					</NavItem>
					<NavItem>
						<NavLink exact to='/contact' activeStyle={{fontWeight: 'bold', color: 'red'}}>Contact</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
		);
	}
}
export default Bar;
