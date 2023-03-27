import {render} from "@testing-library/react";
import {BurgerMenuContextProvider} from "../../contexts/burgerMenu-context/burgerMenu-context";

export const renderWithBurgerMenuContext = (component) => {

    return (
        render(
            <BurgerMenuContextProvider>
                {component}
            </BurgerMenuContextProvider>
        )
    )
}