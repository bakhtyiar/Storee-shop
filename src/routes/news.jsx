import React, { Fragment, useEffect, useState } from 'react';

export default function News() {
	const [pageNumber, setPageNumber] = useState(0);
	const [newsData, setNewsData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		getNews();
	}, [pageNumber]);

	const getNews = () => {
		setIsLoading(true);
		fetch(`https://jsonplaceholder.typicode.com/posts?_start=${pageNumber}&_limit=${pageNumber + 5}`)
			.then(response => response.json())
			.then(data => setNewsData(data))
			.finally(() => setIsLoading(false));
	}

	return (
		<>
			<h1>News</h1>
			{isLoading ? "News is loading..." : newsData.map((post) => (
				<Fragment key={post.id}>
					<h3>{post.title}</h3>
					<p>{post.body}</p>
					<i>Posted by: {post.userId}. Date: {post.id}</i>
				</Fragment>
			))}
		</>
	)
}
