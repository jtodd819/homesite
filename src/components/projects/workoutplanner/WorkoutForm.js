import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

//a form for adding workouts to the table 
class WorkoutForm extends Component{
	constructor(props){
		super(props);
		//One rep max used for weighted exercises, maximum rep count used for unweighted exercises
		this.state = {myName: '', isWeighted: false, weightedORM: 0, maxRepCount: 0, submitErr: false};
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
		if(this.state.myName !== ''){
			if((this.state.isWeighted === false) && (this.state.maxRepCount > 0)){
				this.setState({submitErr: false});
				this.props.addUnweighted(this.state.myName, this.state.maxRepCount); 
			}else if((this.state.isWeighted === true) && (this.state.weightedORM > 0)){
				this.setState({submitErr: false});
				this.props.addWeighted(this.state.myName, this.state.weightedORM);
			}else{
				this.setState({submitErr: true});
			}
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
					<input type="text" name="myName" value={this.state.name} onChange={this.handleChange}/>
					<br/>
					Weighted Exercise:
					<input type="checkbox" name="isWeighted" checked={this.state.isWeighted} onChange={this.handleChange}/>
					<br/>
					{this.state.isWeighted === true && 
						<div>
							One Rep Max (lbs):
							<input type="number" name="weightedORM" value={this.state.weightedORM} 
							onChange={this.handleChange}/>
							<br/>
						</div>
					}
					{this.state.isWeighted === false &&
						<div>
							Maximum Rep Count:
							<input type="number" name="maxRepCount" value={this.state.unweightedRepMax} 
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
