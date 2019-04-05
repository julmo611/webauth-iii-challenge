import React from 'react';
import axios from 'axios';

import requiresAuth from '../auth/requiresAuth';

class Users extends React.Component {
	state = {
		users: []
	};

	render() {
		return (
			<>
				<h2>Users List</h2>
				<ul>
					{this.state.users.map(u => {
						return <div key={u.id}> User: {u.username}</div>;
					})}
				</ul>
			</>
		);
	}

	componentDidMount() {
		const endpoint = '/users';
		axios
			.get(endpoint)
			.then(res => {
				this.setState({ users: res.data });
			})
			.catch(error => {
				console.error('USERS ERROR', error);
			});
	}
}

export default requiresAuth(Users);
