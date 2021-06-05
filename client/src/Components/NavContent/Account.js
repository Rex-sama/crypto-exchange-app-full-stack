import "./CSS/Account.css";
import user_profile from "../asset/user.png";
import tick from "../asset/tick.png";
import ReactStars from "react-rating-stars-component";
import SlideToggle from "react-slide-toggle";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Account() {
  const [datas, setDatas] = useState("");
  const [value, setValue] = useState("");
  const [star, setStar] = useState(0);
  const [msg, setMsg] = useState("");
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const history = useHistory();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const fourthExample = {
    size: 30,
    isHalf: false,
    color: "grey",
    activeColor: "rgb(255, 196, 0)",
    value: star,
    onChange: (newValue) => {
      setStar(newValue);
    },
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      axios.get(`/user/${token}`).then((res) => {
        setDatas(res.data);
      });
    }
  }, []);

  const addFund = async (e) => {
    e.preventDefault();
    if (value) {
      if (value > 1000000) {
        setError("Amount cannot exceed 1,000,000$");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        try {
          const result = await axios.patch(
            `/addnwithdraw/${token}`,
            { wallet: Number(datas?.wallet) + Number(value) },
            config
          );
          console.log(result);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setError("Please Enter amount or quantity");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const withdrawFund = async (e) => {
    e.preventDefault();
    if (value) {
      if (datas?.wallet > value) {
        try {
          const result = await axios.patch(
            `/addnwithdraw/${token}`,
            { wallet: Number(datas?.wallet) - Number(value) },
            config
          );
          console.log(result);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      } else {
        setError("Insufficient Balance.Please add funds to your wallet");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } else {
      setError("Please Enter amount or quantity");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const feedBack = async (e) => {
    e.preventDefault();
    await axios.post(
      `/userreview/${token}`,
      { rating: star, comment: msg },
      config
    );
    setFlag(true);
    setStar(0);
    setMsg("");
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push("/login");
    window.location.reload();
  };

  const maxLengthCheck = (e) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };
  return (
    <div className="account-details">
      {error ? <p className="errors">{error}</p> : ""}
      <div className="account-user">
        <img src={user_profile} alt="user" width="100" height="100" />
        <div className="account-username">
          <h1>{datas?.username}</h1>
          <p>{datas?.email}</p>
        </div>
        <div className="wallet">
          <p>
            <strong> Your Wallet Balance </strong>
          </p>
          <h3>{datas?.wallet?.toFixed(2)}$</h3>
        </div>
      </div>

      <div className="account-user-body">
        <SlideToggle collapsed whenReversedUseBackwardEase>
          {({ toggle, setCollapsibleElement }) => (
            <div className="my-collapsible">
              <button
                className="my-collapsible__toggle"
                id="Addwithraw"
                onClick={toggle}
              >
                Add/Withdraw Funds
              </button>
              <div ref={setCollapsibleElement}>
                <div className="my-collapsible__content-inner1">
                  <h3>Enter the amount you wish to Add/Withdraw</h3>
                  <p>
                    <b>Max : </b>
                    {(1000000).toLocaleString()}$
                  </p>
                  <input
                    type="number"
                    placeholder="Enter the Amount"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    maxLength={7}
                    onInput={maxLengthCheck}
                  />
                  <br />
                  <button onClick={addFund}>Add Funds</button>
                  <button onClick={withdrawFund}>Withdraw Funds</button>
                  <br />
                </div>
              </div>
            </div>
          )}
        </SlideToggle>

        <SlideToggle collapsed whenReversedUseBackwardEase>
          {({ toggle, setCollapsibleElement }) => (
            <div className="my-collapsible">
              <button className="my-collapsible__toggle" onClick={toggle}>
                All Order
              </button>
              <div ref={setCollapsibleElement}>
                <div className="my-collapsible__content-inner2">
                  <div className="account-coins">
                    {datas?.coins?.map((value, index) => {
                      return (
                        <div key={index} className="account-coin">
                          {value?.image ? (
                            <img
                              src={value?.image}
                              alt="123"
                              width="50"
                              height="50"
                            />
                          ) : (
                            ""
                          )}
                          <div className="account-coin-name">
                            <h3>{value?.name}</h3>
                            <p>{value?.symbol.toUpperCase()}</p>
                          </div>
                          <div className="account-coin-currency">
                            <p>
                              {value?.coin?.toFixed(10)}&nbsp;
                              {value?.symbol?.toUpperCase()}
                            </p>
                            <p>${value?.usd}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </SlideToggle>

        <SlideToggle collapsed whenReversedUseBackwardEase>
          {({ toggle, setCollapsibleElement }) => (
            <div className="my-collapsible">
              <button className="my-collapsible__toggle" onClick={toggle}>
                Give your Feedback
              </button>
              <div ref={setCollapsibleElement}>
                <div className="my-collapsible__content-inner3">
                  {!flag ? (
                    <>
                      <div className="ratingstars">
                        <p>Rate this App</p>
                        <ReactStars {...fourthExample} />
                      </div>
                      <textarea
                        placeholder="Write your Feedback"
                        rows="4"
                        cols="50"
                        value={msg}
                        onChange={(e) => {
                          setMsg(e.target.value);
                        }}
                      ></textarea>
                      <br />
                      <button onClick={feedBack}>Submit Feedback</button>
                    </>
                  ) : (
                    <>
                      <div style={{ paddingTop: "20px" }}>
                        <img src={tick} alt="tick" width="60" height="60" />
                        <h2 style={{ margin: 0, padding: 0 }}>
                          Thank you for your feedback!
                        </h2>
                      </div>
                      <br />
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </SlideToggle>

        <button id="logout" onClick={logout} className="my-collapsible__toggle">
          Logout
        </button>
      </div>
    </div>
  );
}
