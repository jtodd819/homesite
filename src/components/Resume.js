import React, {Component} from 'react';

class Resume extends Component{
	render(){
		return (
			<div>
				<p><strong>James Todd</strong><br/>
				<em>For complete contact information please request a full Resume using the form on the Contact tab.</em> 
				</p>
				<p><strong>EDUCATION</strong><br/>
					Oregon State University, Corvallis, OR<br/>
					Bachelor of Science, Computer Science, 4.0 GPA<br/>
					Graduation: March 23rd, 2018<br/>
					University of North Carolina at Chapel Hill,  Chapel Hill, NC<br/>
					Bachelor of Arts, Philosophy, 3.6 GPA<br/>
					Graduated: May, 2016</p>
				<p><strong>COMPUTER SCIENCE COURSEWORK</strong><br/>
					University of North Carolina: Introductory and Intermediate Programming (Java) <br/>
					Oregon State: Accelerated intro to Computer Science (C++), Discrete Structures, Data Structures, <br/>
					Computer Architecture and Assembly Language, Web Development, Intro to Usability Engineering, <br/>
					Introduction to Databases, Analysis of Algorithms, Operating Systems, Introduction to Computer Networking</p>
				<p><strong>PROJECTS</strong><br/>
				<em>Visit the Projects tab.</em>
				</p>
				<p><strong>SKILLS</strong><br/>
					Programming Languages:  Javascript (ReactJS, Node.js), C/C++, Python, Java, MASM<br/>
					Operating Systems: Windows, macOS, GNU/Linux<br/>
					Markup Languages: HTML<br/>
					Style Sheet Languages: CSS<br/>
					Relational Database Management Systems: MySQL<br/>
					Version Control: Git</p>
				<p><em>References available upon request.</em></p>
			</div>
		);
	}
}

export default Resume;
