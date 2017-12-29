import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

//a form for adding workouts to the table 
class WorkoutForm extends Component{
	constructor(props){
		super(props);
		this.state = {name: '', weighted: false, max: 0, submitErr: false};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	//changes state values based on value in inputs
	handleChange(e) {
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		this.setState({[e.target.name] : value });
	}
	//submits a workout to be made as a weighted or unweighted row if it is of the proper form
	handleSubmit(e) {
		if(this.state.name !== '' && this.state.max > 0){
			this.setState({submitErr: false});
			this.props.add(this.state.name, this.state.max, this.state.weighted); 
		}else{
			this.setState({submitErr: true});
		}
		e.preventDefault();
	}
	render(){
		return(
			<div>
				<span>Enter a workout to add to the table.</span>
				<br/>
				<form onSubmit={this.handleSubmit}>    
					Exercise Name:
					<input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
					<br/>
					Does the exercise use weights?
					<input type="checkbox" name="weighted" checked={this.state.weighted} onChange={this.handleChange}/>
					<br/>
					{this.state.weighted && 
						<div>
							One Rep Max (lbs):
							<input type="number" name="max" value={this.state.max} 
							onChange={this.handleChange}/>
							<br/>
						</div>
					}
					{!this.state.weighted &&
						<div>
							Maximum Rep Count:
							<input type="number" name="max" value={this.state.max} 
							onChange={this.handleChange}/>
							<br/>
						</div>
					}
					<input type="submit" value="Add"/>
					<br/>
					{this.state.submitErr === true && <Alert bsStyle="warning">Error: workout submitted incorrectly. Please submit
						workout with a name and max value > 0. </Alert>
					}
				</form>
			</div>
		);
	}
}

export default WorkoutForm;
