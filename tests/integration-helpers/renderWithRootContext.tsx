import React from "react";
import {render} from "@testing-library/react";
import {RootContextProvider} from "../../src/contexts/root-context/root-context";

export const renderWithRootContext = (component: any) => {

    return (
        render(
            <RootContextProvider>
                {component}
            </RootContextProvider>
        )
    )
}