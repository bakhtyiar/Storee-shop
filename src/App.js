import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './routes/home';
import {routes} from './utils/constants';
import News from './routes/news';
import Products from './routes/products';
import NotFound from './routes/notFound';
import {ErrorBoundary} from 'react-error-boundary'
import Product from './routes/product';
import Header from './components/header';
import Profile from "./routes/profile";

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
                    <Routes>
                        <Route path={routes.home.path} element={<Home/>}/>
                        <Route path={routes.products.path} element={<Navigate to={routes.products.path + "/1"} replace={true}/>}/>
                        <Route path={routes.products.path + "/:page"} element={<Products/>}/>
                        <Route path={routes.product.path} element={<Navigate to=""/>}/>
                        <Route path={routes.product.path + "/:id"} element={<Product/>}/>
                        <Route path={routes.news.path} element={<News/>}/>
                        <Route path={routes.user.path} element={<Navigate to={routes.home.path} replace={true}/>}/>
                        <Route path={routes.user.path + "/:id"} element={<Profile authUser={authUser}/>}/>
                        <Route path="*" element={<Navigate to={routes.notFound.path}/>}/>
                        <Route path={routes.notFound.path} element={<NotFound/>}/>
                    </Routes>
                </ErrorBoundary>
            </div>
        </div>
    );
}

export default App;
