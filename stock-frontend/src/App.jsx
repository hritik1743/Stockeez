import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";

import Home from "./pages/Home";
import StockDetails from "./pages/StockDetails";
import TopPicks from "./pages/TopPicks";
import Compare from "./pages/Compare";
import Watchlist from "./pages/Watchlist";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock/:symbol" element={<StockDetails />} />
        <Route path="/top-picks" element={<TopPicks />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
  );
}
