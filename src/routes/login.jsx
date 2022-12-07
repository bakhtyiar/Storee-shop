import React from 'react';
import {Container} from "react-bootstrap";
import LoginForm from "../components/LoginForm/LoginForm";

const Login = () => {
	return (
			<Container className='mt-5'>
				<LoginForm/>
			</Container>
	);
}

export default Login;
