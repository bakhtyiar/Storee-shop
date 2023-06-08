import {createReduxStore} from "../../store/store";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import AppRoutes from "../../appRoutes";
import {render} from "@testing-library/react";
import {RootContextProvider} from "../../contexts/root-context/root-context";

export const renderTestApp = (component, options) => {
    const store = createReduxStore(options?.initialState);

    return (
        render(
            <RootContextProvider>
                <Provider store={store}>
                    <MemoryRouter initialEntries={[options?.route]}>
                        <AppRoutes/>
                        {component}
                    </MemoryRouter>
                </Provider>
            </RootContextProvider>
        )
    )
}