import React, {Component} from 'react';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import '../style/Home.css';
import me from '../media/pic.JPG';
import resume from '../media/Resume.JPG'

class Home extends Component{
	render(){
		return(
			<Container fluid>
				<Row>
					<Col>
						<Card border="dark">
							<Card.Img variant="top" src={me}/>
							<Card.Body>
								<Card.Title>Welcome</Card.Title>
								<Card.Text>
									My name is James Todd, and this is my personal website. I am a programmer specializing in Fullstack web development. 
									For samples of my work, visit the Projects tab. For business inquiries visit the Contact tab.
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Image style = {{border: "1px solid black"}} src={resume}/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Home;
