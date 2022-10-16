import styled from 'styled-components';
import { NavLink, Link, Routes, Route, Navigate } from 'react-router-dom';
import logo from './materials/img/logotype/icons8-icons8.svg'
import Home from './routes/home';
import { routes } from './utils/constants';
import News from './routes/news';
import Products from './routes/products';
import Users from './routes/users';
import { ErrorBoundary } from 'react-error-boundary'

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
            <li><StyledNavLink to={routes.home}>Home</StyledNavLink></li>
            <li><StyledNavLink to={routes.products}>Products</StyledNavLink></li>
            <li><StyledNavLink to={routes.users}>Users</StyledNavLink></li>
            <li><StyledNavLink to={routes.news}>News</StyledNavLink></li>
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
            <Route path={routes.home} element={<Home />} />
            <Route>
              <Route path={routes.products} element={<Navigate to="/products/1"/>} />
              <Route path={routes.products_page} element={<Products/>} />
            </Route>
            <Route path={routes.users} element={<Users />} />
            <Route path={routes.news} element={<News />} />
          </Routes>
        </ErrorBoundary>
      </StyledRightColumn>
    </StyledLayout>
  );
}

export default App;
