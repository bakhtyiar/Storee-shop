import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import Header from './components/Header/Header';
import AppRoutes from "./appRoutes";
import Footer from "./components/Footer/Footer";
import {useContext, useEffect} from "react";
import {RootContext} from "./contexts/root-context/root-context";
import {initialState} from "./contexts/root-context/initialState";
import {AuthModalContextProvider} from "./contexts/authModal-context/authModal-context";
import {BurgerMenuContextProvider} from "./contexts/burgerMenu-context/burgerMenu-context";
import {getCookie} from "./utils/cookies/cookies";
import {getUser} from "./utils/server-api/user/user";
import {getCart, getLocalCart} from "./utils/server-api/cart/cart";
import {userKey} from "./utils/constants";
import {Container} from "react-bootstrap";

function ErrorFallback({
    error,
    resetErrorBoundary
}: any) {
    return (<div role="alert">
        \n
        <p>Something went wrong:</p>

        <pre>{error.message}</pre>

        <button onClick={resetErrorBoundary}>Try again</button>
    </div>)
}

function App() {
    const {authUserState: {isLoggedIn, id, onLogin}, cartState: {onSetCart}, themeState: {theme}} = useContext(RootContext);

    useEffect( () => {
        document.body.dataset.bsTheme = theme;
    }, [theme])

    useEffect(() => {
        const authCookie = getCookie(userKey);
        if (authCookie !== undefined && authCookie !== '-1') {
            getUser(authCookie).then((res) => {
                onLogin(res);
            })
        }
        if (isLoggedIn) {
            getCart(id)
                .then((res) => {
                    res.products ?
                        onSetCart(res) :
                        onSetCart(initialState.cartState);
                })
        } else {
            onSetCart(getLocalCart() || initialState.cartState);
        }
    }, []);

    return (<>

        <BurgerMenuContextProvider>

            <AuthModalContextProvider>

                <Header/>
            </AuthModalContextProvider>
        </BurgerMenuContextProvider>

        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                // reset the state of your app so the error doesn't happen again
            }}
        >

            <div className='d-flex flex-grow-1 pt-4'>

                <Container>

                    <AppRoutes/>
                </Container>
            </div>
        </ErrorBoundary>

        <Footer/>
    </>);
}

export default App;
