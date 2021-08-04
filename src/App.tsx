import ControlPanel from "components/ControlPanel/ControlPanel";
import GlobalStyle from "components/Global";
import PageLoader from "components/PageLoader";
import ResetCSS from "components/ResetCSS";
import { useAuth } from "contexts/AuthProvider";
import PrivateRoute from "pages/PrivateRoute";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = lazy(() => import("pages/Home"));
const SignIn = lazy(() => import("pages/SignIn"));
const Call = lazy(() => import("pages/Call"));

const App: React.FC = () => {
  const { userInfo } = useAuth();

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>

          <PrivateRoute exact path="/call/:id">
            <Call />
          </PrivateRoute>

          <PrivateRoute path="/">
            {userInfo ? (
              <ControlPanel>
                <Home />
              </ControlPanel>
            ) : (
              <PageLoader />
            )}
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
