import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

//represents a weighted exercise
class Weighted extends Component{
	constructor(props){
		super(props);
		this.rowEdit = this.rowEdit.bind(this);
		this.rowDelete = this.rowDelete.bind(this);
	}
	//used to edit a row in the App class
	rowEdit(){
		this.props.editRow(this.props.name, this.props.index,this.props.ORM);
	}
	//used to delete a row in the App class
	rowDelete(){
		this.props.deleteRow(this.props.index);
	}
	render(){
		let oneRepMax = parseInt(this.props.ORM, 10);
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
	}
}

export default Weighted;
