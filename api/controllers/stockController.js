// api/controllers/stocksController.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const FMP_KEY = process.env.FMP_KEY;  // e.g. your “4nzVXwp…” key

export const getStockQuote = async (req, res) => {
  try {
    const ticker = req.params.ticker.toUpperCase();
    const url = `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${FMP_KEY}`;



    
    const { data } = await axios.get(url);
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(404).json({ error: 'Ticker not found' });
    }
    const profile = data[0];

    const simplified = {
      price: profile.price,
      change: profile.change,
      changePercent: profile.changesPercentage,
      yearHigh: profile.yearHigh,
      yearLow: profile.yearLow,
      marketCap: profile.marketCap,
      volume: profile.volume,
      eps: profile.eps,
      pe: profile.pe
    };

    return res.json(simplified);
  } catch (err) {
    console.error("Error fetching stock profile:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to fetch profile" });
  }
};
