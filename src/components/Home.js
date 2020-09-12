import React, {Component} from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import '../style/Home.css';
import me from '../media/pic.JPG';
import Resume from './Resume';

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
									For samples of my work, visit the Projects tab. For business inquiries, click on the mail or other social media icons.
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Resume></Resume>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Home;
