import axios from "axios";

export const getStockData = async (symbol) => {
  const url = import.meta.env.VITE_API_URL;

  const res = await axios.get(`${url}/stocks/${symbol}`);
  return res.data;
};
