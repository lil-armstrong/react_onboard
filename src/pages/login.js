// login.js
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context";
import { useHistory } from "react-router-dom";

const LoginPage = function () {
  const history = useHistory();
  const { setSession, users, error, setError } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>setError(null), [history]);

  /**-----------------------------------------------------
   * @function signin - Function to sign user in
   * @param {object} credentials 
   * @param {function} cb 
   -----------------------------------------------------*/
  const signin = (credentials, cb) => {
    const { email, password } = credentials;
    setError(null);
    if (email in users && password == users[email].password) {
      return setTimeout(() => {
        setSession(users[email]);
        cb && cb();
      }, 4000);
    }
    throw new Error("Invalid credentials");
  };

  /**-----------------------------------------------------
   * @function onsubmit - on submit form event handler
   * @param {object} e 
   * @returns 
   -----------------------------------------------------*/
  function onsubmit(e) {
    e.preventDefault();

    const { email, password } = e.target;
    setIsLoading(true);
    try {
      if (!email.value) {
        throw new Error("Invalid email address");
      } else if (!password.value) {
        throw new Error("Invalid password");
      }
      const credentials = {
        email: email.value,
        password: password.value,
      };
      return signin(credentials, () => history.push("/dashboard"));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <form onSubmit={onsubmit} className="onboarding-container">
        <header>
          <h2>Login Here</h2>
        </header>
        <input
          type="email"
          defaultValue=""
          placeholder="Enter email address"
          name="email"
        />
        <input
          type="password"
          defaultValue=""
          placeholder="Enter password"
          name="password"
        />
        <span className="error">{error}</span>
        <button type="submit">{isLoading ? "...loading" : `Login`}</button>
      </form>
    </div>
  );
};

export default LoginPage;
