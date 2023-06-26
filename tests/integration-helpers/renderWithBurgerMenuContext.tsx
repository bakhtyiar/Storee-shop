import React from "react";
import {render} from "@testing-library/react";
import {BurgerMenuContextProvider} from "../../src/contexts/burgerMenu-context/burgerMenu-context";

export const renderWithBurgerMenuContext = (component: any) => {

    return (
        render(
            <BurgerMenuContextProvider>
                {component}
            </BurgerMenuContextProvider>
        )
    )
}