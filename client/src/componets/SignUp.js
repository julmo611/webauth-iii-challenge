import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
	state = {
		username: '',
		password: '',
		department: ''
	};

	render() {
		return (
			<>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="username" />
						<input
							value={this.state.username}
							onChange={this.handleInputChange}
							id="username"
							type="text"
							placeholder="Username"
						/>
					</div>
					<div>
						<label htmlFor="password" />
						<input
							value={this.state.password}
							onChange={this.handleInputChange}
							id="password"
							type="password"
							placeholder="Password"
						/>
					</div>
					<div>
						<label htmlFor="department" />
						<input
							value={this.state.department}
							onChange={this.handleInputChange}
							id="department"
							type="text"
							placeholder="Department"
						/>
					</div>
					<div>
						<button type="submit">Register</button>
					</div>
				</form>
			</>
		);
	}

	handleSubmit = event => {
		event.preventDefault();

		const register = {
			username: this.state.username,
			password: this.state.password,
			department: this.state.department
		};

		const endpoint = 'http://localhost:5000/api/auth/register';
		axios
			.post(endpoint, register)
			.then(res => {
				this.props.history.push('/login');
			})
			.catch(error => {
				console.error('REGISTER ERROR', error);
			});
	};

	handleInputChange = event => {
		const { id, value } = event.target;
		this.setState({ [id]: value });
	};
}

export default withRouter(Signup);
