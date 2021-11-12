import React, { useEffect, useState } from "react";
import CoinGecko from "coingecko-api";
import { Link } from "react-router-dom";
import axios from "axios";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";

import "../CSS/CryptoPage.css";

function CryptoPage({ match, currency, currencySymbol, theme }) {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [inputCurrency, setInputCurrency] = useState("");
  const [inputCrypto, setInputCrypto] = useState("");

  const [loadedChart, setLoadedChart] = useState(false);
  const [chart30d, setChart30d] = useState([]);
  const [chartMax, setChartMax] = useState([]);

  const [chartMaxSelector, setChartMaxSelector] = useState(true);

  const CoinGeckoClient = new CoinGecko();

  useEffect(() => {
    if (!loadedChart) return;

    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);
    if (theme === "Dark") {
      root.setThemes([am5themes_Dark.new(root)]);
    }

    function generateChartData() {
      let chartData = [];

      if (chartMaxSelector) {
        for (var i = 0; i < chart30d.length; i++) {
          chartData.push({
            date: chart30d[i][0],
            value: chart30d[i][4],
            open: chart30d[i][1],
            low: chart30d[i][3],
            high: chart30d[i][2],
          });
        }
      } else {
        for (var i = 0; i < chartMax.length; i++) {
          chartData.push({
            date: chartMax[i][0],
            value: chartMax[i][4],
            open: chartMax[i][1],
            low: chartMax[i][3],
            high: chartMax[i][2],
          });
        }
      }

      return chartData;
    }

    let dataChart = generateChartData();

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,
        panX: true,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        groupData: true,
        groupIntervals: [
          { timeUnit: "hour", count: 4 },
          { timeUnit: "hour", count: 8 },
          { timeUnit: "hour", count: 12 },
          { timeUnit: "day", count: 1 },
          { timeUnit: "week", count: 1 },
          { timeUnit: "month", count: 1 },
        ],
        groupCount: 100,
        baseInterval: { timeUnit: "hour", count: 4 },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: currencySymbol + "#,###.00",
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let color = root.interfaceColors.get("background");

    let series = chart.series.push(
      am5xy.CandlestickSeries.new(root, {
        fill: color,
        calculateAggregates: true,
        stroke: color,
        name: "Price Chart",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        openValueYField: "open",
        lowValueYField: "low",
        highValueYField: "high",
        valueXField: "date",
        lowValueYGrouped: "low",
        highValueYGrouped: "high",
        openValueYGrouped: "open",
        valueYGrouped: "close",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText:
            "open: " +
            currencySymbol +
            " {openValueY}\nlow: " +
            currencySymbol +
            " {lowValueY}\nhigh: " +
            currencySymbol +
            " {highValueY}\nclose: " +
            currencySymbol +
            " {valueY}",
        }),
      })
    );

    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
      })
    );
    cursor.lineY.set("visible", false);

    chart.leftAxesContainer.set("layout", root.verticalLayout);

    let scrollbar = am5xy.XYChartScrollbar.new(root, {
      orientation: "horizontal",
      height: 20,
    });
    chart.set("scrollbarX", scrollbar);

    // set data
    series.data.setAll(dataChart);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      chart.dispose();
    };
  }, [loadedChart, theme, currencySymbol, chart30d, chartMaxSelector]);

  useEffect(() => {
    CoinGeckoClient.coins
      .fetch(match.params.id, {
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      })
      .then((data) => {
        setData(data.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${
          match.params.id
        }/ohlc?vs_currency=${currency.toLowerCase()}&days=30`
      )
      .then((data) => {
        setChart30d(data.data);
        setLoadedChart(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currency]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${
          match.params.id
        }/ohlc?vs_currency=${currency.toLowerCase()}&days=max`
      )
      .then((data) => {
        setChartMax(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currency]);

  return (
    <div className="crypto-page-container container">
      <div className="crypto-page-header">
        <Link to="/" className="crypto-page-back">
          &lt; Back
        </Link>
        <h1 className="crypto-page-title">Crypto Price Tracker</h1>
      </div>

      <div className="crypto-page-content">
        {loaded ? (
          <div className="crypto-page-main-content">
            <div className="crypto-page-left-column">
              <p className="crypto-page-path">
                <Link to="/" className="crypto-page-path-link">
                  Crypto &gt;{" "}
                </Link>
                <span className="crypto-page-path-highlight">{data.name}</span>
              </p>
              <div className="crypto-page-name">
                <div className="crypto-page-rank">
                  Rank #{data.market_cap_rank}
                </div>
                <img
                  src={data.image?.small}
                  alt={data.name + " image"}
                  className="crypto-row-image "
                />
                <div>
                  {data.name}
                  <span> ({data.symbol})</span>
                </div>
              </div>
              <div className="crypto-page-price">
                <div>Price</div>
                <div className="crypto-page-price-number">
                  {currencySymbol +
                    " " +
                    data.market_data.current_price[
                      currency.toLowerCase()
                    ].toLocaleString()}
                </div>
                <div
                  className={
                    "crypto-page-price-percentage " +
                    (!data.market_data.price_change_percentage_24h_in_currency[
                      currency.toLowerCase()
                    ] ||
                    data.market_data.price_change_percentage_24h_in_currency[
                      currency.toLowerCase()
                    ] < 0
                      ? "percentage-red"
                      : "percentage-green")
                  }
                >
                  {data.market_data.price_change_percentage_24h_in_currency[
                    currency.toLowerCase()
                  ].toFixed(2) + " %"}
                </div>
              </div>
              <div className="crypto-page-converter-container">
                <div className="crypto-page-converter-box">
                  <div className="crypto-page-converter-currency">
                    {data.symbol.toUpperCase()}
                  </div>
                  <input
                    onChange={(e) => {
                      setInputCrypto(e.target.value);
                      setInputCurrency(
                        +(
                          e.target.value *
                          data.market_data.current_price[currency.toLowerCase()]
                        ).toFixed(4)
                      );
                      if (e.target.value === "") setInputCurrency("");
                    }}
                    type="number"
                    className="crypto-page-converter-input"
                    placeholder="1"
                    value={inputCrypto}
                  />
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="crypto-page-converter-svg"
                >
                  <path
                    fill="currentColor"
                    d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"
                  ></path>
                </svg>
                <div className="crypto-page-converter-box">
                  <div className="crypto-page-converter-currency">
                    {currency}
                  </div>
                  <input
                    onChange={(e) => {
                      setInputCurrency(e.target.value);
                      setInputCrypto(
                        +(
                          e.target.value /
                          data.market_data.current_price[currency.toLowerCase()]
                        ).toFixed(4)
                      );
                      if (e.target.value === "") setInputCrypto("");
                    }}
                    type="number"
                    className="crypto-page-converter-input"
                    placeholder={
                      data.market_data.current_price[currency.toLowerCase()]
                    }
                    value={inputCurrency}
                  />
                </div>
              </div>
            </div>
            <div className="crypto-page-right-column">
              <div className="crypto-page-data-field">
                <div className="crypto-page-data-field-name">Market Cap</div>
                <div className="crypto-page-data-field-number">
                  {currencySymbol +
                    " " +
                    data.market_data?.market_cap[
                      currency.toLowerCase()
                    ].toLocaleString()}
                </div>
              </div>
              <div className="crypto-page-data-field">
                <div className="crypto-page-data-field-name">
                  24 Hour Trading Vol
                </div>
                <div className="crypto-page-data-field-number">
                  {currencySymbol +
                    " " +
                    data.market_data?.total_volume[
                      currency.toLowerCase()
                    ].toLocaleString()}
                </div>
              </div>
              <div className="crypto-page-data-field">
                <div className="crypto-page-data-field-name">
                  Circulating Supply
                </div>
                <div className="crypto-page-data-field-number">
                  {data.market_data?.circulating_supply?.toLocaleString()}
                </div>
              </div>
              <div className="crypto-page-data-field">
                <div className="crypto-page-data-field-name">Total Supply</div>
                <div className="crypto-page-data-field-number">
                  {data.market_data?.total_supply?.toLocaleString()}
                </div>
              </div>
              <div className="crypto-page-data-field">
                <div className="crypto-page-data-field-name">Max Supply</div>
                <div className="crypto-page-data-field-number">
                  {data.market_data?.max_supply?.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="crypto-page-main-content-loading">
            Loading data...
          </div>
        )}
        {loadedChart && (
          <div id="chartdiv">
            <div className="crypto-page-buttons">
              <div
                onClick={() => setChartMaxSelector(true)}
                className={
                  "crypto-page-button " +
                  (!chartMaxSelector && "crypto-page-deselect")
                }
              >
                30 Days
              </div>
              <div
                onClick={() => setChartMaxSelector(false)}
                className={
                  "crypto-page-button " +
                  (chartMaxSelector && "crypto-page-deselect")
                }
              >
                Max
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CryptoPage;
