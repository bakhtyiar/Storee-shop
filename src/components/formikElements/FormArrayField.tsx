import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import { FieldArray } from "formik";
import FormTextField from "./FormTextField";
//todo: complete component, update logic push for arrhelpers, provide value to fields & etc.
function FormArrayField({
    arr
}: any) {
    return (
        <FieldArray
            name="listItems"
            data-testid={"form-array-field"}
            render={arrayHelpers => (
                <>
                    {arr && arr.length > 0 ? (
                        arr.map((arr: any, index: any) => (
                            <Card key={index}>
                                
                                <Card.Header>
                                    
                                    <Card.Title>List items: {index + 1}</Card.Title>
                                </Card.Header>
                                
                                <Card.Body>
                                    
                                    <Row>
                                        
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
                                    </Row>
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
                        <Button type="button" onClick={() => arrayHelpers.push("")} data-testid={"add-item"}>
                            Add item
                        </Button>
                    )}
                </>
            )}
        />
    );
}

export default FormArrayField;
