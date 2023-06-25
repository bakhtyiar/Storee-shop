import React from "react";
import {Form, InputGroup} from "react-bootstrap";
import {Field} from "formik";

const FormTextField = ({
                           as,
                           md,
                           controlId,
                           label,
                           name,
                           type,
                           inputGroupPrepend,
                           placeholder,
                           formBottomText
                       }) => {
    return (
        <Field name={name}>
            {({field, form}) => {
                const isValid = !form.errors[field.name];
                const isInvalid = form.touched[field.name] && !isValid;
                return (
                    <Form.Group as={as} md={md} controlId={controlId} data-testid={"form-text-field"}>
                        <Form.Label>{label}</Form.Label>
                        <InputGroup>
                            {inputGroupPrepend}
                            <Form.Control
                                className={'rounded'}
                                {...field}
                                type={type}
                                isValid={form.touched[field.name] && isValid}
                                isInvalid={isInvalid}
                                feedback={form.errors[field.name]}
                                placeholder={placeholder}
                            />

                            <Form.Control.Feedback type="invalid" data-testid="error-feedback">
                                {form.errors[field.name]}
                            </Form.Control.Feedback>
                        </InputGroup>
                        {formBottomText && (
                            <>
                                <Form.Text className="text-muted">
                                    {formBottomText}
                                </Form.Text>
                            </>
                        )}
                    </Form.Group>
                );
            }}
        </Field>
    );
};

FormTextField.defaultProps = {
    type: "text",
    inputGroupPrepend: null
};

export default FormTextField;
