import React from 'react';
import {warehouses} from "../../../utils/constants";
import {Form} from "react-bootstrap";
import {Field} from "formik";

const WarehouseAddressesFormSection = ({
    as,
    name,
    notInline,
    type,
    label
}: any) => {
    return (
        <Form.Group data-testid="warehouse-addresses-form-section">
            
            <h6>{label || 'Warehouse address'}</h6>
            {
                warehouses.map((warehouse, index) => (
                    <Form.Check
                        as={as || Field}
                        inline={!notInline}
                        name={name || "address"}
                        label={warehouse.address}
                        value={warehouse.address}
                        type={type || 'radio'}
                        id={`warehouse-${index}`}
                        key={`warehouse-${index}`}
                    />
                ))
            }
        </Form.Group>
    );
};

export default WarehouseAddressesFormSection;