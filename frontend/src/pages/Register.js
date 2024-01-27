import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(username, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Register</h3>
      <label>Nazwa użytkownika:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label>Hasło:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>Register</button>
      { <div className="error">{error}</div>}
    </form>
  );
};

export default Register;
