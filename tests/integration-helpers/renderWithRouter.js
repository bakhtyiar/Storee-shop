import {MemoryRouter} from "react-router-dom";
import AppRoutes from "../../src/appRoutes";
import {render} from "@testing-library/react";


export const renderWithRouter = (component, initialRoute = '/') => {
    return (
        render(
            <MemoryRouter initialEntries={[initialRoute]}>
                <AppRoutes/>
                {component}
            </MemoryRouter>
        )
    )
}