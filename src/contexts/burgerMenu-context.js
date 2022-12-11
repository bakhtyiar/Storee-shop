import React, {useState} from "react";

const initialState = {
    isShow: false,
    onShow: () => {
    },
    onHide: () => {
    },
};

export const BurgerMenuContext = React.createContext(initialState);

export const BurgerMenuContextProvider = ({children}) => {
    const [burgerMenu, setBurgerMenu] = useState(initialState);

    const showMenu = () => {
        setBurgerMenu((prevState) => ({
            ...prevState, isShow: true,
        }));
    }

    const hideMenu = () => {
        setBurgerMenu((prevState) => ({
            ...prevState, isShow: false,
        }));
    }

    const state = {
        isShow: burgerMenu.isShow,
        onShow: showMenu,
        onHide: hideMenu,
    };

    return (<BurgerMenuContext.Provider value={state}>
            {children}
        </BurgerMenuContext.Provider>)
};