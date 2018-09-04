import React from 'react';

const ListGroup = ({ items, textProp, idProp, selectedItem, onItemSelect }) => {
	return (
		<ul className="list-group">
			{items.map(item => (
				<li
					key={item[idProp]}
					className={
						selectedItem === item ? 'list-group-item active' : 'list-group-item'
					}
					onClick={() => onItemSelect(item)}
				>
					{item[textProp]}
				</li>
			))}
		</ul>
	);
};

ListGroup.defaultProps = {
	textProp: 'name',
	idProp: '_id'
};

export default ListGroup;
