import {render} from "@testing-library/react";
import {Formik} from "formik";

export const renderWithFormikContext: React.FC<React.ComponentType> = (component) => {

    return (
        render(
            <Formik>
                {component}
            </Formik>
        )
    )
}