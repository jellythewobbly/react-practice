import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utilities/paginate';
import MoviesTable from './moviesTable';
import SearchBox from './searchBox';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import _ from 'lodash';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		sortColumn: { path: 'title', order: 'asc' },
		searchValue: '',
		selectedGenre: null
	};

	componentDidMount() {
		const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
		this.setState({ movies: getMovies(), genres });
	}

	handleDelete = movie => {
		const movies = this.state.movies.filter(m => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLike = movie => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = genre => {
		this.setState({ selectedGenre: genre, currentPage: 1, searchValue: '' });
	};

	handleSort = sortColumn => {
		this.setState({ sortColumn });
	};

	handleSearch = query => {
		this.setState({ searchValue: query, selectedGenre: null, currentPage: 1 });
	};

	getPagedData = () => {
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			selectedGenre,
			sortColumn,
			searchValue
		} = this.state;

		let filtered = allMovies;
		if (searchValue)
			filtered = allMovies.filter(m =>
				m.title.toLowerCase().includes(searchValue.toLowerCase().trim())
			);
		else if (selectedGenre && selectedGenre._id)
			filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		let movies = paginate(sorted, currentPage, pageSize);
		// Added to ensure no displaying of empty page
		if (movies.length === 0 && currentPage > 0) {
			this.setState({ currentPage: currentPage - 1 });
		}

		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const { length: count } = this.state.movies;
		const {
			pageSize,
			currentPage,
			sortColumn,
			genres,
			selectedGenre,
			searchValue
		} = this.state;

		if (count === 0) return <h3>There are no movies in the database.</h3>;

		const { totalCount, data: movies } = this.getPagedData();

		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={genres}
						selectedItem={selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>
				<div className="col">
					<Link
						to="/movies/new"
						className="btn btn-primary"
						style={{ marginBottom: 20 }}
					>
						New Movie
					</Link>
					<p>Showing {totalCount} movies in the database</p>
					<SearchBox value={searchValue} onChange={this.handleSearch} />
					<MoviesTable
						movies={movies}
						sortColumn={sortColumn}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
