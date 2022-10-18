import styled from 'styled-components';
import { NavLink, Link, Routes, Route, Navigate } from 'react-router-dom';
import logo from './materials/img/logotype/icons8-icons8.svg'
import Home from './routes/home';
import { routes } from './utils/constants';
import News from './routes/news';
import Products from './routes/products';
import Users from './routes/users';
import NotFound from './routes/notFound';
import { ErrorBoundary } from 'react-error-boundary'
import Product from './routes/product';

const StyledLayout = styled.div`
  display: flex;
  height: 100%;
`;
const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 8px 16px;
  min-width: 200px;
  height: 100%;
  border-right: 1px solid lightgrey;
`;
const StyledUl = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  &:hover {
    border-bottom: 1px solid black;
  }
`;
const HeaderBranding = styled(Link)`
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
`;
const StyledImg = styled.img`
  height: 44px;
  width: 44px;
`;
const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

function ErrorFallback({ error, resetErrorBoundary }) {
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
    <StyledLayout>
      <StyledHeader>
        <HeaderBranding to={routes.home}><StyledImg src={logo} alt="Logotype" />Baobab</HeaderBranding>
        <nav>
          <StyledUl>
            <li><StyledNavLink to={routes.home.path}>Home</StyledNavLink></li>
            <li><StyledNavLink to={routes.products.path}>Products</StyledNavLink></li>
            <li><StyledNavLink to={routes.users.path}>Users</StyledNavLink></li>
            <li><StyledNavLink to={routes.news.path}>News</StyledNavLink></li>
          </StyledUl>
        </nav>
      </StyledHeader>
      <StyledRightColumn>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // reset the state of your app so the error doesn't happen again
          }}
        >
          <Routes>
            <Route path={routes.home.path} element={<Home />} />
            <Route path={routes.products.path} element={<Navigate to={routes.products.path + "/1"}/>}/>
            <Route path={routes.products.path + "/:page"} element={<Products/>}/>
            <Route path={routes.product.path} element={<Navigate to=""/>}/>
            <Route path={routes.product.path + "/:id"} element={<Product/>}/>
            <Route path={routes.users.path} element={<Users />} />
            <Route path={routes.news.path} element={<News />} />
            <Route path="*" element={<Navigate to={routes.notFound.path}/>}/>
            <Route path={routes.notFound.path} element={<NotFound/>}/>
          </Routes>
        </ErrorBoundary>
      </StyledRightColumn>
    </StyledLayout>
  );
}

export default App;
