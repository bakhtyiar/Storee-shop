import React from 'react';
import RegisterForm from "../components/RegisterForm/RegisterForm";
import {Container} from "react-bootstrap";

const Register = () => {
	return (
		<Container style={{'padding': '10% 0'}}>
			<RegisterForm/>
		</Container>
	);
}

export default Register;
