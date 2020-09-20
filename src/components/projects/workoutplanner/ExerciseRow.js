import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

class ExerciseRow extends Component{

	constructor(props){
		super(props);
		this.edit = this.edit.bind(this);
		this.delete = this.delete.bind(this);
	}

	/**
	 * Edits the exercise
	 */
	edit() {
		const currentExercise = {name: this.props.name, id: this.props.id, max: this.props.max, isWeighted: this.props.isWeighted};
		this.props.edit(currentExercise);
	}

	/**
	 * Deletes the exercise
	 */
	delete() {
		const currentExercise = {name: this.props.name, id: this.props.id, max: this.props.max, isWeighted: this.props.isWeighted};
		this.props.delete(currentExercise);
	}

	render(){
		// Weighted exercise
		if (this.props.isWeighted) {
			let oneRepMax = parseInt(this.props.max, 10);
			return(
				<tr>
					<td>{this.props.name}</td>
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
			let set = Math.round((parseInt(this.props.max, 10) + 2) * .2);
			return(
				<tr>
					<td>{this.props.name}</td>
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
