import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utilities/paginate';
import Like from './common/like';
import Pagination from './common/pagination';

class Movies extends Component {
	state = {
		movies: getMovies(),
		pageSize: 4,
		currentPage: 1
	};

	deleteHandler = movie => {
		const movies = this.state.movies.filter(m => m._id !== movie._id);
		this.setState({ movies });
	};

	likeHandler = movie => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage, movies: allMovies } = this.state;

		if (count === 0) return <h3>There are no movies in the database.</h3>;

		const movies = paginate(allMovies, currentPage, pageSize);

		return (
			<React.Fragment>
				<h3>Showing {count} movies in the database</h3>
				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Genre</th>
							<th>Stock</th>
							<th>Rate</th>
							<th />
							<th />
						</tr>
					</thead>
					<tbody>
						{movies.map(movie => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like
										liked={movie.liked}
										onClick={() => this.likeHandler(movie)}
									/>
								</td>
								<td>
									<button
										onClick={() => this.deleteHandler(movie)}
										className="btn btn-danger"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Pagination
					itemsCount={count}
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={this.handlePageChange}
				/>
			</React.Fragment>
		);
	}
}

export default Movies;
