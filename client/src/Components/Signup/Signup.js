import axios from "axios";
import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import "./style.css";

export default function Signup() {
  const history = useHistory();
  const [error, setError] = useState("");
  // const [loader, setLoader] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      // setLoader(true);
      const result = await axios.post("/signup", user, config);
      localStorage.setItem("token", result.headers.token);
      history.push("/");
      window.location.reload();
    } catch (error) {
      // setLoader(false);
      setError(error.response.data);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  return (
    <div className="signup-body">
      <div className="signup-form">
        <h1>Sign up</h1>
        <form onSubmit={onSubmit}>
          <input
            type=""
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <br />
          <input type="Submit" name="Sign Up" />
          <br />
          <span>Already have an account?</span>{" "}
          <NavLink
            to="/login"
            style={{ textDecoration: "none", color: "rgb(0, 255, 85)" }}
          >
            Sign In
          </NavLink>
        </form>
      </div>
      {error ? <div className="signup-error">{error}</div> : ""}
      {
        // <div style={{ backgroundColor: "black", color: "black" }}>
        //   <spinner />
        // </div>
      }
    </div>
  );
}
