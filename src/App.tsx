import GlobalStyle from "components/Global";
import { Text } from "components/Layout/ElementCustom";
import ControlPanel from "components/ControlPanel/ControlPanel";
import ResetCSS from "components/ResetCSS";
import PrivateRoute from "pages/PrivateRoute";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "contexts/AuthProvider";

const Home = lazy(() => import("pages/Home"));
const SignIn = lazy(() => import("pages/SignIn"));

const PageLoader = () => <Text>Loading...</Text>;

const App: React.FC = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>
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
