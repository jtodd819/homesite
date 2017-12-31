/*James Todd - 12/28/2017 - A single page ReactJS workout planner application using react-bootstrap for styling*/

import React, { Component } from "react";
import { PageHeader, Table, Well, Button, Alert} from "react-bootstrap";
import WorkoutForm from './WorkoutForm';
import Exercise from './Exercise';

//App containing form and workouts table
class WorkoutPlanner extends Component{
	constructor(props){
		super(props);
		this.add = this.add.bind(this);
		this.edit = this.edit.bind(this);
		this.delete = this.delete.bind(this);
		this.getExercises = this.getExercises.bind(this);
		this.changeExercise = this.changeExercise.bind(this);
		this.changeEdit = this.changeEdit.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.state = {rows: [], editing: false, editName: '', editIndex:0, editMax:0, editWeighted: false, editSubmitErr: false};
	}

	//Get exercises from database when output rendered to dom 
	componentDidMount(){
		this.getExercises();
	}

	//get the Exercises from the database and change the view accordingly
	getExercises(){
		let newRows = [];
		fetch('/getExercises', { method: 'GET' }).then( response => {
			return response.json();
		}).then( data => {
			for(const exercise of data){
				newRows.push(<Exercise key={exercise.index} index={exercise.index} 
				editRow={this.edit} deleteRow={this.delete} name={exercise.name} max={exercise.max} weighted={exercise.weighted}/>);
			}
			this.setState({rows: newRows});
		});
	}

	//add an exericse to the table
	add(name, max, weighted){
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
		}).then(this.getExercises()); 
	}

	//Make the editing form visible for editing an exercise
	edit(name, index, max, weighted){
		this.setState({editing: true, editName: name, editIndex: index, editMax: max, editWeighted: weighted});
	}

	//change an exercise after submitting changes from the edit form
	changeExercise(e){
		//make sure a valid name and max value submitted
		if(this.state.editName === '' || this.state.editMax < 1){
			this.setState({editSubmitErr: true});
		}else{
			//change exercise in the database
			fetch('/change', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					index: this.state.editIndex,
					name: this.state.editName,
					max: this.state.editMax, 
					weighted: this.state.editWeighted
				}),
			}).then(this.getExercises());
		}
		e.preventDefault();
	}

	//remove an exercise at a given row index
	delete(index){
		//remove editing form if the currently edited exericse is deleted
		if(this.state.editing && index === this.state.editIndex){
			this.setState({editing: false});
		}
		//remove from the database
		fetch('/delete', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				index: index,
			}),
		}).then(this.getExercises());
	}

	//change the value of the state's edit value when editing data in edit form
	changeEdit(e){
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		this.setState({[e.target.name] : value });
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
							Exercise Name:
							<input type="text" name="editName" value={this.state.editName} onChange={this.changeEdit}/>
							<br/>
							Does the exercise use weights?
							<input type="checkbox" name="editWeighted" checked={this.state.editWeighted} onChange={this.changeEdit}/>
							<br/>
							{this.state.editWeighted && 
								<div>
									One Rep Max (lbs):
									<input type="number" name="editMax" value={this.state.editMax} 
									onChange={this.changeEdit}/>
									<br/>
								</div>
							}
							{!this.state.editWeighted &&
								<div>
									Maximum Rep Count:
									<input type="number" name="editMax" value={this.state.editMax} onChange={this.handleChange}/>
									<br/>
								</div>
							}
							<input type="submit" value="Change"/>
							<br/>
							{this.state.editSubmitErr === true && <Alert bsStyle="warning">Error: workout submitted incorrectly. Please submit
							workout with a name and max value > 0. </Alert>
							}
						</form>
						<Button bsStyle="danger" onClick={this.cancelEdit}>Cancel</Button>
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
