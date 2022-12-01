import React, {useContext} from 'react';
import {Modal} from "react-bootstrap";
import LoginModal from "./loginModal";
import RegisterModal from "./registerModal";
import {RootContext} from "../contexts/root-context";

const AuthModal = (props) => {
    const {authType} = useContext(RootContext);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {authType == 'login' && <LoginModal/>}
            {authType == 'register' && <RegisterModal/>}
        </Modal>
    );
};

export default AuthModal;

