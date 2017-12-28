import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

//represents an unweighted exercise
class Weightless extends Component{
	constructor(props){
		super(props);
		this.rowEdit = this.rowEdit.bind(this);
		this.rowDelete = this.rowDelete.bind(this);
	}
	//used to edit a row in the App class
	rowEdit(){
		this.props.editRow(this.props.name, this.props.index,this.props.maxCount);
	}
	//used to delete a row in the App class
	rowDelete(){
		this.props.deleteRow(this.props.index);
	}
	render(){
		let set = Math.round((parseInt(this.props.maxCount, 10) + 2) * .2);
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

export default Weightless;
