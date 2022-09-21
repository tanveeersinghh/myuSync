import Temple from "../assets/temple.svg";
import { Link,NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="myuSync"></img>
          {/* <span>myuSync</span> */}
          <span>
            <NavLink to="/">
              <span className="highlight-1">myu</span>
              <span className="highlight-2">Sync</span>
              <div className="lil">Manage projects in your team</div>
            </NavLink>
            {/* <Navlink to="/">SyncU</Navlink> */}
          </span>
        </li>
        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}

        {!user && (
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        )}
        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={logout}>
                {" "}
                Logout{" "}
              </button>
            )}
            {isPending && (
              <button className="btn" disabled>
                {" "}
                Logging out...{" "}
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
