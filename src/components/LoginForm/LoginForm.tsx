import React, {useContext} from 'react';
import {Button, Col, Form, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {RootContext} from "../../contexts/root-context/root-context";
import * as yup from "yup";
import {Formik, FormikHelpers} from "formik";
import {AuthModalContext} from "../../contexts/authModal-context/authModal-context";
import {BurgerMenuContext} from "../../contexts/burgerMenu-context/burgerMenu-context";
import {getCart} from "../../utils/server-api/cart/cart";
import {loginUser} from "../../utils/server-api/user/user";
import {routes} from "../../utils/constants";
import {initialState} from "../../contexts/root-context/initialState";
import FormTextField from "../formikElements/FormTextField";

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

interface Props {
    isHaveCloseButton?: boolean,
    handleSubmit?: ((values: {
        general: string;
        username: string;
        password: string;
        forgetSession: boolean;
    }, formikHelpers: FormikHelpers<{
        general: string;
        username: string;
        password: string;
        forgetSession: boolean;
    }>) => void | Promise<any>) | null,
}

const LoginForm = ({isHaveCloseButton = false, handleSubmit = null}: Props) => {
    const {authUserState: {onLogin}, cartState: {onSetCart}} = useContext(RootContext);
    const {onHide: hideBurgerMenu} = useContext(BurgerMenuContext);
    const {onSwitchType, onHide} = useContext(AuthModalContext);
    const navigate = useNavigate();

    if (handleSubmit == null) {
        handleSubmit = async (values: any, actions: any) => {
            const {username, password} = values;
            let res;
            let cart;
            try {
                res = await loginUser(username, password);
                onLogin(res, values.forgetSession);
                cart = await getCart(res!.id);
                if (cart === undefined) {
                    onSetCart(initialState.cartState);
                } else {
                    onSetCart(cart);
                }
                onHide();
                hideBurgerMenu();
                navigate(`${routes.profile.path}`);
            } catch (e) {
                if (e instanceof Error) {
                    actions.setFieldError('general', e.message);
                    actions.setSubmitting(false);
                }
            }
        }
    }

    return (
        <Formik
            validationSchema={schema}
            validateOnBlur
            onSubmit={handleSubmit}
            initialValues={{
                general: '',
                username: '',
                password: '',
                forgetSession: false,
            }}
        >
            {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  touched,
                  errors
              }) => (
                <Form noValidate onSubmit={handleSubmit} data-testid="login-form">

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

                        <h6 className='text-danger' data-testid="auth-error-feedback">
                            {errors.general}
                        </h6>
                    </Modal.Body>

                    <Modal.Footer className='d-flex justify-content-between'>

                        <Button variant="link" onClick={onSwitchType}>Doesn't have an account?</Button>

                        <Button variant="primary" type="submit" data-testid='submit-button'>
                            Login
                        </Button>
                    </Modal.Footer>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;

