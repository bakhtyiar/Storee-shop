import {ErrorBoundary} from 'react-error-boundary'
import Header from './components/Header/Header';
import AppRoutes from "./appRoutes";
import Footer from "./components/Footer/Footer";

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
        <>
            <Header/>
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
        </>
    );
}

export default App;
