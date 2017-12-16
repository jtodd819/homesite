import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Projects from './Projects';
import Resume from './Resume';
import Contact from './Contact';
import BadPath from './BadPath';


//Serve components to the page based on the provided URL
class Page extends Component{
	render(){
		return(
			<Switch>
				<Route exact path='/' component={Home}/>
				<Redirect from='/home' to='/'/>
				<Route exact path='/projects' component={Projects}/>
				<Route exact path='/resume' component={Resume}/>
				<Route exact path='/contact' component={Contact}/>
				<Route path='/' component={BadPath}/>
			</Switch>
		);
	}
}

export default Page;
