import "./CSS/Coin.css"
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import axios from "axios";

export default function Chart({ id, from }) {
  const [state, setState] = useState("");

  useEffect(() => {
    if (from) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${from}`
        )
        .then((res) => {
          setState(res.data);
        });
    } else {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`
        )
        .then((res) => {
          setState(res.data);
        });
    }

    return () => {
      setState("");
    };
  }, [id, from]);

  const X = [];

  for (let i = 0; i < state?.prices?.length; i++) {
    const element = state.prices[i];

    X.push({
      time: new Date(element[0]),
      price: Math.round(element[1]),
    });
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={X}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area dataKey="price" stroke="#2451B7" fill="url(#color)" />
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}

            // tickFormatter={(str) => {
            //   const date = parseISO(str);
            //   if (from === 1) {
            //     if (date.getHours % 2 === 0) {
            //       return ;
            //     }
            //   } else {
            //     if (date.getDate() % 7 === 0) {
            //       return format(date, "MMM, d");
            //     }
            //     return "";
            //   }
            // }}
          />
          <YAxis
            dataKey="price"
            axisLine={false}
            tickLine={false}
            tickCount={5}
            tickFormatter={(number) => `$${number.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Tooltip />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="tooltip">
        <h5>{format(label, "E d MMM yyy, hh:mm:ss ")}</h5>
        <p>
          <strong>price:</strong> ${payload[0]?.value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
}
