import { useState, useEffect } from "react";

export default function Portfolio(props) {
  const { api, datas } = props;
  const [portfolio, setPortfolio] = useState(0);
  useEffect(() => {
    api.forEach((value) => {
      datas.forEach((item) => {
        if (value.name === item.name) {
          setPortfolio(
            (prev) => prev + portfolio + value.current_price * item.coin
          );
        }
      });
    });
  }, [api, datas]);
  return <div>{portfolio?.toFixed(2)}$</div>;
}
