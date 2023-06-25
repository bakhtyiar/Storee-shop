import React from 'react';
import {Col, Row} from "react-bootstrap";
import FormTextField from "../../formikElements/FormTextField";
import FormSelectField from "../../formikElements/FormSelectField";
import {states} from "../../../utils/constants";

const CourierFormSection = () => {
    return (
        <div data-testid={"courier-form-section"}>
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
                    data-testid="select-list"
                >
                    <>
                        <option value={''} disabled>Choose...</option>
                        {states.map((state) => (
                            <option key={state.value}
                                    value={state.value} data-testid={`active-state-option`}>{state.label}</option>
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
        </div>
    );
};

export default CourierFormSection;