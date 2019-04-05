import React, { Component } from 'react';
import { Switch, Route, NavLink, withRouter } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Login from './componets/Login';
import Users from './componets/Users';
import SingUp from './componets/SignUp';

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:5000/api';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header>
					<NavLink to="/">Home</NavLink>
					&nbsp;|&nbsp;
					<NavLink to="/register">SignUp</NavLink>
					&nbsp;|&nbsp;
					<NavLink to="/login">Login</NavLink>
					&nbsp;|&nbsp;
					<NavLink to="/users">Users</NavLink>
					&nbsp;|&nbsp;
					<button onClick={this.logout}>Logout</button>
				</header>
				<main>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/register" component={SingUp} />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={SingUp} />
						<Route path="/users" component={Users} />
					</Switch>
				</main>
			</div>
		);
	}

	logout = e => {
		e.preventDefault();
		localStorage.removeItem('token');
		this.props.history.push('/login');
	};
}

function Home(props) {
	return <div>Hey this is the homepage</div>;
}

export default withRouter(App);
