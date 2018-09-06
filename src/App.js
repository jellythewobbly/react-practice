import React, { Component } from 'react';
import './App.css';
import Movies from './components/movies';
import NavBar from './components/common/navBar';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<NavBar />
				<main className="container">
					<Movies />
				</main>
			</React.Fragment>
		);
	}
}

export default App;
