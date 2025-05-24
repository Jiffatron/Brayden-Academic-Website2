import React, { useEffect, useState } from "react";

interface StockTickerProps {
  symbol: string;
  label: string;
}

const API_KEY = "your_twelve_data_api_key_here"; // Replace with your actual Twelve Data API key

const StockTicker = ({ symbol, label }: StockTickerProps) => {
  // Toggle to enable/disable ticker entirely
  const isEnabled = false;

  const [price, setPrice] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (!isEnabled) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`
        );
        const data = await response.json();

        if (data.status === "ok" || !data.status) {
          setPrice(parseFloat(data.price));
          setOpen(parseFloat(data.open));
        } else {
          console.error(`API error for ${symbol}:`, data.message);
        }
      } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [symbol, isEnabled]);

  if (!isEnabled) return null;

  const isUp = price !== null && open !== null && price >= open;

  return (
    <div className="bg-muted px-3 py-1 rounded shadow text-sm text-center min-w-[100px]">
      <div className="text-primary font-semibold">{label}</div>
      <div className={isUp ? "text-green-500" : "text-red-500"}>
        {price !== null ? `$${price.toFixed(2)}` : "..."}
      </div>
    </div>
  );
};

export default StockTicker;
