import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import ProjectList from './projects/List';
import Resume from './Resume';
import Contact from './Contact';
import BadPath from './BadPath';
import WorkoutPlanner from './projects/workoutplanner/WorkoutPlanner';


// Serve components to the page based on the provided URL
class Page extends Component{

	render(){
		return(
			<Switch>
					<Route exact path='/' component={Home}/>
					<Redirect from='/home' to='/'/>
					<Route exact path='/projects/workoutplanner'>
						<WorkoutPlanner user={this.props.user}/>
					</Route>
					<Route exact path='/projects' component={ProjectList}/>
					<Route exact path='/resume' component={Resume}/>
					<Route exact path='/contact' component={Contact}>
						<Contact user={this.props.user}/>
					</Route>
					<Route path='/' component={BadPath}/>
			</Switch>
		);
	}
}

export default Page;
