import {ErrorBoundary} from 'react-error-boundary'
import Header from './components/header';
import AppRoutes from "./appRoutes";

function ErrorFallback({error, resetErrorBoundary}) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

function App() {
    let authUser = {
        isAuth: false,
        id: 0,
    };

    return (
            <div>
                <Header authUser={authUser}/>
                <div>
                    <ErrorBoundary
                        FallbackComponent={ErrorFallback}
                        onReset={() => {
                            // reset the state of your app so the error doesn't happen again
                        }}
                    >
                        <AppRoutes authUser={authUser}/>
                    </ErrorBoundary>
                </div>
            </div>
    );
}

export default App;
