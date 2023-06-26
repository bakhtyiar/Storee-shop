import React from "react";
import {Form, InputGroup} from "react-bootstrap";
import {Field} from "formik";

const FormSelectField = ({
    as,
    md,
    controlId,
    label,
    name,
    type,
    inputGroupPrepend,
    children,
    defaultValue
}: any) => {
    return (
        <Field name={name}>
            {({
                field,
                form
            }: any) => {
                const isValid = !form.errors[field.name];
                const isInvalid = form.touched[field.name] && !isValid;
                return (
                    <Form.Group as={as} md={md} controlId={controlId} data-testid="form-select-field">
                        
                        <Form.Label>{label}</Form.Label>
                        
                        <InputGroup>
                            {inputGroupPrepend}
                            
                            <Form.Select
                                defaultValue={defaultValue}
                                className={'rounded'}
                                {...field}
                                type={type}
                                isValid={form.touched[field.name] && isValid}
                                isInvalid={isInvalid}
                                feedback={form.errors[field.name]}
                                as="select"
                            >
                                {children}
                            </Form.Select>
                            
                            <Form.Control.Feedback type="invalid">
                                {form.errors[field.name]}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                );
            }}
        </Field>
    );
};

FormSelectField.defaultProps = {
    type: "select",
    inputGroupPrepend: null
};

export default FormSelectField;
