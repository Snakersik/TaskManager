import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { logedin, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await logedin(username, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Zaloguj się</h3>
      <label>Nazwa użytkownika:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      ></input>
      <label>Hasło:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>
      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
      <div>
        Nie masz konta? <Link to="/register">Zarejestruj się</Link>
      </div>
      {console.log(error)}
    </form>
  );
};

export default Login;
