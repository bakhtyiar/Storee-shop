import React, {useContext} from 'react';
import {Modal} from "react-bootstrap";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import {RootContext} from "../../contexts/root-context";

const AuthModal = (props) => {
    const {authModalState: { authType } } = useContext(RootContext);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {authType === 'login' && <LoginForm isHaveCloseButton={true}/>}
            {authType === 'register' && <RegisterForm/>}
        </Modal>
    );
};

export default AuthModal;

