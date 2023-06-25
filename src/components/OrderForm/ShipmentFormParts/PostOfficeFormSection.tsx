import React from 'react';
import FormTextField from "../../formikElements/FormTextField";
import {Col, Row} from "react-bootstrap";
import FormSelectField from "../../formikElements/FormSelectField";
import {states} from "../../../utils/constants";

const PostOfficeFormSection = () => {
    return (
        <Row data-testid="post-office-form-section">
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
            >
                <>
                    <option value={''} disabled>Choose...</option>
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