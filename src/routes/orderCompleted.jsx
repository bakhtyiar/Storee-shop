import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/constants";

const OrderCompleted = () => {
    const redirectAtS = 5;
    const [remain, setRemain] = useState(redirectAtS);
    const navigate = useNavigate();

    setTimeout(() => {
        setRemain((prevState) => prevState - 1);
    }, 1000);

    setTimeout(() => {
        navigate(`${routes.orders.path}`);
    }, redirectAtS * 1000)

    return (
        <Container className='mt-4'>
            <h1 className=''>Order is successfully completed</h1>
            <p>You will be redirected in {remain} seconds</p>
        </Container>
    );
};

export default OrderCompleted;