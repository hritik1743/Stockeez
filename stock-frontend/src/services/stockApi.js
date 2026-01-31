import axios from "axios";

export const getStockData = async (symbol) => {
  const res = await axios.get(`http://localhost:5000/api/stocks/${symbol}`);
  return res.data;
};
