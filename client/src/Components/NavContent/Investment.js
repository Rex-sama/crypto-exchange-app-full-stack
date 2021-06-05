import "./CSS/Investment.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Portfolio from "./Portfolio";

export default function Investment() {
  const [datas, setDatas] = useState([]);
  const [api, setApi] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setApi(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      axios.get(`/user/${token}`).then((res) => {
        setDatas(...datas, res.data.coins);
      });
    }
  }, []);

  return (
    <div className="portfolio">
      <h3>Total Portfolio Value</h3>
      <h1>
        <Portfolio datas={datas} api={api} />
      </h1>
      {localStorage.getItem("token") ? (
        <div className="invest-grid">
          {datas.map((value, index) => {
            return (
              <div className="card" key={index}>
                {value?.image ? (
                  <img src={value?.image} width="150" height="150" alt="123" />
                ) : (
                  ""
                )}
                <div className="grid">
                  <h3>{value?.name}</h3>
                  <div className="grid-balance">
                    <h4>Available Balance</h4>
                    <p>
                      {value?.symbol.toUpperCase()} : {value?.coin.toFixed(10)}
                    </p>
                    <p>USD : ${value?.usd.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
