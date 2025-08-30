import { useEffect, useState } from "react";
import Input from "./components/Input";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencies, setCurrencies] = useState([]);

  const currencyInfo = useCurrencyInfo(from);

  useEffect(() => {
    fetch("https://api.frankfurter.app/currencies")
      .then((res) => res.json())
      .then((res) => setCurrencies(Object.keys(res)))
      .catch((err) => console.error("Currency list error:", err));
  }, []);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (!currencyInfo[to]) {
      console.warn("Rates not loaded yet", currencyInfo[to]);
      return;
    }
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full max-w-lg mx-auto rounded-2xl p-6 shadow-2xl 
        backdrop-blur-lg bg-white/10 border border-white/30">
        
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          🌍 Currency Converter
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="space-y-6"
        >
          
          <Input
            label="From"
            amount={amount}
            currencyOptions={currencies}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
            onAmountChange={(val) => setAmount(val)}
          />

         
          <div className="flex justify-center">
            <button
              type="button"
              onClick={swap}
              className="bg-gradient-to-r from-pink-500 to-red-500 
              text-white px-4 py-2 rounded-full shadow-md
              hover:shadow-lg hover:scale-110 hover:rotate-180 
              transition-transform duration-500 ease-in-out"
            >
              🔄
            </button>
          </div>

          
          <Input
            label="To"
            amount={convertedAmount}
            currencyOptions={currencies}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
            amountDisable
          />

         
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 
              text-white font-semibold px-4 py-3 rounded-xl 
              shadow-md hover:shadow-xl hover:scale-105 
              transition-all duration-300 ease-in-out 
              focus:ring-4 focus:ring-blue-300 active:scale-95"
          >
            Convert {from ? from.toUpperCase() : "FROM"} →{" "}
            {to ? to.toUpperCase() : "TO"}
          </button>
        </form>

        
<p className="text-center text-white/70 text-xs mt-6">
  Crafted with ❤️ by <span className="font-semibold">Dipan Sahu</span>
</p>

      </div>
    </div>
  );
}

export default App;

