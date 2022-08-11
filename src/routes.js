import CoinCharts from "./pages/CoinCharts";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const routes = [
    {path: '/', element: <Home />},
    {path: '/:coinId', element: <CoinCharts />},
    {path: '*', element: <NotFound />},
]

export default routes