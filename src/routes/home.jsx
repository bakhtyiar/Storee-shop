import {Button, InputGroup, Form, Container} from 'react-bootstrap';
import React, { useState } from 'react'

// todo add panels with few o news, o products, o users

export default function Home() {
	const [searchValue, setSearchValue] = useState("");
	const [searchHints, setSearchHints] = useState(["harry potter", "chess", "physics", "tolstoy"]);

	const handleFind = () => {
	};

	return (
		<Container>
			<h1>Home</h1>
				<InputGroup className="mb-3">
					<Form.Control
						placeholder="Recipient's username"
						id="searchInput"
						list="searchHints"
						value={searchValue}
						onChange={e => setSearchValue(e.target.value)}
						aria-label="Recipient's username"
						aria-describedby="basic-addon2"
					/>
					<datalist id="searchHints">
						{
							searchHints.map((value => (
								<option value={value} key={value} />
							)))
						}
					</datalist>
					<Button variant="outline-secondary" id="button-addon2" onClick={handleFind}>
						Find
					</Button>
				</InputGroup>
		</Container>
	)
}
