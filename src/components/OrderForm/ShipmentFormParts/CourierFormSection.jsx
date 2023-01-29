import React, {useContext} from 'react';
import {Col, Row} from "react-bootstrap";
import FormTextField from "../../../utils/formik/FormTextField";
import FormSelectField from "../../../utils/formik/FormSelectField";
import {states} from "../../../utils/constants";
import {RootContext} from "../../../contexts/root-context/root-context";

const CourierFormSection = () => {
    const {authUserState} = useContext(RootContext);

    return (
        <>
            <Row className="mb-3">
                <FormTextField
                    as={Col}
                    controlId="formGridAddress1"
                    label='House and street'
                    placeholder='1234 Main St'
                    name='address'
                    type='text'
                />
            </Row>
            <Row>
                <FormTextField
                    as={Col}
                    controlId="formGridCity"
                    label='City'
                    placeholder='New York'
                    name='city'
                    type='text'
                />
                <FormSelectField
                    as={Col}
                    controlId="formGridState"
                    label='State'
                    placeholder='New York'
                    name='state'
                    type='text'
                    defaultValue={authUserState.isLoggedIn && authUserState.address.state ? authUserState.address.state : 'Choose...'}
                >
                    <>
                        <option disabled>Choose...</option>
                        {states.map((state) => (
                            <option key={state.value}
                                    value={state.value}>{state.label}</option>
                        ))}
                    </>
                </FormSelectField>
                <FormTextField
                    as={Col}
                    controlId="formGridZip"
                    label='Zip'
                    placeholder='10000'
                    name='postalCode'
                    type='text'
                />
            </Row>
        </>
    );
};

export default CourierFormSection;