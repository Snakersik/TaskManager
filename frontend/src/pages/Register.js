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
    <form className="register" onSubmit={handleSubmit}>
      <h3>Register</h3>
      <label>Username:</label>
        <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} />
        <label>Password:</label>
        <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} />
      <button disabled={isLoading}>Register</button>
      {error && <div className="error">{error.message}</div>}
    </form>
  );
};

export default Register;