import React, {lazy, Suspense} from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "./utils/constants";
import * as PropTypes from "prop-types";
import {AuthModalContextProvider} from "./contexts/authModal-context/authModal-context";
import LoaderIndicatorCentral from "./components/LoaderIndicator/LoaderIndicatorCental";

const Home = lazy(() => import("./routes/home"))
const Products = lazy(() => import("./routes/products"))
const Product = lazy(() => import("./routes/product"))
const News = lazy(() => import("./routes/news"))
const Profile = lazy(() => import("./routes/profile"))
const NotFound = lazy(() => import("./routes/notFound"))
const Register = lazy(() => import("./routes/register"))
const Login = lazy(() => import("./routes/login"))
const Cart = lazy(() => import("./routes/cart"))
const OrderMaking = lazy(() => import("./routes/orderMaking"))
const OrderCompleted = lazy(() => import("./routes/orderCompleted"))
const NewsPost = lazy(() => import("./components/NewsPost/NewsPost"))

function AppRoutes() {
    return (
        <Suspense fallback={<LoaderIndicatorCentral/>}>
            <Routes>
                <Route path={routes.home.path} element={<Home/>}/>
                <Route path={routes.products.path}
                       element={<Navigate to={routes.products.path + "/1"} replace={true}/>}/>
                <Route path={routes.products.path + "/:page"} element={<Products/>}/>
                <Route path={routes.product.path} element={<Navigate to={routes.products.path}/>}/>
                <Route path={routes.product.path + "/:id"} element={<Product/>}/>
                <Route path={routes.news.path} element={<News/>}/>
                <Route path={routes.newsPost.path} element={<Navigate to={routes.news.path}/>}/>
                <Route path={routes.newsPost.path + "/:id"} element={<NewsPost/>}/>
                <Route path={routes.register.path} element={<Register/>}/>
                <Route path={routes.login.path} element={<Login/>}/>
                <Route path={routes.profile.path}
                       element={<AuthModalContextProvider><Profile/></AuthModalContextProvider>}/>
                <Route path={routes.cart.path} element={<Cart/>}/>
                <Route path={routes.orderMaking.path} element={<OrderMaking/>}/>
                <Route path={routes.orderCompleted.path} element={<OrderCompleted/>}/>
                <Route path="*" element={<Navigate to={routes.notFound.path}/>}/>
                <Route path={routes.notFound.path} element={<NotFound/>}/>
            </Routes>
        </Suspense>
    );
}

AppRoutes.propTypes = {authUser: PropTypes.shape({isAuth: PropTypes.bool, id: PropTypes.number})};

export default AppRoutes;