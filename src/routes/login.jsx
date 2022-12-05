import React from 'react';
import {Container} from "react-bootstrap";
import LoginForm from "../components/LoginForm/LoginForm";

const Login = () => {
	return (
			<Container style={{'padding': '10% 0'}}>
				<LoginForm/>
			</Container>
	);
}

export default Login;
