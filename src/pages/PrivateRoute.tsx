import { useAuth } from "contexts/AuthProvider";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const { token } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
