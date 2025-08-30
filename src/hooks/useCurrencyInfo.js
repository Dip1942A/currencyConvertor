

import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
   

    fetch(`https://api.frankfurter.app/latest?from=${currency ?? "USD"}`)
      .then((res) => res.json())
      .then((res) => setData(res.rates))
      .catch((err) => console.error("Currency API error:", err));
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
