import React, { useEffect, useState, useRef, useCallback } from "react";

import useFetchData from "./Hook/useFetchData";
import CryptoRow from "./Components/CryptoRow";

import "./CSS/Homepage.css";
import RefreshList from "./Components/RefreshList";

function Homepage({ currencySymbol, currency = "" }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [inputText, setInputText] = useState("");

  const { coins, hasMore, loading, error } = useFetchData(pageNumber, currency);

  const observer = useRef();
  const lastCoinsRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (filteredCoins.length === 0) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  }, [coins]);

  useEffect(() => {
    setPageNumber(1);
  }, [currency]);

  const handleSearchChange = (e) => {
    setInputText(e.target.value);
    if (e.target.value === "") setPageNumber(1);
  };

  const filteredCoins = coins.filter((coins) =>
    coins.name.toLowerCase().includes(inputText.toLowerCase())
  );
  return (
    <div className="container homepage">
      <RefreshList setPageNumber={(value) => setPageNumber(value)} />
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
          <div className="homepage-grid-element span-2">Crypto</div>
          <div className="homepage-grid-element">Price</div>
          <div className="homepage-grid-element">24h</div>
          <div className="homepage-grid-element">volume 24h</div>
          <div className="homepage-grid-element">Market Cap</div>
        </div>

        {filteredCoins.map((element, index) => {
          if (filteredCoins.length === index + 1) {
            return (
              <CryptoRow
                inner_ref={lastCoinsRef}
                key={element.id + String(Math.random())}
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
            );
          } else {
            return (
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
            );
          }
        })}
        {loading && <div className="homepage-loading">loading</div>}
      </div>
    </div>
  );
}

export default Homepage;
