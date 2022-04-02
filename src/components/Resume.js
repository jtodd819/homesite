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
						Box Inc.
					</Col>
					<Col className="header-column">
						Software Engineer
					</Col>
					<Col className="header-column">
						January 2021 -- Present
					</Col>
				</Row>
				<Row>
					<ListGroup variant="flush">
						<ListGroup.Item>
							Built File Request Dashboard experience for administrators to manage File Requests of users within their enterprise.
						</ListGroup.Item>
						<ListGroup.Item>
							Developed Scheduled Trigger workflow feature to automatically execute user defined automations on defined schedules.
						</ListGroup.Item>
						<ListGroup.Item>
							Enhanced Box Workflow feature packaging by refactoring services to accept configuration driven sets of available features for each user.
						</ListGroup.Item>
					</ListGroup>
				</Row>
				<Row>
					<Col className="header-column">
						Antage Inc.
					</Col>
					<Col className="header-column">
						Software Engineer
					</Col>
					<Col className="header-column">
						April 2018 -- January 2021
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
							B.S. in Computer Science, 4.0 GPA, Graduated 2018
						</ListGroup.Item>
					</ListGroup>
				</Row>
				<Row>
					<Col className="header-column">
						University of North Carolina, Graduated 2016
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
					Personal Projects	
				</Row>
				<Row>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<a href={this.state.website}>{this.state.website}</a>
							<ListGroup variant="flush">
								<ListGroup.Item>
									Single Page ReactJS Web App
								</ListGroup.Item>
								<ListGroup.Item>
									Java SpringBoot Rest API connected to PostgreSQL Database
								</ListGroup.Item>
							</ListGroup>
						</ListGroup.Item>
						<ListGroup.Item>
							Projects on Site: Workout Planner, Financial Independence Calculator
						</ListGroup.Item>
					</ListGroup>
				</Row>
				<Row className="title-row">
					Languages and Technologies
				</Row>
				<Row>
					<ListGroup variant="flush">
						<ListGroup.Item>
							JavaScript, Python, Java, SQL, MongoDB, HTML, CSS
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
