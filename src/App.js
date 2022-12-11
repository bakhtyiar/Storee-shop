import {ErrorBoundary} from 'react-error-boundary'
import Header from './components/Header/Header';
import AppRoutes from "./appRoutes";
import Footer from "./components/Footer/Footer";
import {useContext, useEffect} from "react";
import {RootContext} from "./contexts/root-context";
import {getCart, getCookie, getLocalCart, getUser} from "./utils/methods";
import {initialState} from "./contexts/initialState";
import {AuthModalContextProvider} from "./contexts/authModal-context";
import {BurgerMenuContextProvider} from "./contexts/burgerMenu-context";

function ErrorFallback({error, resetErrorBoundary}) {
    return (<div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>)
}

//todo : add cookie auth mechanism for saving data about you are already logged in
function App() {
    const {authUserState: {isLoggedIn, id, onLogin}, cartState: {onSetCart}} = useContext(RootContext);
    useEffect(() => {
        const authCookie = getCookie('user');
        if (authCookie !== undefined && authCookie !== -1) {
            getUser(authCookie).then((res) => {
                onLogin(res);
                console.log('cookie login res', res)
            })
        }
        if (isLoggedIn) {
            getCart(id).then((res) => {
                onSetCart(res);
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
                <div className='d-flex flex-grow-1'>
                    <AppRoutes/>
                </div>
            </ErrorBoundary>
            <Footer/>
        </>);
}

export default App;
