import React, { useState } from "react";

import "../CSS/Settings.css";

function Settings({
  currency,
  setCurrency,
  theme,
  setTheme,
  setCurrencySymbol,
}) {
  const [showMenu, setShowMenu] = useState(false);

  const resetMenu = () => {
    document
      .querySelectorAll(".settings-option-container")
      .forEach((element) => {
        element.classList.add("settings-scale0");
      });
    document
      .getElementById("settings-option-name")
      .classList.remove("settings-scale0");
  };
  return (
    <div className="settings-container">
      <div
        className="settings-svg-container"
        onClick={() => {
          if (showMenu === false) {
            resetMenu();
          }
          setShowMenu(!showMenu);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="settings-svg"
        >
          <path
            fill="currentColor"
            d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
          ></path>
        </svg>
      </div>
      <div
        className={
          showMenu
            ? "settings-menu-container settings-scale1"
            : "settings-menu-container"
        }
      >
        <div id="settings-option-name" className="settings-option-container">
          <div
            className="settings-option"
            onClick={(e) => {
              e.currentTarget.parentElement.classList.add("settings-scale0");
              document
                .getElementById("settings-currencies")
                .classList.remove("settings-scale0");
            }}
          >
            Currency: {currency}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
              className="settings-svg-right-arrow"
            >
              <path
                fill="currentColor"
                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
              ></path>
            </svg>
          </div>
          <div
            className="settings-option"
            onClick={(e) => {
              e.currentTarget.parentElement.classList.add("settings-scale0");
              document
                .getElementById("settings-theme")
                .classList.remove("settings-scale0");
            }}
          >
            Theme: {theme}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
              className="settings-svg-right-arrow"
            >
              <path
                fill="currentColor"
                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
              ></path>
            </svg>
          </div>
        </div>
        <div
          id="settings-currencies"
          className="settings-option-container settings-scale0"
        >
          <div
            className="settings-option"
            onClick={() => {
              setCurrency("USD");
              setCurrencySymbol("$");
              resetMenu();
            }}
          >
            USD
          </div>
          <div
            className="settings-option"
            onClick={() => {
              setCurrency("EUR");
              setCurrencySymbol("€");
              resetMenu();
            }}
          >
            EUR
          </div>
          <div
            className="settings-option"
            onClick={() => {
              setCurrency("BTC");
              setCurrencySymbol("₿");
              resetMenu();
            }}
          >
            BTC
          </div>
          <div
            className="settings-option"
            onClick={() => {
              setCurrency("ETH");
              setCurrencySymbol("Ξ");
              resetMenu();
            }}
          >
            ETH
          </div>
        </div>
        <div
          id="settings-theme"
          className="settings-option-container settings-scale0"
        >
          <div
            className="settings-option"
            onClick={() => {
              setTheme("Light");
              resetMenu();
            }}
          >
            Light
          </div>
          <div
            className="settings-option"
            onClick={() => {
              setTheme("Dark");
              resetMenu();
            }}
          >
            Dark
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
