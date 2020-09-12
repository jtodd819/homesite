import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import '../style/Bar.css';

//Navbar with links to each page on the site
class Bar extends Component{
	render() {
		return (
			<Navbar className="bar">
				<Navbar.Brand href="/home">Home</Navbar.Brand>
				<NavDropdown title="Projects">
					<NavDropdown.Item href="/projects/workoutplanner">5/3/1 Workout Planner</NavDropdown.Item>
					<NavDropdown.Item href="/projects/my-recipes">My Recipes</NavDropdown.Item>
					<NavDropdown.Item href="/projects/small-shell">Small Shell</NavDropdown.Item>
				</NavDropdown>
				<Nav.Link href="/contact"><i className='fa fa-envelope-square icon'/></Nav.Link>
				<Nav.Link href="https://linkedin.com/in/james-todd-827069144"><i className='fa fa-linkedin-square icon'/></Nav.Link>
				<Nav.Link href="https://github.com/jtodd819"><i className='fa fa-github-square icon'/></Nav.Link>
			</Navbar>
		);
	}
}
export default Bar;
