import { useProvideAuth } from "./hooks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import HomePage from "./pages";
import DashboardPage from "./pages/dashboard";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

export default function App() {
  const auth_session = useProvideAuth();
  const history = useHistory();
  return (
    <AuthContext.Provider value={auth_session}>
      <Router>
        <div className="App">
          <nav className="nav">
            <Link to="/">Logo</Link>
            <ul className="nav-link">
              {auth_session.session != null ? (
                <>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        auth_session.setSession(null);
                        history && history.push("/");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>

            <ProtectRoute exact path="/dashboard">
              <DashboardPage />
            </ProtectRoute>

            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}


/**
 * @function ProtectRoute - Renders protected routes
 * @param {object} props 
 * @returns 
 */
function ProtectRoute({ children, ...rest }) {
  const { session } = useContext(AuthContext);

  return (
    <Route {...rest}>
      {session ? <div>{children}</div> : <Redirect to="/login" />}
    </Route>
  );
}
