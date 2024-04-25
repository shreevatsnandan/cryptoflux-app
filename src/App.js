import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import TrendingCrypto from './Components/TrendingCrypto';
import Cryptolist from './Components/Cryptolist';
import NewsPage from './Components/NewsPage';
import Dashboard from './Components/Dashboard';
import About from './Components/About';
import Footer from './Components/Footer';

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><TrendingCrypto /><Cryptolist /><Footer/></>,
    },
    {
      path: "/dashboard/:id",
      element: <><Navbar /><Dashboard /><Footer/></>,
    },
    {
      path: "/NewsPage", 
      element: <><Navbar /><NewsPage /><Footer/></>,
    },
    {
      path: "/About",
      element: <><Navbar /><About /><Footer/></>,
    },
  ]);

  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
        
      </div>
    </>
  );
}
