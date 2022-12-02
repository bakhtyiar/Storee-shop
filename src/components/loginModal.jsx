import React, {useContext} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {RootContext} from "../contexts/root-context";
import * as yup from "yup";
import {loginUser} from "../utils/methods";
import {routes} from "../utils/constants";
import {Formik} from "formik";

const schema = yup.object().shape({
    username: yup.string()
        .min(6, 'Username is too short. Required minimum 6 symbols')
        .max(50, 'Username is too long. Required maximum 50 symbols')
        .required('Username is required'),
    password: yup.string()
        .min(6, 'Password is too short. Write at least 6 symbols')
        .required('Password is required'),
    forgetSession: yup.bool(),
});

const LoginModal = () => {
    const {authModalState: {onSwitchType, onHide}, authUserState: {onLogin, id}} = useContext(RootContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        console.log('event', event);
        const {username, password} = event;
        const res = await loginUser(username, password);
        console.log('res', res);
        onLogin(res);
        onHide();
        navigate(`${routes.user.path}/${res.id}`);
    };

    return (
        <Formik
            validationSchema={schema}
            validateOnBlur
            onSubmit={handleSubmit}
            initialValues={{
                username: '',
                password: '',
                forgetSession: false,
            }}
        >
            {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.username && !errors.username}
                                isInvalid={touched.username && !!errors.username}
                            />
                            <Form.Text className="text-muted">
                                {touched.username && errors.username}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.password && !errors.password}
                                isInvalid={touched.password && !!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {touched.password && errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="Do not remember session on this computer"
                                required
                                feedback={errors.forgetSession}
                                feedbackType="invalid"
                                name="terms"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.forgetSession && !errors.forgetSession}
                                isInvalid={touched.forgetSession && !!errors.forgetSession}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer style={{'display': 'flex', 'justifyContent': 'space-between'}}>
                        <Link onClick={onSwitchType}>Doesn't have an account?</Link>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Modal.Footer>
                </Form>
            )}
        </Formik>
    );
};

export default LoginModal;

