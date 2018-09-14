import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {
	state = {
		account: { username: '', password: '' },
		errors: {}
	};

	validate = () => {
		const { account } = this.state;
		const errors = {};

		if (account.username.trim() === '')
			errors.username = 'Username is required';

		if (account.password.trim() === '')
			errors.password = 'Password is required';

		return Object.keys(errors).length ? errors : null;
	};

	handleSubmit = e => {
		e.preventDefault();
		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		console.log('Form submitted');
	};

	handleChange = ({ currentTarget: input }) => {
		const account = { ...this.state.account };
		account[input.name] = input.value;
		this.setState({ account });
	};

	render() {
		const { account, errors } = this.state;
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<Input
						name="username"
						value={account.username}
						label="Username"
						error={errors.username}
						onChange={this.handleChange}
					/>
					<Input
						name="password"
						value={account.password}
						label="Password"
						error={errors.password}
						onChange={this.handleChange}
					/>
					<button className="btn btn-primary">Login</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
