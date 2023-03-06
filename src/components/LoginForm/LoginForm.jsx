import React, {useContext} from 'react';
import {Button, Col, Form, Modal} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {RootContext} from "../../contexts/root-context/root-context";
import * as yup from "yup";
import {Formik} from "formik";
import {AuthModalContext} from "../../contexts/authModal-context/authModal-context";
import {BurgerMenuContext} from "../../contexts/burgerMenu-context/burgerMenu-context";
import {getCart} from "../../utils/server-api/cart/cart";
import {loginUser} from "../../utils/server-api/user/user";
import {routes} from "../../utils/constants";
import {initialState} from "../../contexts/root-context/initialState";
import FormTextField from "../formikElements/FormTextField";

//todo : remake login and register logic

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

const LoginForm = ({isHaveCloseButton = false}) => {
    const {authUserState: {onLogin}, cartState: {onSetCart}} = useContext(RootContext);
    const {onHide: hideBurgerMenu} = useContext(BurgerMenuContext);
    const {onSwitchType, onHide} = useContext(AuthModalContext);
    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {
        const {username, password} = values;
        const res = await loginUser(username, password);
        //tried to refactor & use .then.catch try{}catch(e){}, but cant get [[PromiseResult]] out from loginUser()
        if (res.message) { //message appears on 400 error
            actions.setFieldError('general', res.message);
            actions.setSubmitting(false);
            return ;
        }
        onLogin(res);
        const cart = await getCart(res.id);
        console.log('cart', cart);
        if (cart === undefined) {
            onSetCart(initialState.cartState);
        } else {
            onSetCart(cart);
        }
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
                    <Modal.Header closeButton={isHaveCloseButton}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Login
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
                                label="Do not remember session on this computer"
                                feedback={errors.forgetSession}
                                feedbackType="invalid"
                                name="terms"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.forgetSession && !errors.forgetSession}
                                isInvalid={touched.forgetSession && !!errors.forgetSession}
                            />
                        </Form.Group>
                        <h6 className='text-danger'>
                            {errors.general}
                        </h6>
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-between'>
                        <Link as={Button} onClick={onSwitchType}>Doesn't have an account?</Link>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Modal.Footer>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;

