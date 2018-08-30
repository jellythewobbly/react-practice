import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
	state = {
		movies: getMovies()
	};

	deleteHandler = event => {
		this.setState({
			movies: this.state.movies.filter(movie => movie.title !== event.target.id)
		});
	};

	render() {
		return (
			<React.Fragment>
				{this.state.movies.length === 0 ? (
					<React.Fragment>
						<h3>There are no movies in the database.</h3>
					</React.Fragment>
				) : (
					<React.Fragment>
						<h3>Showing {this.state.movies.length} movies in the database</h3>
						<table className="table">
							<thead>
								<tr>
									<th>Title</th>
									<th>Genre</th>
									<th>Stock</th>
									<th>Rate</th>
									<th />
								</tr>
							</thead>
							<tbody>
								{this.state.movies.map(movie => {
									return (
										<tr key={movie._id}>
											<td>{movie.title}</td>
											<td>{movie.genre.name}</td>
											<td>{movie.numberInStock}</td>
											<td>{movie.dailyRentalRate}</td>
											<td>
												<button
													id={movie.title}
													onClick={this.deleteHandler}
													className="btn btn-danger"
												>
													Delete
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}

export default Movies;
