import React, {useContext} from 'react';
import {Modal} from "react-bootstrap";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import {AuthModalContext} from "../../contexts/authModal-context/authModal-context";

const AuthModal = (props) => {
    const { authType } = useContext(AuthModalContext);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {authType === 'login' && <LoginForm isHaveCloseButton={true}/>}
            {authType === 'register' && <RegisterForm isHaveCloseButton={true}/>}
        </Modal>
    );
};

export default AuthModal;

