import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

class ExerciseRow extends Component{

	constructor(props){
		super(props);
		this.edit = this.edit.bind(this);
		this.delete = this.delete.bind(this);
		this.state = {
			exercise: {name: this.props.name, id: this.props.id, max: this.props.max, isWeighted: this.props.isWeighted}
		}
	}

	/**
	 * Edits the exercise
	 */
	edit(){
		this.props.edit(this.state.exercise);
	}

	/**
	 * Deletes the exercise
	 */
	delete(){
		this.props.delete(this.state.exercise);
	}

	render(){
		// Weighted exercise
		if (this.state.exercise.isWeighted) {
			let oneRepMax = parseInt(this.state.exercise.max, 10);
			return(
				<tr>
					<td>{this.state.exercise.name}</td>
					<td>3-5 reps x {5 * Math.round(Math.round(.1 * oneRepMax) / 5)}lbs</td>
					<td>3-5 reps x {5 * Math.round(Math.round(.2 * oneRepMax) / 5)}lbs</td>
					<td>3-5 reps x {5 * Math.round(Math.round(.3 * oneRepMax) / 5)}lbs</td>
					<td>3-5 reps x {5 * Math.round(Math.round(.4 * oneRepMax) / 5)}lbs</td>
					<td>3-5 reps x {5 * Math.round(Math.round(.5 * oneRepMax) / 5)}lbs</td>
					<td>3-5 reps x {5 * Math.round(Math.round(.6 * oneRepMax) / 5)}lbs</td>
					<td>1-3 reps x {5 * Math.round(Math.round(.7 * oneRepMax) / 5)}lbs</td>
					<td>1-3 reps x {5 * Math.round(Math.round(.8 * oneRepMax) / 5)}lbs</td>
					<td>1 rep x {5 * Math.round(Math.round(.9 * oneRepMax) / 5)}lbs</td>
					<td>1 rep or PR x {5 * Math.round(oneRepMax / 5)}lbs</td>
					<td><Button onClick={this.edit}>Edit</Button></td>
					<td><Button variant="danger" onClick={this.delete}>Delete</Button></td>
				</tr>
			);
		// Unweighted exercise
		} else {
			let set = Math.round((parseInt(this.state.exercise.max, 10) + 2) * .2);
			return(
				<tr>
					<td>{this.state.exercise.name}</td>
					<td>{set} reps</td>
					<td>{set} reps</td>
					<td>{set} reps</td>
					<td>{set} reps</td>
					<td>{set} reps</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td><Button onClick={this.edit}>Edit</Button></td>
					<td><Button onClick={this.delete} variant="danger">Delete</Button></td>
				</tr>
			);
		}
	}
}

export default ExerciseRow;
