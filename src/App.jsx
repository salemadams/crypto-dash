import {useEffect, useState} from "react";
import {Route, Routes} from "react-router";
import HomePage from "./pages/home.jsx";
import AboutPage from "./pages/about.jsx";
import Header from "./components/Header.jsx";
import CoinDetailsPage from "./pages/coin-details.jsx";
import NotFound from "./pages/not-found.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('market_cap_desc');

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const res = await fetch(`${API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`);
                if (!res.ok) throw new Error("Could not fetch coins");
                const data = await res.json();
                setCoins(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchCoins();
    }, [limit])

    return <>
    <Header/>
    <Routes>
        <Route path="/" element={ <HomePage coins={coins} filter={filter} setFilter={setFilter} limit={limit} setLimit={setLimit} sortBy={sortBy} setSortBy={setSortBy} loading={loading} error={error}/>}/>
        <Route path="/about" element={ <AboutPage/>}/>
        <Route path="/coin/:id" element={<CoinDetailsPage/>}/>
        <Route path="*" element={ <NotFound/>}/>
    </Routes>
        </>
}

export default App
