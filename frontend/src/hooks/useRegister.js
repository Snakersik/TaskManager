import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (username, password) => {
    if (!username || !password) {
      setError("Nazwa użytkownika i hasło nie mogą być puste");
      return;
    }

    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();

    if (response.status===409) {
      setIsLoading(false);
      setError("Taki użytkownik już jest w bazie!");
    } else if (!response.ok){
      setIsLoading(false);
      setError(json.message);
    } else {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
