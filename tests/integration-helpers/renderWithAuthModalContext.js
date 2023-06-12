import {render} from "@testing-library/react";
import {AuthModalContextProvider} from "../../src/contexts/authModal-context/authModal-context";

export const renderWithAuthModalContext = (component) => {

    return (
        render(
            <AuthModalContextProvider>
                {component}
            </AuthModalContextProvider>
        )
    )
}