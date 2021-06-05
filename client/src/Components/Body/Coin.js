import "./CSS/Coin.css";
import axios from "axios";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Chart from "./Chart";
import Container from "./Container/Container";
import { dataContext } from "../../App";

export default function Coin(props) {
  const {
    id,
    market_cap_rank,
    name,
    symbol,
    image,
    current_price,
    low_24h,
    high_24h,
    market_cap,
    circulating_supply,
    total_volume,
    total_supply,
    price_change_percentage_24h,
  } = props?.location?.state;

  const history = useHistory();
  const data = useContext(dataContext);
  const [currency, setCurrency] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [flag, setFlag] = useState("");
  const check = data?.coins?.find((coin) => coin?.name === name);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const submit = (e) => {
    setCurrency(e.target.value * current_price);
    console.log(data);
  };

  const Investment = (e) => {
    e.preventDefault();
    if (e.target.id === "buy") {
      if (e.target.usd.value === "") {
        setFlag("Enter amount");
        setTimeout(() => {
          setFlag("");
        }, 3000);
      } else {
        if (data?.wallet > Number(e.target.usd.value)) {
          console.log(typeof e.target.usd.value);
          if (check) {
            axios
              .patch(
                `/update/${check._id}`,
                {
                  usd: Number(check?.usd) + Number(e.target.usd.value),
                  coin: Number(check?.coin) + Number(e.target.coin.value),
                  wallet: Number(data?.wallet) - Number(e.target.usd.value),
                },
                config
              )
              .then((res) => {
                console.log(res.data);
              });
          } else {
            const coins = [
              {
                name: name,
                image: image,
                symbol: symbol,
                usd: Number(e.target.usd.value),
                coin: Number(e.target.coin.value),
              },
            ];
            axios
              .put(
                `/push/${token}`,
                {
                  wallet: Number(data?.wallet) - Number(e.target.usd.value),
                  coins: coins,
                },
                config
              )
              .then((res) => {
                console.log(res.data);
              });
          }

          history.push("/myinvestments");
          window.location.reload();
        } else {
          setFlag("Insufficient Balance.Please add funds to your wallet");
          setTimeout(() => {
            setFlag("");
          }, 2000);
        }
      }
    } else {
      console.log(check?.usd);
      if (e.target.usd.value === "") {
        setFlag("Enter amount");
        setTimeout(() => {
          setFlag("");
        }, 3000);
      } else {
        if (check?.usd > Number(e.target.usd.value)) {
          if (check) {
            axios
              .patch(
                `/update/${check._id}`,
                {
                  usd: Number(check?.usd) - Number(e.target.usd.value),
                  coin: Number(check?.coin) - Number(e.target.coin.value),
                  wallet: Number(data?.wallet) + Number(e.target.usd.value),
                },
                config
              )
              .then((res) => {
                console.log(res.data);
              });
          }
          history.push("/myinvestments");
          window.location.reload();
        } else {
          setFlag("Insufficient Balance.Please add funds to your wallet");
          setTimeout(() => {
            setFlag("");
          }, 2000);
        }
      }
    }
  };

  const chartSubmit = (e) => {
    e.preventDefault();
    setFromDate(e.target.id);
  };

  return (
    <div className="coin-content">
      <div className="coin-content-header">
        <img src={image} alt="123" width="70" height="70" />
        <div className="coin-content-header-name">
          <h1>
            {name} ({symbol.toUpperCase()})
          </h1>
          <p>
            <strong>Rank #{market_cap_rank}</strong>
          </p>
        </div>

        <div className="coin-content-header-price">
          <p>${current_price.toLocaleString()}</p>
          {price_change_percentage_24h > 0 ? (
            <p style={{ color: "rgb(0, 255, 85)" }}>
              {price_change_percentage_24h.toFixed(2)}%
            </p>
          ) : (
            <p style={{ color: "red" }}>
              {price_change_percentage_24h.toFixed(2)}%
            </p>
          )}
        </div>
      </div>

      <div className="coin-content-body">
        <div className="coin-chart">
          <div className="coin-chart-convertor">
            <div>
              <input
                type="number"
                placeholder={symbol.toUpperCase()}
                onKeyUp={(e) => submit(e)}
              />
              =
              <input
                type="number"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                placeholder="USD"
              />
            </div>
          </div>
          <div className="coin-chart-and-graph">
            <div className="coin-chart-graph-convertor" onClick={chartSubmit}>
              <button id="1" className="active">
                24h
              </button>
              <button id="7">7d</button>
              <button id="14">14d</button>
              <button id="30">30d</button>
              <button id="90">90d</button>
              <button id="180">180d</button>
              <button id="365">1y</button>
            </div>
            <div className="coin-chart-graph">
              <Chart id={id} from={fromDate} today={Date.now()} />
            </div>
          </div>
        </div>
        <div className="coin-performance">
          <h2>Coin Performance</h2>
          <div className="coin-performance-data">
            <p>
              <b>24H high</b>{" "}
            </p>
            <p className="data">${high_24h.toLocaleString()}</p>
          </div>
          <div className="coin-performance-data">
            <p>
              <b> 24H low</b>{" "}
            </p>
            <p className="data"> ${low_24h.toLocaleString()}</p>
          </div>
          <div className="coin-performance-data">
            <p>
              <b>Market Cap</b>{" "}
            </p>
            <p className="data"> ${market_cap.toLocaleString()}</p>
          </div>
          <div className="coin-performance-data">
            <p>
              {" "}
              <b> Total Volume </b>
            </p>
            <p className="data">${total_volume.toLocaleString()}</p>
          </div>
          <div className="coin-performance-data">
            <p>
              <b>Circulating Supply</b>{" "}
            </p>
            <p className="data">${circulating_supply.toLocaleString()}</p>
          </div>
          <div className="coin-performance-data">
            <p>
              {" "}
              <b>Max Supply</b>{" "}
            </p>
            <p className="data">${total_supply?.toLocaleString()}</p>
          </div>
          <div className="coin-performance-data-button">
            <Container
              triggerText="BUY"
              onSubmit={Investment}
              className="modal-button"
              value={props}
              flag={flag}
              check={check}
            />
            <Container
              triggerText="SELL"
              onSubmit={Investment}
              className="modal-sell-button"
              value={props}
              flag={flag}
              check={check}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
