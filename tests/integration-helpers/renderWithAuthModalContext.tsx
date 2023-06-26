import React from "react";
import {render} from "@testing-library/react";
import {AuthModalContextProvider} from "../../src/contexts/authModal-context/authModal-context";

export const renderWithAuthModalContext = (component: any) => {

    return (
        render(
            <AuthModalContextProvider>
                {component}
            </AuthModalContextProvider>
        )
    )
}