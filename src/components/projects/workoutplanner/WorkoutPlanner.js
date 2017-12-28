/*James Todd - 12/28/2017 - A single page ReactJS workout planner application using react-bootstrap for styling*/

import React, { Component } from "react";
import { PageHeader, Table, Well, Button} from "react-bootstrap";
import Weighted from './Weighted';
import Weightless from './Weightless';
import WorkoutForm from './WorkoutForm';

//App containing form and workouts table
class WorkoutPlanner extends Component{
	constructor(props){
		super(props);
		this.addUW = this.addUW.bind(this);
		this.addW = this.addW.bind(this);
		this.editW = this.editW.bind(this);
		this.editUW = this.editUW.bind(this);
		this.deleteWorkout = this.deleteWorkout.bind(this);
		this.changeWorkout = this.changeWorkout.bind(this);
		this.changeEditValue = this.changeEditValue.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.state = {rows: [], editing: false, editName:"", editIndex:0, editValue:0, editType:0};
	}
	//add a weighted workout to the table
	addW(myName, myORM){
		let nextState = this.state;
		nextState.rows.push(<Weighted key={this.state.rows.length} index={this.state.rows.length} 
		editRow={this.editW} deleteRow={this.deleteWorkout} name={myName} ORM={myORM}/>);
		this.setState(nextState);
	}
	//add a weightless workout to the table
	addUW(myName, myMaxCount){
		let nextState = this.state;
		nextState.rows.push(<Weightless key={this.state.rows.length} index={this.state.rows.length} editRow={this.editUW}
		deleteRow={this.deleteWorkout} name={myName} maxCount={myMaxCount} />);
		this.setState(nextState);
	}

	//Make the editing form visible for editing a weighted workout
	editW(name, index, ORM){
		this.setState({editing: true, editName: name, editIndex:index, editType:0, editValue: ORM});
	}

	//Make the editing form visible for editing a Weightless workout
	editUW(name, index, maxRepCount){
		this.setState({editing: true, editName: name, editIndex:index, editType:1, editValue: maxRepCount});
	}

	//change a workout after submitting changes from the edit form
	changeWorkout(e){
		let nextState = this.state;
		if(nextState.editType === 0){
			nextState.rows.splice(nextState.editIndex, 1, <Weighted key={nextState.editIndex} 
			index={nextState.editIndex} editRow={this.editW} deleteRow={this.deleteWorkout} 
			name={nextState.editName} ORM={nextState.editValue} />);
			this.setState({rows: nextState.rows, editing: false});
		}else if(nextState.editType === 1){
			nextState.rows.splice(nextState.editIndex, 1, <Weightless key={nextState.editIndex} 
			index={nextState.editIndex} editRow={this.editUW} deleteRow={this.deleteWorkout} 
			name={nextState.editName} maxCount={nextState.editValue} />);
			this.setState({rows: nextState.rows, editing: false});
		}
		e.preventDefault();
	}

	//remove a workout at a given row index
	deleteWorkout(index){
		let nextState = this.state;
		nextState.rows.splice(index,1);
		this.setState(nextState);
	}

	//change the value of the state's edit value when editing data in edit form
	changeEditValue(e){
		this.setState({editValue: e.target.value});
	}

	//cancel editing used when hitting the cancel button
	cancelEdit(){
		this.setState({editing: false});
	}
	//returns a form for submitting workouts and a table of those submitted
	render(){
		return(
			<div>
				<PageHeader>Workout Planner<small> by James Todd</small></PageHeader> 
				<WorkoutForm addUnweighted={this.addUW} addWeighted={this.addW}/>
				<Table condensed hover>
					<thead>
					{this.state.rows.length > 0 &&
						<tr>
						<th>Name</th>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
						</tr>
					}
					</thead>
					<tbody>{this.state.rows}</tbody>
				</Table> 
				{this.state.editing === true &&
					<div>
						<form onSubmit={this.changeWorkout}>
							<input type="number" value={this.state.editValue} onChange={this.changeEditValue}></input>
							<input type="submit" value="Change"></input>
							<Button bsStyle="danger" onClick={this.cancelEdit}>Cancel</Button>
						</form>
					</div>
				}
				<Well>For weighted exercises, workout plan calculated at 10 intervals starting at 10% to 100% of
				input one rep max, rounded to the nearest multiple of 5.<br/>
				For unweighted exercises, workout plan calculated at 5 intervals of 20% of max rep count + 2, rounded to the
				nearest integer. <br/>
				Regimen based on <a href="https://www.amazon.com/Simplest-Effective-Training-Increase-Strength/dp/0557248299">
				Jim Wendler's 5/3/1</a>.</Well> 
			</div>
		);
	}
}

export default WorkoutPlanner;
