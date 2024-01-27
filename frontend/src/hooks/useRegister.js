import { useState } from "react";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const register = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const json = await response.json();
        setIsLoading(false);
        setError(json.error);
      } else {
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setIsLoading(false);
      setError(error, " Internal Server Error");
    }
  };

  return { register, isLoading, error };
};