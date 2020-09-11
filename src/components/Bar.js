import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../style/Bar.css';

//Navbar with links to each page on the site
class Bar extends Component{
	render() {
		return (
			<Navbar className="bar">
				<Navbar.Brand href="/home">Home</Navbar.Brand>
				<Nav.Link href="/projects">Projects</Nav.Link>
				<Nav.Link href="/contact">Contact</Nav.Link>
				<Nav.Link href="https://github.com/jtodd819"><i className='fa fa-github icon'/></Nav.Link>
			</Navbar>
		);
	}
}
export default Bar;
