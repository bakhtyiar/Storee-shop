import {IUser} from "../../utils/server-api/user/user.types";
import {ICart} from "../../utils/server-api/cart/cart.types";

export interface IRootContext {
    authUserState: IAuthUserState,
    themeState: IThemeState,
    cartState: ICartState,
}

export interface IAuthUserState extends IUser{
    isLoggedIn: boolean,
    token: string,
    onLogin: Function,
    onLogout: Function,
}

export interface IThemeState {
    isDark: boolean,
    onSwitchTheme: Function,
}

export interface ICartState extends ICart {
        onAddToCart: Function,
        onRemoveFromCart: Function,
        onCleanCart: Function,
        onSetCart: Function,
        onUpdateQuantity: Function,
}