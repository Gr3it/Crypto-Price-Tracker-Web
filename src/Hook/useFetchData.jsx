import { useEffect, useState } from "react";
import CoinGecko from "coingecko-api";

function useFetchData(pageNumber, currency) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coins, setCoins] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const CoinGeckoClient = new CoinGecko();

  useEffect(() => {
    if (pageNumber === 1) {
      setCoins([]);
    }
    if (!hasMore || pageNumber > 20) return;
    setLoading(true);
    setError(false);
    CoinGeckoClient.coins
      .markets({
        vs_currency: currency.toLowerCase(),
        order: "market_cap_desc",
        per_page: 100,
        page: pageNumber,
        sparkline: false,
        price_change_percentage: "24h",
      })
      .then((data) => {
        setCoins((prevCoins) => {
          return [
            ...new Set(
              [...prevCoins, ...data.data].sort(
                (first, second) =>
                  first.market_cap_rank - second.market_cap_rank
              )
            ),
          ];
        });
        setHasMore(data.data !== []);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
      });
  }, [pageNumber]);
  return { loading, error, coins, hasMore };
}

export default useFetchData;
