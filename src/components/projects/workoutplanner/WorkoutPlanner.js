import React, { PureComponent } from 'react';
import { Table, Button, Jumbotron, Modal, Container, Row } from 'react-bootstrap';
import WorkoutForm from './WorkoutForm';
import ExerciseRow from './ExerciseRow';
import API from '../../../api';
import LoginReminder from '../../account/LogInReminder';
import { NotificationManager } from 'react-notifications';

//App containing form and workouts table
class WorkoutPlanner extends PureComponent{
	constructor(props){
		super(props);
		this.add = this.add.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
		this.getExercises = this.getExercises.bind(this);
		this.handleAddShow = this.handleAddShow.bind(this);
		this.handleAddClose = this.handleAddClose.bind(this);
		this.handleEditShow = this.handleEditShow.bind(this);
		this.handleEditClose = this.handleEditClose.bind(this);
		this.state = { 
			exerciseRows: [], 
			addingExercise: false,
			editingExercise: false,
			currentExercise: null
		}
	}
	
	componentDidMount() {
		if (this.props.user) {
			this.getExercises();
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
			response.data.sort((d1, d2) => {
				return d1.id - d2.id;
			});
			this.setState({exerciseRows: response.data.map(d => {
				return <ExerciseRow key={d.id} id={d.id} edit={this.onEdit} delete={this.delete} name={d.name} max={d.max} isWeighted={d.isWeighted}/>;
			})});
		} catch (err) {
			NotificationManager.error(`Server error fetching your exercises.`, 'Get Exercises Error', 3000);
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
			NotificationManager.success(`Exercise with name ${exercise.name} has been added.`, 'Exercise Added', 3000);
			this.getExercises();
		} catch(err) {
			NotificationManager.error(`Server error creating exercise with name ${exercise.name}.`, 'Exercise Creation Error', 3000);
		}
	}

	/**
	 * Updates a given exercise
	 * @param {*} exercise exercise to update
	 */
	async update (exercise) {
		try {
			await API.put(`/exercises/${exercise.id}`, {name: exercise.name, max: exercise.max, isWeighted: exercise.isWeighted});
			this.handleEditClose();
			NotificationManager.success(`Exercise with name ${exercise.name} has been updated.`, 'Exercise Updated', 3000);
			this.getExercises();
		} catch (err) {
			NotificationManager.error(`Server error updating exercise with name ${exercise.name}.`, 'Exercise Update Error', 3000);
		}
	}

	/**
	 * Delete an exercise from the planner
	 * @param {*} exercise exercise to delete
	 */
	async delete (exercise) {
		try {
			await API.delete(`/exercises/${exercise.id}`);
			NotificationManager.success(`Exercise with name ${exercise.name} has been been deleted.`, 'Exercise Deleted', 3000);
			this.getExercises();
		} catch (err) {
			NotificationManager.error(`Server error deleting exercise with name ${exercise.name}.`, 'Exercise Deletion Error', 3000);
		}
	}

	render () {
		if (!this.props.user) {
			return (
				<LoginReminder title="5/3/1 Workout Planner"/>
			)
		} else {
			return (
				<Jumbotron fluid>
					<h1>5/3/1 Workout Planner</h1>
					<Button onClick={this.handleAddShow}>Add Exercise</Button>
					<Table>
						<thead>
						{this.state.exerciseRows.length > 0 &&
							<tr>
							<th>Name</th>
							<th>Set 1</th>
							<th>Set 2</th>
							<th>Set 3</th>
							<th>Set 4</th>
							<th>Set 5</th>
							<th>Set 6</th>
							<th>Set 7</th>
							<th>Set 8</th>
							<th>Set 9</th>
							<th>Set 10</th>
							</tr>
						}
						</thead>
						<tbody>{this.state.exerciseRows}</tbody>
					</Table>
					<Container>
						<Row>
							For weighted exercises, workout plan calculated at 10 intervals starting at 10% to 100% of input one rep max, 
							rounded to the nearest multiple of 5.
						</Row>
						<Row>
							For unweighted exercises, workout plan calculated at 5 intervals of 20% of max rep count + 2, rounded to the
							nearest integer.
						</Row>
						<Row>
							Regimen based on:
						</Row>
						<Row>
							<a href="https://www.amazon.com/Simplest-Effective-Training-Increase-Strength/dp/0557248299"> Jim Wendler's 5/3/1</a>
						</Row>
					</Container>
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
}

export default WorkoutPlanner;
