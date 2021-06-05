import "./CSS/Prices.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Coins from "../Body/Coins";

export default function Prices() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="Price-component">
      <br />
      <form>
        <input
          type="text"
          placeholder="Search Coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <br />
      <div className="coins-headers">
        <div className="coins-rank">
          <div className="coins">
            <p>#</p>
            <h2>Coin</h2>

            <div className="coins-data">
              <p className="coins-price">
                <b>Price</b>
              </p>
              <p className="coins-volume">
                <b>24h Volume</b>
              </p>
              <p className="coins-marketcap">
                <b>Market Cap</b>
              </p>
            </div>
          </div>
        </div>
      </div>

      {data
        .filter((coin) => {
          return coin.name.toLowerCase().includes(search.toLowerCase());
        })
        .map((value) => {
          return <Coins key={value.id} {...value} />;
        })}
      <div className="footer" />
    </div>
  );
}
