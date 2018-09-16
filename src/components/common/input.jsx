import React from 'react';

const Input = ({ name, label, error, ...props }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input {...props} id={name} name={name} className="form-control" />
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default Input;
