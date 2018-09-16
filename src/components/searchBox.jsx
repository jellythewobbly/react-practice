import React from 'react';

const SearchBox = ({ value, onChange }) => {
	return (
		<input
			type="text"
			placeholder="Search..."
			className="form-control my-3"
			onChange={e => onChange(e.currentTarget.value)}
			value={value}
		/>
	);
};

export default SearchBox;
