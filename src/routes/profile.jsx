import React, {useContext, useState} from 'react';
import {Button, Card, Col, Form, Image, Modal, Row} from "react-bootstrap";
import {RootContext} from "../contexts/root-context/root-context";
import avatarPlaceholder from "../assets/img/personalisation/avatar-placeholder.png";
import {useNavigate} from "react-router-dom";
import {routes, shipmentMethods, states} from "../utils/constants";
import * as yup from "yup";
import {Formik} from "formik";
import {updateUser} from "../utils/server-api/user/user";
import FormTextField from "../components/formikElements/FormTextField";
import FormSelectField from "../components/formikElements/FormSelectField";
import {AuthModalContext} from "../contexts/authModal-context/authModal-context";

const schema = yup.object().shape({
    avatar: yup.string(),
    firstName: yup.string()
        .required('Required')
        .min(2, 'firstName is too short. Required minimum 6 symbols')
        .max(50, 'firstName is too long. Required maximum 50 symbols'),
    lastName: yup.string()
        .required('Required')
        .min(2, 'lastName is too short. Required minimum 6 symbols')
        .max(50, 'lastName is too long. Required maximum 50 symbols'),
    username: yup.string()
        .required('Required')
        .min(6, 'Username is too short. Required minimum 6 symbols')
        .max(50, 'Username is too long. Required maximum 50 symbols'),
    email: yup.string()
        .email('Seems like wrong format of email'),
    newPassword: yup.string()
        .min(6),
    address: yup.string()
        .required('Required')
        .min(6, 'Address is too short. Required minimum 6 symbols'),
    city: yup.string()
        .when('shipmentMethod', {
            is: (value) => ([shipmentMethods.courier.value, shipmentMethods.airDrone.value, shipmentMethods.postOffice.value].includes(value)),
            then: yup.string().required('Required').min(3, 'City\'s name is too short. Required minimum 3 symbols'),
        }),
    state: yup.string()
        .when('shipmentMethod', {
            is: (value) => ([shipmentMethods.courier.value, shipmentMethods.airDrone.value, shipmentMethods.postOffice.value].includes(value)),
            then: yup.string().required('Required').min(2, 'State\'s name is too short. Required minimum 2 symbols'),
        }),
    postalCode: yup.string().required('Required')
        .matches(/^\d+$/, 'The field should have digits only')
        .length(5, 'Postalcode is required to be 5 symbols'),
});

