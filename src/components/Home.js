import React, {Component} from 'react';
import { Image} from 'react-bootstrap';
import '../style/Home.css';
import me from '../media/pic.JPG';

class Home extends Component{
	render(){
		return(
			<div className='home'>
				<h1>Welcome!</h1>
				<p className='text-info'>My name is James Todd, and this is my personal website.<br/>
				I am a programmer specializing in full stack web development.<br/>
				For samples of my work, visit the Projects tab. <br/>
				To access my complete Resume, visit the Resume tab.<br/>
				For business inquiries, visit the Contact tab and submit a form or use the mail link below my picture.</p> 
				<div style={{width: 450, height: 'auto', margin: 'auto'}}>
					<Image src={me} responsive thumbnail/>
				</div>
				<div className='alert-info text-white' style={{width: 300, height: 'auto', margin:'auto'}}>
					<a href='https://github.com/jtodd819'><i className='fa fa-github'/> </a>
					<a href='mailto:me@james-todd.net'><i className='fa fa-envelope'/></a>
				</div>
			</div>
		);
	}
}

export default Home;
