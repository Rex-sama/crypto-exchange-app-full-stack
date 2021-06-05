import Navbar from "./Components/NavContent/Navbar";
import { Switch, Route } from "react-router-dom";
import Account from "./Components/NavContent/Account";
import Investment from "./Components/NavContent/Investment";
import Home from "./Components/NavContent/Home";
import Prices from "./Components/NavContent/Prices";
import Coin from "./Components/Body/Coin";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Signup/Login";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const dataContext = React.createContext();
export const apiContext = React.createContext();
function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");

      axios.get(`/user/${token}`).then((res) => {
        setData(res.data);
      });
    }
    return () => {
      setData("");
    };
  }, []);
  return (
    <div className="App">
      <dataContext.Provider value={data}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/prices" exact component={Prices} />
          <Route path="/myinvestments" exact component={Investment} />
          <Route path="/account" exact component={Account} />
          <Route path="/prices/coins" exact component={Coin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </dataContext.Provider>
    </div>
  );
}

export default App;
