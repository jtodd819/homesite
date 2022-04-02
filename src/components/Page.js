import React, {Component} from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Resume from './Resume';
import Contact from './Contact';
import BadPath from './BadPath';
import WorkoutPlanner from './projects/workoutplanner/WorkoutPlanner';
import FireCalculator from './projects/firecalculator/FireCalculator';


// Serve components to the page based on the provided URL
class Page extends Component{

	render(){
		return(
			<BrowserRouter>
				<Routes>
						<Route exact path='/' element={<Home/>}/>
						<Route path="/home" element={<Navigate replace to = '/' />}/>
						<Route exact path='/projects/workoutplanner' element={<WorkoutPlanner user={this.props.user}/>}/>
						<Route exact path='/projects/firecalculator' element={<FireCalculator/>}/>
						<Route exact path='/resume' element={<Resume/>}/>
						<Route exact path='/contact' element={<Contact user={this.props.user}/>}/>
						<Route path='/' element={<BadPath/>}/>
				</Routes>
			</BrowserRouter>
		);
	}
}

export default Page;
