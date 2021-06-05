import "./CSS/Coins.css";
import { useHistory } from "react-router-dom";

export default function Coins(props) {
  const history = useHistory();
  const {
    name,
    symbol,
    current_price,
    image,
    price_change_percentage_24h,
    market_cap_change_percentage_24h,
    total_volume,
    market_cap,
    market_cap_rank,
  } = props;

  const submit = () => {
    history.push("/prices/coins", props);
  };

  return (
    <div className="coins-block">
      <div className="coins-content" onClick={submit}>
        <div className="coin">
          <p className="coin-rank">{market_cap_rank}</p>
          <img src={image} alt="12" width="50" height="50" />
          <h2>{name}</h2>
          <p className="coin-symbol">{symbol.toUpperCase()}</p>
        </div>
        <div className="coin-data">
          <p className="coin-price">${current_price.toLocaleString()}</p>
          {price_change_percentage_24h > 0 ? (
            <p className="price-24-up">
              {market_cap_change_percentage_24h.toFixed(2)}%
            </p>
          ) : (
            <p className="price-24-down">
              {market_cap_change_percentage_24h.toFixed(2)}%
            </p>
          )}
          <p className="coin-volume">${total_volume.toLocaleString()}</p>
          <p className="coin-marketcap">${market_cap.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
