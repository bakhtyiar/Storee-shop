import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<>
			<h1>404 page not found</h1>
			<p>Try to <Link to="/">back to Home</Link></p>
		</>
	);
}

export default NotFound;
