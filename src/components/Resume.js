import React, {Component} from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import '../style/Resume.css';

class Resume extends Component{

	constructor(props) {
		super(props);
		this.state = {website: 'https://james-todd.net', resumeLink: '/resume/resume.docx'};
	}

	render() {
		return (
			<Container>
				<Row className="resume-title">
					Resume
				</Row>
				<Row className="title-row">
					Employment		
				</Row>
				<Row>
					<Col className="header-column">
						Antage Inc.
					</Col>
					<Col className="header-column">
						Software Engineer
					</Col>
					<Col className="header-column">
						April 2018 -- Present
					</Col>
				</Row>
				<Row>
					<ListGroup variant="flush">
						<ListGroup.Item>
							Developed frontend and backend for a website used by thousands of users to gather and manage 
							construction data from the field.
						</ListGroup.Item>
						<ListGroup.Item>
							Integrated website frontend with new services for sending and receiving 
							user data by building a RESTful HTTP API for communicating with AMQP services across the enterprise.
						</ListGroup.Item>
						<ListGroup.Item>
							Built standard process for users to gather and submit construction data 
							through the website by developing a configuration driven, reusable survey submission UI.
						</ListGroup.Item>
						<ListGroup.Item>
							Enhanced process for users to submit data by implementing a state management system which allowed the user to manage their data 
							at multiple stages in the submission process before the data was saved to our system.
						</ListGroup.Item>
					</ListGroup>
				</Row>
				<Row className="title-row">
					Education
				</Row>
				<Row>
					<Col className="header-column">
						Oregon State University
					</Col>
					<Col className="header-column">
						Corvallis, OR
					</Col>
					<Col className="header-column">
						2016 -- 2018
					</Col>
				</Row>
				<Row>
					<ListGroup variant="flush"> 
						<ListGroup.Item>
							B.S. in Computer Science, 4.0 GPA
						</ListGroup.Item>
					</ListGroup>
				</Row>
				<Row>
					<Col className="header-column">
						University of North Carolina
					</Col>
					<Col className="header-column">
						Chapel Hill, NC
					</Col>
					<Col className="header-column">
						2012 -- 2016
					</Col>
				</Row>
				<Row>
					<ListGroup variant="flush">
						<ListGroup.Item>
							B.A. in Philsophy, 3.56 GPA
						</ListGroup.Item>
					</ListGroup>
				</Row>
				<Row className="title-row">
					Technical Experience
				</Row>
				<Row>
					<Col className="header-column">
						Personal Website
					</Col>
					<Col className="header-column">
						<a href={this.state.website}>{this.state.website}</a>
					</Col>
				</Row>
				<Row>
					<ListGroup variant="flush">
						<ListGroup.Item>
							Single Page ReactJS Web App	
						</ListGroup.Item>
						<ListGroup.Item>
							Java Spring Boot Rest API Server connected to PostgreSQL Database
						</ListGroup.Item>
						<ListGroup.Item>
							Projects on Site: Workout Planner, My Recipes, Small Shell
						</ListGroup.Item>
					</ListGroup>
				</Row>
				<Row className="title-row">
					Languages and Technologies
				</Row>
				<Row>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<em>Proficient</em>: JavaScript, Python, HTML, CSS, MongoDB
						</ListGroup.Item>
						<ListGroup.Item>
							<em>Hobbyist</em>: Java, PostgreSQL
						</ListGroup.Item>
					</ListGroup>
				</Row>
				<Row className="justify-content-md-center">
					<Button href={this.state.resumeLink}>Download</Button>
				</Row>
			</Container>
		);
	}
}

export default Resume;
