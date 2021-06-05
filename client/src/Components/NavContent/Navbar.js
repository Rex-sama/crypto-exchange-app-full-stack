import "./CSS/Navbar.css";
import { NavLink } from "react-router-dom";
import { dataContext } from "../../App";
import { useContext } from "react";


export default function Navbar() {
  const data = useContext(dataContext);
  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <div className="navbar">
      <NavLink
        exact
        to="/"
        activeClassName="nav-link-active"
        style={{ textDecoration: "none", color: "white" }}
      >
        <p>Home</p>
      </NavLink>
      <NavLink
        exact
        to="/prices"
        activeClassName="nav-link-active"
        style={{ textDecoration: "none", color: "white" }}
      >
        <p>Prices</p>
      </NavLink>
      {localStorage.getItem("token") ? (
        <>
          {" "}
          <NavLink
            exact
            to="/myinvestments"
            activeClassName="nav-link-active"
            style={{ textDecoration: "none", color: "white" }}
          >
            <p>My Investments</p>
          </NavLink>
          <NavLink
            exact
            to="/account"
            activeClassName="nav-link-active"
            style={{ textDecoration: "none", color: "white" }}
          >
            <p>Account Details</p>
          </NavLink>
        </>
      ) : (
        ""
      )}

      <div>
        {!localStorage.getItem("token") ? (
          <div className="sign-out">
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              <button className="login">Login</button>
            </NavLink>
            <NavLink to="/signup" style={{ textDecoration: "none" }}>
              <button className="sign-in-out">Sign up</button>
            </NavLink>
          </div>
        ) : (
          <div className="sign-out">
            <p>hello, {data?.username}</p>
            <button className="sign-in-out" onClick={signout}>
              SignOut
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
