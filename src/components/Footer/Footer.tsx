import React, {useContext} from 'react';
import {Container, Form} from "react-bootstrap";
import {RootContext} from "../../contexts/root-context/root-context";
import {capitalizeStr} from "../../utils/str/str";

const Footer = () => {
    const {themeState: {theme, onSwitchTheme}} = useContext(RootContext);

    return (
        <Container
            fluid
            className='bg-dark text-light mt-3 py-3 px-0 d-flex flex-grow-0 flex-shrink-0 '
            data-testid='footer'
        >
            
            <Container className='d-flex justify-content-between'>
                <span>Copyright © 3000, All Rights Reserved</span>
                <Form.Check
                    reverse
                    type="switch"
                    id="theme-switch"
                    label={`${capitalizeStr(theme)} theme`}
                    onChange={onSwitchTheme}
                />
            </Container>
        </Container>
    );
};

export default Footer;
