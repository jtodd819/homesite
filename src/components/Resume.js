import React, {Component} from 'react';

class Resume extends Component{
	render(){
		return (
			<div>
				<h1>James Todd</h1><br/>
				<p className='text-warning'><em>For complete contact information please request 
				a full Resume using the form on the Contact tab.</em></p>
				<p className='text-primary'><strong>EDUCATION</strong><br/></p>
					<p className='text-success'>Oregon State University, Corvallis, OR<br/>
					Bachelor of Science, Computer Science, 4.0 GPA<br/>
					Graduation: March 23rd, 2018<br/>
					University of North Carolina at Chapel Hill,  Chapel Hill, NC<br/>
					Bachelor of Arts, Philosophy, 3.6 GPA<br/>
					Graduated: May, 2016</p>
				<p className='text-primary'><strong>COMPUTER SCIENCE COURSEWORK</strong><br/></p>
					<p className='text-success'>University of North Carolina: Introductory and Intermediate Programming (Java) <br/>
					Oregon State: Accelerated intro to Computer Science (C++), Discrete Structures, Data Structures, <br/>
					Computer Architecture and Assembly Language, Web Development, Intro to Usability Engineering, <br/>
					Introduction to Databases, Analysis of Algorithms, Operating Systems, Introduction to Computer Networking</p>
				<p className='text-primary'><strong>PROJECTS</strong><br/></p>
				<p className='text-warning'><em>Visit the Projects tab.</em></p>
				<p className='text-primary'><strong>SKILLS</strong><br/></p>
					<p className='text-success'>Programming Languages: Javascript (Node.js, ReactJS), C/C++, Python, Java, MASM<br/>
					Operating Systems: Windows, macOS, GNU/Linux<br/>
					Markup Languages: HTML<br/>
					Style Sheet Languages: CSS<br/>
					Relational Database Management Systems: MySQL, MongoDB<br/>
					Version Control: Git</p>
				<p className='text-warning'><em>References available upon request.</em></p>
			</div>
		);
	}
}

export default Resume;
