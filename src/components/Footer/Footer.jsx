import React from 'react';
import {Container} from "react-bootstrap";

const Footer = () => {
    return (
        <Container
            fluid
            className='bg-dark text-light mt-3 py-3 px-0 d-flex flex-grow-0 flex-shrink-0 '
        >
            <Container className='d-flex justify-content-center'>
                Copyright © 3000, All Rights Reserved
            </Container>
        </Container>
    );
};

export default Footer;
