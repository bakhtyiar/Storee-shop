import React from 'react';
import {Container} from "react-bootstrap";

const Footer = () => {
    return (
        <Container fluid style={{'backgroundColor': '#212529', 'color': '#ececec', 'padding': '48px 0', 'display': 'flex', 'flex': '0 0 auto'}}>
            <Container style={{'display': 'flex', 'justify-content': 'center'}}>
                Copyright © 3000, All Rights Reserved
            </Container>
        </Container>
    );
};

export default Footer;
