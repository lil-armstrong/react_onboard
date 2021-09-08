// register.js
import { useContext, useEffect } from "react";
import { AuthContext } from "../context";
import { useHistory } from "react-router-dom";

const RegisterPage = function () {
  const { setSession, users, error, setError, setUser } =
    useContext(AuthContext);
  const history = useHistory();
  useEffect(() => setError(null), [history]);

  /**-----------------------------------------------------
   * @function signup - Function to register user
   * @param {object} credentials 
   * @param {function} cb - callback
   -----------------------------------------------------*/

  const signup = (credentials, cb) => {
    const { email } = credentials;
    setError(null);

    if (!(email in users)) {
      return setTimeout(() => {
        setUser((prevState) => ({
          ...prevState,
          [email]: credentials,
        }));
        setSession(credentials);
        cb();
      }, 100);
    }
    throw new Error(`User with email: ${email} already exist!`);
  };

  /**-----------------------------------------------------
   * @function onsubmit - on submit form event handler
   * @param {object} e 
   * @returns 
   -----------------------------------------------------*/
  function onsubmit(e) {
    e.preventDefault();

    const { email, password,username, re_password } = e.target;
    try {
      if (!email.value) {
        throw new Error("Invalid email address");
      } else if (!password.value || password.value !== re_password?.value) {
        throw new Error("Invalid password or mismatch");
      }
      const credentials = { email: email.value, password: password.value, username: username.value };
      signup(credentials, () => history.push("/dashboard"));

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <form onSubmit={onsubmit} className="onboarding-container">
      <header>
        <h2>Register Here</h2>
      </header>
      <input
        type="text"
        autoComplete="off"
        placeholder="Username"
        name="username"
      />
      <input type="email" placeholder="Enter email address" name="email" />
      <input type="password" placeholder="Enter password" name="password" />
      <input
        type="password"
        placeholder="Confirm password"
        name="re_password"
      />
      <span className="error">{error}</span>

      <button type="submit">Complete registration</button>
    </form>
  );
};

export default RegisterPage;
