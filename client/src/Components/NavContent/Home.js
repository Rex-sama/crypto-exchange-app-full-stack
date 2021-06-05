import "./CSS/Home.css"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { dataContext } from "../../App";
import { NavLink } from "react-router-dom";
import Video from "../asset/video.mp4";

export default function Home() {
  const data = useContext(dataContext);
  const [api, setApi] = useState([]);
  useEffect(() => {
    myFun();
  }, []);

  const myFun = async () => {
    await axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setApi(res.data);
        console.log([...api, res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  };

  return (
    <div>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "50%",
          left: "50%",
          objectFit: "cover",
          transform: "translate(-50%,-50%)",
          zIndex: "-1",
          opacity: "0.99",
        }}
      >
        <source src={Video} type="video/mp4" />
      </video>
      <div className="home-body">
        {localStorage.getItem("token") ? (
          <>
            <h1>Welcome {data?.username},</h1>
            <p>
              You can start investing as low as 10$ in Bitcoin or any other
              coin.
            </p>
            <NavLink to="/prices" style={{ textDecoration: "none" }}>
              <button>Start Investing </button>
            </NavLink>
          </>
        ) : (
          <>
            <h1>Crypto Exchange Made Easy</h1>
            <p>Sign up for Free and receive your first $100 in credits</p>
            <NavLink to="/signup" style={{ textDecoration: "none" }}>
              <button>Get Started </button>
            </NavLink>
          </>
        )}
      </div>
      <div className="home-footer">
        <marquee>
          <div className="home-footer-marquee">
            {api?.map((value) => {
              return (
                <div className="home-footer-marquee-2" key={value.id}>
                  <div className="marquee-content-1">
                    <img
                      src={value.image}
                      alt="imagqwe"
                      width="40"
                      height="40"
                    />
                    <p>
                      <b>{value.symbol.toUpperCase()}</b>
                    </p>
                    {value.market_cap_change_percentage_24h > 0 ? (
                      <p style={{ color: "rgb(0, 255, 85)" }}>
                        <b>
                          {value.market_cap_change_percentage_24h.toFixed(2)}%
                        </b>
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>
                        <b>
                          {value.market_cap_change_percentage_24h.toFixed(2)}%
                        </b>
                      </p>
                    )}
                  </div>
                  <div className="marquee-content-2">
                    <h2>{value.current_price.toLocaleString()} USD</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </marquee>
      </div>
    </div>
  );
}
  