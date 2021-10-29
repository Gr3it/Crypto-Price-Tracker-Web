import React, { useEffect, useState } from "react";
import CryptoRow from "./Components/CryptoRow";

import CoinGecko from "coingecko-api";

import "./CSS/Homepage.css";

function Homepage({ currencySymbol, currency = "" }) {
  const [coins, setCoins] = useState([]);
  const [inputText, setInputText] = useState("");
  const CoinGeckoClient = new CoinGecko();

  const updateData = async () => {
    CoinGeckoClient.coins
      .markets({
        vs_currency: currency.toLowerCase(),
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
        price_change_percentage: "24h",
      })
      .then((data) => {
        setCoins(data.data);
        console.log(data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    updateData();
  }, []);

  const handleSearchChange = (e) => {
    setInputText(e.target.value);
  };

  const filteredCoins = coins.filter((coins) =>
    coins.name.toLowerCase().includes(inputText.toLowerCase())
  );

  console.log(coins);

  return (
    <div className="container homepage">
      <h1 className="homepage-title">Crypto Price Tracker</h1>
      <input
        className="homepage-search"
        type="search"
        placeholder="Search"
        onChange={(e) => handleSearchChange(e)}
      ></input>
      <div className="homepage-overflow">
        <div className="homepage-table-header">
          <div className="homepage-grid-element">Rank</div>
          <div className="homepage-grid-element">Crypto</div>
          <div className="homepage-grid-element">Price</div>
          <div className="homepage-grid-element">24h</div>
          <div className="homepage-grid-element">volume 24h</div>
          <div className="homepage-grid-element">Market Cap</div>
        </div>

        {filteredCoins.map((element) => (
          <CryptoRow
            key={element.id}
            id={element.id}
            symbol={element.symbol}
            name={element.name}
            image={element.image}
            current_price={element.current_price}
            market_cap={element.market_cap}
            rank={element.market_cap_rank}
            volume={element.total_volume}
            price_change_24_h={element.price_change_percentage_24h}
            currency_symbol={currencySymbol}
          />
        ))}
      </div>
    </div>
  );
}

export default Homepage;
