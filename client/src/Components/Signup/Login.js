import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

export default function Signup() {
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const result = await axios.post("/login", user, config);
      localStorage.setItem("token", result.headers.token);
      history.push("/");
      window.location.reload();
    } catch (error) {
      setError(error.response.data);
      setTimeout(() => {
        setError("");
      }, 3000);
      console.log(error.response.data);
    }
  };
  return (
    <div className="signup-body">
      <div className="signup-form">
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type=""
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <br />
          <input type="Submit" name="Login" />
          <br />
          <span>Don't have an account?</span>{" "}
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "rgb(0, 255, 85)" }}
          >
            Sign up
          </Link>
        </form>
      </div>
      {error ? <div className="signup-error">{error}</div> : ""}
    </div>
  );
}
