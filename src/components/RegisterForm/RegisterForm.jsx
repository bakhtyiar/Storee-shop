import React, {useContext} from 'react';
import {Button, Col, Form, Modal} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {RootContext} from "../../contexts/root-context/root-context";
import * as yup from 'yup';
import {Formik} from 'formik';
import {routes} from "../../utils/constants";
import {AuthModalContext} from "../../contexts/authModal-context/authModal-context";
import {BurgerMenuContext} from "../../contexts/burgerMenu-context/burgerMenu-context";
import {registerUser} from "../../utils/server-api/user/user";
import FormTextField from "../formikElements/FormTextField";

const schema = yup.object().shape({
    username: yup.string()
        .min(6, 'Username is too short. Required minimum 6 symbols')
        .max(50, 'Username is too long. Required maximum 50 symbols')
        .required('Username is required'),
    email: yup.string()
        .email('Seems like wrong format of email')
        .required('Email is required'),
    password: yup.string()
        .min(6, 'Password is too short. Write at least 6 symbols')
        .required('Password is required'),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

const RegisterForm = ({isHaveCloseButton = false}) => {
    const {authUserState: {onLogin}} = useContext(RootContext);
    const {onHide: hideBurgerMenu} = useContext(BurgerMenuContext);
    const {onSwitchType, onHide} = useContext(AuthModalContext);
    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {
        const {username, email, password} = values;
        const res = await registerUser(username, email, password);
        if (res.message) {
            actions.setFieldError('general', res.message);
            actions.setSubmitting(false);
            return ;
        }
        onLogin(res);
        onHide();
        hideBurgerMenu();
        navigate(`${routes.profile.path}`);
    };

    return (
        <Formik
            validationSchema={schema}
            validateOnBlur
            onSubmit={handleSubmit}
            initialValues={{
                username: '',
                email: '',
                password: '',
                terms: false,
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
                <Form noValidate onSubmit={handleSubmit} data-testid={"register-form"}>
                    <Modal.Header closeButton={isHaveCloseButton}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Register
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={'mb-3'}>
                            <FormTextField
                                as={Col}
                                controlId="formBasicUsername"
                                label='Username'
                                placeholder='Enter username'
                                name='username'
                                type='text'
                            />
                        </div>
                        <div className={'mb-3'}>
                            <FormTextField
                                as={Col}
                                controlId="formBasicEmail"
                                label='Email'
                                placeholder='Enter email'
                                name='email'
                                formBottomText={'We\'ll never share your confidential data'}
                                type='email'
                            />
                        </div>
                        <div className={'mb-3'}>
                            <FormTextField
                                as={Col}
                                controlId="formBasicPassword"
                                label='Password'
                                placeholder='Enter password'
                                name='password'
                                type='password'
                            />
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="Agree to terms and conditions"
                                required
                                feedback={errors.terms}
                                feedbackType="invalid"
                                name="terms"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.terms && !errors.terms}
                                isInvalid={touched.terms && !!errors.terms}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-between'>
                        <Link as={Button} onClick={onSwitchType}>Already have an account?</Link>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Modal.Footer>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;

