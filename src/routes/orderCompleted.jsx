import React, {useEffect, useState} from 'react';
import {Alert, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/constants";

const OrderCompleted = () => {
    const redirectAtS = 5;
    const [remain, setRemain] = useState(redirectAtS);
    const navigate = useNavigate();

    setTimeout(() => {
        setRemain((prevState) => prevState - 1);
    }, 1000);

    useEffect(() => {

        let timeOutRedirect = setTimeout(() => {
            navigate(`${routes.home.path}`, {replace: true});
        }, redirectAtS * 1000)

        return () => {
            clearTimeout(timeOutRedirect);
        }
    }, [])

    return (
        <>
            <Row className='d-flex justify-content-center align-content-center h-100'>
                <Col md={6} className=''>
                    <Alert key='success' variant='success' className='mb-5'>
                        <h1 className=''>Order is successfully completed</h1>
                        <p>You will be redirected in {remain} seconds</p>
                    </Alert>
                </Col>
            </Row>
        </>
    );
};

export default OrderCompleted;