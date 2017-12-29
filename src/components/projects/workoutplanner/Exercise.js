import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

//represents an exercise
class Exercise extends Component{
	constructor(props){
		super(props);
		this.rowEdit = this.rowEdit.bind(this);
		this.rowDelete = this.rowDelete.bind(this);
	}
	//Edit an exercise at given row
	rowEdit(){
		this.props.editRow(this.props.name, this.props.index, this.props.max, this.props.weighted);
	}
	//Delete an exercise at given row
	rowDelete(){
		this.props.deleteRow(this.props.index);
	}
	render(){
		//weighted exercise
		if(this.props.weighted){
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
					<td><Button onClick={this.rowEdit}>Edit One Rep Max</Button></td>
					<td><Button bsStyle="danger" onClick={this.rowDelete}>Delete</Button></td>
				</tr>
			);
		//unweighted exercise
		}else{
			let set = Math.round((parseInt(this.props.max, 10) + 2) * .2);
			return(
				<tr>
					<td>{this.props.name}</td>
					<td>{set} reps</td>
					<td>{set} reps</td>
					<td>{set} reps</td>
					<td>{set} reps</td>
					<td>{set} reps</td>
					<td><Button onClick={this.rowEdit}>Edit Max Reps</Button></td>
					<td><Button onClick={this.rowDelete} bsStyle="danger">Delete</Button></td>
				</tr>
			);
		}
	}
}

export default Exercise;
