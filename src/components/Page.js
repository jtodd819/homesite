import React, {Component} from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
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
				<Switch>
						<Route exact path='/' component={Home}/>
						<Redirect from='/home' to='/'/>
						<Route exact path='/projects/workoutplanner'>
							<WorkoutPlanner user={this.props.user}/>
						</Route>
						<Route exact path='/projects/firecalculator' component={FireCalculator}/>
						<Route exact path='/resume' component={Resume}/>
						<Route exact path='/contact' component={Contact}>
							<Contact user={this.props.user}/>
						</Route>
						<Route path='/' component={BadPath}/>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Page;
