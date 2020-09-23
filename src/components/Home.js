import React, {Component} from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import '../style/Home.css';
import me from '../media/me.jpg';
import Resume from './Resume';

class Home extends Component{
	render(){
		return(
			<Container>
				<Row>
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
				</Row>
				<Row style={{'marginTop': '40px', 'marginBottom': '40px'}}>
					<Resume></Resume>
				</Row>
			</Container>
		);
	}
}

export default Home;