const Profile = () => {
    const {authUserState} = useContext(RootContext);
    const {onRegister, onLogin} = useContext(AuthModalContext);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [show, setShow] = useState(false);
    const [bufferedPersonalData, setBufferedPersonalData] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
        authUserState.onLogout();
        navigate(routes.home.path);
    }

    const handleEditProfile = async () => {
        setIsEditing(true);
    };

    const handleCancelEditProfile = async () => {
        setIsEditing(false);
    };

    const handleSaveChanges = (values, touched) => {
        let editedPersonalData = {};
        for (let property in values) {
            if (property in touched)
                editedPersonalData[property] = values[property];
        }
        if (editedPersonalData.newPassword && editedPersonalData.newPassword.length === 0) {
            delete editedPersonalData.newPassword;
        }
        setBufferedPersonalData(editedPersonalData);
        handleShow();
    };

    const handleSubmitChanges = async () => {
        const res = await updateUser(authUserState.id, bufferedPersonalData);
        authUserState.onLogout();
        authUserState.onLogin(res);
        handleClose();
        handleCancelEditProfile();
    };

    let initialValues = {
        avatar: authUserState.image || avatarPlaceholder,
        firstName: authUserState.firstName,
        lastName: authUserState.lastName,
        username: authUserState.username,
        email: authUserState.email,
        newPassword: '',
        address: authUserState.address.address,
        city: authUserState.address.city,
        state: authUserState.address.state,
        postalCode: authUserState.address.postalCode,
    };

    return (
        <>
            {!authUserState.isLoggedIn && <div className='d-flex align-content-center h-100 justify-content-center pb-4 mb-4 flex-column' data-testid="error-no-personal-profile-page">
                <h1 className='align-self-center text-center'>You are not logged in</h1>
                <p className='align-self-center text-center'>Login to your account or create one to get access to this page</p>
                <div className='d-flex justify-content-center mb-4 pb-4'>
                    <Button variant='outline-dark'
                            className='mx-2'
                            onClick={() => onRegister()}
                            data-testid='register-btn-desktop'
                    >
                        Register
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => onLogin()}
                        data-testid='login-btn-desktop'
                    >
                        Login
                    </Button>
                </div>
            </div>}
            {authUserState.isLoggedIn && <Formik
                validationSchema={schema}
                validateOnBlur
                onSubmit={handleSubmitChanges}
                initialValues={initialValues}
                enableReinitialize={true}
            >
                {({
                      handleSubmit, handleChange, handleBlur, values, touched, errors,
                  }) => (<>
                    <Form noValidate>
                        <div className='d-flex justify-content-between'>
                            <h2 className={'mb-4'}>Profile</h2>
                            <div>
                                {!isEditing && <Button variant="outline-primary" onClick={handleEditProfile}
                                                       className={'mx-2 px-4'}>Edit</Button>
                                }
                                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                            </div>
                        </div>
                        <Card body>
                            <Row>
                                <Col className='mb-4' md={4}>
                                    <Row>
                                        <div className='d-flex justify-content-center mt-4'>
                                            <Image
                                                src={values.avatar}
                                                alt="Profile's avatar"
                                                roundedCircle
                                                style={{
                                                    width: '128px', height: '128px',
                                                    border: '1px solid lightGray',
                                                }}
                                                className='mb-3'
                                            />
                                        </div>
                                        {isEditing && <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Load file to update avatar</Form.Label>
                                            <Form.Control type="file"/>
                                        </Form.Group>}
                                    </Row>
                                </Col>
                                <Col className='d-flex flex-column gap-3 my-3' md={8}>
                                    <Row>
                                        {isEditing ?
                                            <FormTextField
                                                as={Col}
                                                controlId="formBasicName"
                                                label='Name'
                                                placeholder='Enter your name'
                                                name='firstName'
                                                type='text'
                                            />
                                            :
                                            <Col>Name <br/>{authUserState.firstName}</Col>
                                        }
                                        {isEditing ?
                                            <FormTextField
                                                as={Col}
                                                controlId="formBasicSurname"
                                                label='Surname'
                                                placeholder='Enter your surname'
                                                name='lastName'
                                                type='text'
                                            />
                                            :
                                            <Col>Surname <br/>{authUserState.lastName}</Col>}
                                    </Row>
                                    <Row>
                                        {isEditing ?
                                            <FormTextField
                                                as={Col}
                                                controlId="formBasicEmail"
                                                label='Email'
                                                placeholder='Enter your email'
                                                name='email'
                                                type='email'
                                            />
                                            :
                                            <Col>Email <br/>{authUserState.email}
                                            </Col>}
                                        {isEditing ?
                                            <FormTextField
                                                as={Col}
                                                controlId="formBasicUsername"
                                                label='Username'
                                                placeholder='Enter your username'
                                                name='username'
                                                type='text'
                                            />
                                            :
                                            <Col>Username <br/>{authUserState.username} </Col>}
                                    </Row>
                                    <Row>
                                        {isEditing ?
                                            <FormTextField
                                                as={Col}
                                                controlId="formBasicNewPassword"
                                                label='New password'
                                                placeholder='New password'
                                                name='newPassword'
                                                type='text'
                                            />
                                            :
                                            <Col>Password <br/>****** </Col>}
                                    </Row>
                                    <hr className={'mx-2'}/>
                                    <Row>
                                        {isEditing ?
                                            <FormTextField
                                                as={Col}
                                                controlId="formGridAddress1"
                                                label='House and street'
                                                placeholder='1234 Main St'
                                                name='address'
                                                type='text'
                                            />
                                            :
                                            <Col>Address <br/>{authUserState.address.address}
                                            </Col>}
                                        {isEditing ?
                                            <FormTextField
                                                as={Col}
                                                controlId="formGridCity"
                                                label='City'
                                                placeholder='New York'
                                                name='city'
                                                type='text'
                                            />
                                            :
                                            <Col>City <br/>{authUserState.address.city} </Col>}
                                    </Row>
                                    <Row>
                                        {isEditing ?
                                            <FormSelectField
                                                as={Col}
                                                controlId="formGridState"
                                                label='State'
                                                placeholder='New York'
                                                name='state'
                                                type='text'
                                            >
                                                <>
                                                    <option value={''} disabled>Choose...</option>
                                                    {states.map((state) => (
                                                        <option key={state.value}
                                                                value={state.value}>{state.label}</option>
                                                    ))}
                                                </>
                                            </FormSelectField>
                                            :
                                            <Col>State <br/>{authUserState.address.state}
                                            </Col>}
                                        {isEditing ?
                                            <FormTextField
                                                as={Col}
                                                controlId="formGridZip"
                                                label='Zip'
                                                placeholder='10000'
                                                name='postalCode'
                                                type='text'
                                            />
                                            :
                                            <Col>Postal code <br/>{authUserState.address.postalCode}</Col>}
                                    </Row>
                                </Col>
                            </Row>


                            {isEditing && <div className={'d-flex justify-content-end mt-3'}>
                                <Button variant="outline-secondary" onClick={handleCancelEditProfile}
                                        className={'mx-2 px-3'}>Cancel editing</Button>
                                <Button variant="primary" className={'px-4'}
                                        disabled={Object.keys(touched).length === 0}
                                        onClick={() => handleSaveChanges(values, touched)}>Save
                                    changes</Button>
                            </div>}
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Are you sure to save changes?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Press submit to save changes to your profile, otherwise press
                                    close</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleSubmitChanges}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Card>
                    </Form>
                </>)}
            </Formik>}
        </>);
};

export default Profile;
