import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "./utils/constants";
import Home from "./routes/home";
import Products from "./routes/products";
import Product from "./routes/product";
import News from "./routes/news";
import Profile from "./routes/profile";
import NotFound from "./routes/notFound";
import * as PropTypes from "prop-types";
import Register from "./routes/register";
import Login from "./routes/login";
import Cart from "./routes/cart";
import OrderMaking from "./routes/orderMaking";
import OrderCompleted from "./routes/orderCompleted";

function AppRoutes() {
    return (
        <Routes>
            <Route path={routes.home.path} element={<Home/>}/>
            <Route path={routes.products.path} element={<Navigate to={routes.products.path + "/1"} replace={true}/>}/>
            <Route path={routes.products.path + "/:page"} element={<Products/>}/>
            <Route path={routes.product.path} element={<Navigate to=""/>}/>
            <Route path={routes.product.path + "/:id"} element={<Product/>}/>
            <Route path={routes.news.path} element={<News/>}/>
            <Route path={routes.register.path} element={<Register/>}/>
            <Route path={routes.login.path} element={<Login/>}/>
            <Route path={routes.user.path} element={<Navigate to={routes.home.path} replace={true}/>}/>
            <Route path={routes.user.path + "/:id"} element={<Profile/>}/>
            <Route path={routes.cart.path} element={<Cart/>}/>
            <Route path={routes.cart.path + "/:id"} element={<Cart/>}/>
            <Route path={routes.orderMaking.path} element={<OrderMaking/>}/>
            <Route path={routes.orderCompleted.path} element={<OrderCompleted/>}/>
            <Route path="*" element={<Navigate to={routes.notFound.path}/>}/>
            <Route path={routes.notFound.path} element={<NotFound/>}/>
        </Routes>
    );
}

AppRoutes.propTypes = {authUser: PropTypes.shape({isAuth: PropTypes.bool, id: PropTypes.number})};

export default AppRoutes;