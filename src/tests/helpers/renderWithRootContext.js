import {render} from "@testing-library/react";
import {RootContextProvider} from "../../contexts/root-context/root-context";

export const renderWithRootContext = (component) => {

    return (
        render(
            <RootContextProvider>
                {component}
            </RootContextProvider>
        )
    )
}