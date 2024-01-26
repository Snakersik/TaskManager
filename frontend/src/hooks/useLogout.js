import { useAuthContext } from "./useAuthContext";
import { useTasksContext } from "./useTaskContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: tasksDisptach } = useTasksContext();
  const logout = () => {
    //remove user form storage
    localStorage.removeItem("user");

    //dispatch logout action
    dispatch({ type: "LOGOUT" });
    tasksDisptach({ type: "SET_TASK", payload: null });
  };
  return { logout };
};
