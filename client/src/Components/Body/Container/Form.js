import { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";
import { Link } from "react-router-dom";
import exclam from "../../asset/1.png";

export default function Form({ onSubmit, value, triggerText, flag, check }) {
  const { name, image, current_price, symbol } = value.location.state;
  const [usd, setUsd] = useState("");
  const [coin, setCoin] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      axios.get(`/user/${token}`).then((res) => {
        setData(res.data);
      });
    }
  }, [triggerText]);

  if (coin === 0) {
    setCoin("");
  }
  const onBuy = (e) => {
    setCoin((e.target.value / current_price).toFixed(8));
  };

  return (
    <div>
      {localStorage.getItem("token") ? (
        <div>
          {triggerText === "BUY" ? (
            <form id="buy" onSubmit={onSubmit}>
              <div className="form-group">
                <div className="form-group-box">
                  <div className="form-group-header">
                    <img src={image} alt="123" width="50" height="50" />
                    <h1>{name}</h1>
                  </div>
                </div>
                {flag ? <p className="error">{flag}</p> : ""}
                <p id="current">Current Market Price</p>
                <h1 className="Current_price">
                  ${current_price.toLocaleString()}
                </h1>
                <p>How much do you want to buy?</p>
                <input
                  className="USD"
                  type="number"
                  placeholder="USD"
                  value={usd}
                  id="usd"
                  onChange={(e) => setUsd(e.target.value)}
                  onKeyUp={onBuy}
                />
                &nbsp;=&nbsp;
                <input
                  className="COIN"
                  id="coin"
                  type="number"
                  value={coin}
                  placeholder={symbol.toUpperCase()}
                  onChange={(e) => setCoin("")}
                />
                <br />
                <button className="buy_coin" type="submit">
                  BUY {symbol.toUpperCase()}
                </button>
                <p className="balance">
                  Your Balance : ${data?.wallet?.toFixed(2)}
                </p>
              </div>
            </form>
          ) : (
            <form id="sell" onSubmit={onSubmit}>
              <div className="form-group">
                <div className="form-group-box">
                  <div className="form-group-header">
                    <img src={image} alt="123" width="50" height="50" />
                    <h1>{name}</h1>
                  </div>
                </div>
                {flag ? <p className="error">{flag}</p> : ""}
                <p id="current">Current Market Price</p>
                <h1 className="Current_price">
                  ${current_price.toLocaleString()}
                </h1>
                <p>How much do you want to sell?</p>
                <input
                  className="USD"
                  type="number"
                  placeholder="USD"
                  value={usd}
                  id="usd"
                  onChange={(e) => setUsd(e.target.value)}
                  onKeyUp={onBuy}
                />
                &nbsp;=&nbsp;
                <input
                  className="COIN"
                  id="coin"
                  type="number"
                  value={coin}
                  placeholder={symbol.toUpperCase()}
                  onChange={(e) => setCoin("")}
                />
                <br />
                <button className="sell_coin" type="submit">
                  SELL {symbol.toUpperCase()}
                </button>
                <p className="balance">
                  {symbol.toUpperCase()} Balance : {check?.usd?.toFixed(2)}
                </p>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="form-group-signin">
          <img src={exclam} alt="exclam" width="70" height="70" />
          <h1 className="Current_price-signin">You are not Sign in !</h1>
          <p>Please sign in to continue</p>
          <Link to="/signup">
            <button>Sign in</button>
          </Link>
        </div>
      )}
    </div>
  );
}
