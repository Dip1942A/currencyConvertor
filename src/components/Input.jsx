import React, { useId } from "react";

function Input({
  label,
  amount='',
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency,
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId();

  return (
    <div
      className={`bg-white/20 backdrop-blur-md border border-white/30 shadow-sm 
      p-4 rounded-xl flex flex-col sm:flex-row gap-4 ${className}`}
    >
      {/* Amount Input */}
      <div className="flex-1">
        <label
          htmlFor={amountInputId}
          className="text-white/80 text-sm font-medium mb-1 block"
        >
          {label}
        </label>
        <input
          id={amountInputId}
          className="w-full px-3 py-2 rounded-lg bg-white/30 text-white 
          placeholder-white/60 border border-white/40 outline-none
          focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
          type="number"
          placeholder="Enter amount"
          disabled={amountDisable}
          value={amount }
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>

      {/* Currency Selector */}
      <div className="flex-1">
        <label
          htmlFor="currency"
          className="text-white/80 text-sm font-medium mb-1 block"
        >
          Currency Type
        </label>
        <select
          className="w-full px-3 py-2 rounded-lg bg-white/30 text-white cursor-pointer 
          border border-white/40 outline-none
          focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          <option value="">Select Currency</option>
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency} className="text-black">
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Input;


