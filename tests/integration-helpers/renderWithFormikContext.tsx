import React, {JSXElementConstructor, ReactElement} from "react";
import {render} from "@testing-library/react";
import {Formik} from "formik";

export const renderWithFormikContext = (component: ReactElement<any, string | JSXElementConstructor<any>>) => {

    return (
        render(
            <Formik
                initialValues={{blob: 0}}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    actions.setSubmitting(false);
                }}
            >
                {component}
            </Formik>
        )
    )
};