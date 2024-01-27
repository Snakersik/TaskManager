import { Link } from "react-router-dom";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Task Manager</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>
                <i className="fa-solid fa-user  fa-lg"></i>
                {user.username}
              </span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register">
                {" "}
                <button>Signup</button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
