import React, { Component } from 'react';
import plannerPic from '../../media/workoutPlanner.png';
import smallShellPic from '../../media/smallShell.png';
import recipesPic from '../../media/recipes.png';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class List extends Component{
	render(){
		return(
			<div>
				<h1>Projects</h1><br/>
				<div style={{width: 700, height: 'auto'}}>
					<Image src={plannerPic} responsive thumbnail/>
				</div>
				<Link to='/projects/workoutplanner'>Workout Planner </Link>
				<a href='https://github.com/jtodd819/homesite/tree/master/src/components/projects/workoutplanner'> 
				<i className='fa fa-github'/></a><br/>
				<p className='text-primary'>A workout planner for calculating set and rep counts for inputted exercises
				based on selected one rep maximum weights or maximum rep counts if the exercise is weightless. <br/>
				Backend saves, queries, edits, and deletes exercises on a MongoDB cluster using Mongoose ODM and Express with
				localStorage created users. <br/>
				Front end components built with ReactJS with styling from React Bootstrap.</p><br/>
				<div style={{width: 700, height: 'auto'}}>
					<Image src={recipesPic} responsive thumbnail/>
				</div>
				<a href='https://myrecipes-194614.appspot.com/'>My Recipes</a>
				<a href='https://github.com/jtodd819/Recipes'> 
				<i className='fa fa-github'/></a><br/>
				<p className='text-primary'>Python 2.7 Google App Engine recipe tracker connected to a Rest API<br/>
				that submits recipes and ingredients to a Google Cloud Datastore database instance. Uses OAuth2 with Google People API<br/>
				to access basic account information to view/create/edit/delete recipes for an authenticated user.<br/>
				API routes listed in Github Readme.</p><br/>
				<div style={{width: 700, height: 'auto'}}>
					<Image src={smallShellPic} responsive thumbnail/>
				</div>
				<a href='https://github.com/jtodd819/smallshell'>Small Shell <i className='fa fa-github'/></a><br/>
				<p className='text-primary'>A small shell program written in C to execute commands using the 
				fork(), exec(), and waitpid() functions.</p><br/>
			</div>
		);
	}
}

export default List;
