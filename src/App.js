import {ErrorBoundary} from 'react-error-boundary'
import Header from './components/Header/Header';
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
    return (
            <div>
                <Header/>
                    <ErrorBoundary
                        FallbackComponent={ErrorFallback}
                        onReset={() => {
                            // reset the state of your app so the error doesn't happen again
                        }}
                    >
                        <AppRoutes/>
                    </ErrorBoundary>
            </div>
    );
}

export default App;
