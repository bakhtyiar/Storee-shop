import React, {useContext} from 'react';
import {Modal} from "react-bootstrap";
import LoginForm from "./loginForm";
import RegisterModal from "./registerModal";
import {RootContext} from "../contexts/root-context";

const AuthModal = (props) => {
    const {authModalState: { authType } } = useContext(RootContext);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {authType === 'login' && <LoginForm/>}
            {authType === 'register' && <RegisterModal/>}
        </Modal>
    );
};

export default AuthModal;

