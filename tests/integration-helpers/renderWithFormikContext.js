import {render} from "@testing-library/react";
import {Formik} from "formik";

export const renderWithFormikContext = (component) => {

    return (
        render(
            <Formik>
                {component}
            </Formik>
        )
    )
}