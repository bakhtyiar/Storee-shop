import React from 'react';
import {Card, Form} from "react-bootstrap";

const TermsForm = ({touched, errors, handleChange, handleBlur}) => {
    return (
        <Card body>
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
        </Card>
    );
};

export default TermsForm;