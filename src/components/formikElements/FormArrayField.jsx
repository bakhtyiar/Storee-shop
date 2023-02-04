import React from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import { FieldArray } from "formik";
import FormTextField from "./FormTextField";

function FormArrayField({ arr }) {
    return (
        <FieldArray
            name="listItems"
            render={arrayHelpers => (
                <>
                    {arr && arr.length > 0 ? (
                        arr.map((arr, index) => (
                            <Card key={index}>
                                <Card.Header>
                                    <Card.Title>List items: {index + 1}</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form.Row>
                                        <FormTextField
                                            as={Col}
                                            sm="4"
                                            controlId={`items.${index}.firstName`}
                                            label="First name"
                                            type="text"
                                            name={`items.${index}.firstName`}
                                        />
                                        <FormTextField
                                            as={Col}
                                            sm="4"
                                            controlId={`items.${index}.lastName`}
                                            label="Last name"
                                            type="text"
                                            name={`items.${index}.lastName`}
                                        />
                                    </Form.Row>
                                </Card.Body>
                                <Card.Footer>
                                    <Button
                                        type="button"
                                        variant="outline-danger"
                                        size="lg"
                                        onClick={() => arrayHelpers.remove(index)} // remove item from the list
                                    >
                                        -
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline-success"
                                        size="lg"
                                        onClick={() =>
                                            arrayHelpers.push({
                                                firstName: "",
                                                lastName: ""
                                            })
                                        }
                                    >
                                        +
                                    </Button>
                                </Card.Footer>
                            </Card>
                        ))
                    ) : (
                        <Button type="button" onClick={() => arrayHelpers.push("")}>
                            Add item
                        </Button>
                    )}
                </>
            )}
        />
    );
}

export default FormArrayField;
