import React from "react";

import "../CSS/CryptoRow.css";

function CryptoRow({
  id,
  symbol,
  name,
  image,
  current_price,
  market_cap,
  rank,
  volume,
  price_change_24_h,
  currency_symbol,
}) {
  return (
    <div className="crypto-row-container">
      <div className="crypto-row-element crypto-row-center">{rank}</div>
      <div className="crypto-row-element crypto-row-flex-start crypto-row-name">
        <img src={image} alt={name + " image"} className="crypto-row-image " />
        <div>{name}</div>
      </div>
      <div className="crypto-row-element crypto-row-flex-start crypto-row-symbol">
        {symbol}
      </div>
      <div className="crypto-row-element crypto-row-flex-end">
        {currency_symbol + " " + current_price}
      </div>
      <div
        className={
          "crypto-row-element crypto-row-center " +
          (price_change_24_h < 0 ? "percentage-red" : "percentage-green")
        }
      >
        {price_change_24_h.toFixed(2) + " %"}
      </div>
      <div className="crypto-row-element crypto-row-flex-end">
        {currency_symbol + " " + volume.toLocaleString()}
      </div>
      <div className="crypto-row-element crypto-row-flex-end">
        {currency_symbol + " " + market_cap.toLocaleString()}
      </div>
    </div>
  );
}

export default CryptoRow;
