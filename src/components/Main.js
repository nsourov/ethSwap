import React, { useState } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

const Main = ({ ethBalance, tokenBalance, buyTokens, sellTokens }) => {
  const [currentForm, setCurrentForm] = useState("buy");
  return (
    <div id="content" className="mt-3">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-light" onClick={() => setCurrentForm("buy")}>
          Buy
        </button>
        <span className="text-muted">&lt; &nbsp; &gt;</span>
        <button
          className="btn btn-light"
          onClick={() => setCurrentForm("sell")}
        >
          Sell
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          {currentForm === "buy" && (
            <BuyForm
              ethBalance={ethBalance}
              tokenBalance={tokenBalance}
              buyTokens={buyTokens}
            />
          )}
          {currentForm === "sell" && (
            <SellForm
              ethBalance={ethBalance}
              tokenBalance={tokenBalance}
              sellTokens={sellTokens}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
