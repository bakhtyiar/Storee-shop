import React, {useContext} from 'react';
import FormTextField from "../../../utils/formik/FormTextField";
import {Col, Row} from "react-bootstrap";
import FormSelectField from "../../../utils/formik/FormSelectField";
import {states} from "../../../utils/constants";
import {RootContext} from "../../../contexts/root-context/root-context";

const PostOfficeFormSection = () => {
    const {authUserState} = useContext(RootContext);

    return (
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
    );
};

export default PostOfficeFormSection;