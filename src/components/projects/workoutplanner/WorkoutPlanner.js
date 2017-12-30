/*James Todd - 12/28/2017 - A single page ReactJS workout planner application using react-bootstrap for styling*/

import React, { Component } from "react";
import { PageHeader, Table, Well, Button} from "react-bootstrap";
import WorkoutForm from './WorkoutForm';
import Exercise from './Exercise';

//App containing form and workouts table
class WorkoutPlanner extends Component{
	constructor(props){
		super(props);
		this.add = this.add.bind(this);
		this.edit = this.edit.bind(this);
		this.delete = this.delete.bind(this);
		this.changeExercise = this.changeExercise.bind(this);
		this.changeEditValue = this.changeEditValue.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.state = {rows: [], editing: false, editName:"", editIndex:0, editValue:0, editType:0};
	}

	//Get exercises from database when output rendered to dom
	componentDidMount(){
		fetch('/getExercises', { method: 'GET' }).then((response) => {
				console.log(response.json());
			});
	}

	//add an exericse to the table
	add(name, max, weighted){
		let nextState = this.state;
		//add to database
		fetch('/add', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				index: this.state.rows.length,
				name: name,
				max: max,
				weighted: weighted
			}),
		}); 
		nextState.rows.push(<Exercise key={this.state.rows.length} index={this.state.rows.length} 
		editRow={this.edit} deleteRow={this.delete} name={name} max={max} weighted={weighted}/>);
		this.setState(nextState);
	}

	//Make the editing form visible for editing an exercise
	edit(name, index, max, weighted){
		this.setState({editing: true, editName: name, editIndex: index, editValue: max, editType: weighted});
	}

	//change an exercise after submitting changes from the edit form
	changeExercise(e){
		let nextState = this.state;
		nextState.rows.splice(nextState.editIndex, 1, <Exercise key={nextState.editIndex} index={nextState.editIndex}
		editRow={this.edit} deleteRow={this.delete} name={nextState.editName} max={nextState.editValue}
		weighted={nextState.editType}/>);
		this.setState({rows: nextState.rows, editing: false});
		e.preventDefault();
	}

	//remove an exercise at a given row index
	delete(index){
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
				<WorkoutForm add={this.add}/>
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
						<form onSubmit={this.changeExercise}>
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
