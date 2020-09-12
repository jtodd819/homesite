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
				<Nav.Link href="/contact"><i className='fa fa-envelope-square icon'/></Nav.Link>
				<Nav.Link href="https://linkedin.com/in/james-todd-827069144"><i className='fa fa-linkedin-square icon'/></Nav.Link>
				<Nav.Link href="https://github.com/jtodd819"><i className='fa fa-github-square icon'/></Nav.Link>
			</Navbar>
		);
	}
}
export default Bar;
