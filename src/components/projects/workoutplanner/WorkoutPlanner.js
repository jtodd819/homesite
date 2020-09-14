import React, { Component } from "react";
import { Table, Card, Button, Jumbotron, Modal } from "react-bootstrap";
import WorkoutForm from './WorkoutForm';
import ExerciseRow from './ExerciseRow';
import API from 'api';

//App containing form and workouts table
class WorkoutPlanner extends Component{
	constructor(props){
		super(props);
		this.add = this.add.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
		this.getExercises = this.getExercises.bind(this);
		this.handleAddShow = this.handleAddShow.bind(this);
		this.handleAddClose = this.handleAddClose.bind(this);
		this.handleEditShow = this.handleAddShow.bind(this);
		this.handleEditClose = this.handleEditClose.bind(this);
		this.state = { 
			exerciseRows: [], 
			addingExercise: false,
			editingExercise: false,
			currentExercise: null
		}
	}

	/**
	 * Modal state management handlers
	 */

	handleAddShow() {
		this.setState({addingExercise: true});
	}

	handleAddClose() {
		this.setState({addingExercise: false});
	}

	handleEditShow() {
		this.setState({editingExercise: true});
	}

	handleEditClose() {
		this.setState({editingExercise: false});
	}

	/**
	 * Fetch current exercises from the database and update view
	 */
	async getExercises() {
		try {
			const response = await API.get(`/exercises?userName=${this.props.user.userName}`);
			this.setState({exerciseRows: response.data.map(d => {
				return <ExerciseRow id={d.id} edit={this.onEdit} delete={this.delete} name={d.name} max={d.max} isWeighted={d.isWeighted}/>;
			})});
		} catch (err) {
			console.error(`Error while fetching exercises: ${err}`)
		}
	}

	/**
	 * Callback to handle edit clicks on exercise rows
	 * @param {*} exercise the exercise to edit
	 */
	onEdit(exercise) {
		this.setState({currentExercise: exercise});
		this.handleEditShow();
	}

	/**
	 * Adds an exercise to the exercise table
	 * @param {*} exercise Exercise submitted through form
	 */
	async add (exercise) {
		try {
			await API.post('/exercises', {userName: this.props.user.userName, name: exercise.name, max: exercise.max, isWeighted: exercise.isWeighted});
			this.handleAddClose();
			this.getExercises();
		} catch(err) {
			console.error(`Error while adding a new exercise with name ${exercise.name}: ${err}`)
		}
	}

	/**
	 * Updates a given exercise
	 * @param {*} exercise exercise to update
	 */
	async update (exercise) {
		try {
			await API.put(`/exercises/${exercise.id}`, {userName: this.props.user.userName, id: exercise.id, name: exercise.name, max: exercise.max, weighted: exercise.isWeighted});
			this.handleEditClose();
			this.getExercises();
		} catch (err) {
			console.error(`Error while updating exercise with name ${exercise.name}: ${err}`)
		}
	}

	/**
	 * Delete an exercise from the planner
	 * @param {*} exercise exercise to delete
	 */
	async delete (exercise) {
		try {
			await API.delete(`/exercises/${exercise.id}`);
			this.getExercises();
		} catch (err) {
			console.error(`Error while deleting exercise with name ${exercise.name}: ${err}`)
		}
	}

	render () {
		return(
			<Jumbotron fluid>
				<h1>5/3/1 Workout Planner</h1>
				<Button onClick={this.handleAddShow}>Add Exercise</Button>
				<Table>
					<thead>
					{this.state.exerciseRows.length > 0 &&
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
					<tbody>{this.state.exerciseRows}</tbody>
				</Table>
				<Card>For weighted exercises, workout plan calculated at 10 intervals starting at 10% to 100% of
				input one rep max, rounded to the nearest multiple of 5.<br/>
				For unweighted exercises, workout plan calculated at 5 intervals of 20% of max rep count + 2, rounded to the
				nearest integer. <br/>
				Regimen based on <a href="https://www.amazon.com/Simplest-Effective-Training-Increase-Strength/dp/0557248299">
				Jim Wendler's 5/3/1</a>.</Card> 
				<Modal show={this.state.addingExercise} onHide={this.handleAddClose}>
					<Modal.Header closeButton>
						<Modal.Title>Create New Exercise</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<WorkoutForm save={this.add}/>
					</Modal.Body>
				</Modal>
				<Modal show={this.state.editingExercise} onHide={this.handleEditClose}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Exercise</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<WorkoutForm exercise={this.state.currentExercise} save={this.update}/>
					</Modal.Body>
				</Modal>
			</Jumbotron>
		);
	}
}

export default WorkoutPlanner;
