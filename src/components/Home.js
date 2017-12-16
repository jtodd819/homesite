import React, {Component} from 'react';
import '../style/Home.css';

class Home extends Component{
	render(){
		return(
			<div>
				<h1>Welcome!</h1>
				<p>My name is James Todd, and this is my personal website.<br/>
				I am a software engineer specializing in full stack web development.<br/>
				For samples of my work, visit the Projects tab. <br/>
				To access my complete Resume, visit the Resume tab.<br/>
				For business inquiries, visit the Contact tab and submit a form.</p> 
				<div className='alert-info text-white'>
						<a href='https://github.com/jtodd819' classNam>Github</a>
				</div>
			</div>
		);
	}
}

export default Home;
