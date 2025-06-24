import LandingPage from "pages/LandingPage";
import "./assets/scss/style.scss";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import DetailsPage from "pages/DetailsPage";
import Checkout from "pages/Checkout";
import BrowseBy from "pages/BrowseBy";
import Stories from "pages/Stories";
import Agents from "pages/Agents";
import Login from "pages/Login";
import Register from "pages/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/properties/:id" element={<DetailsPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/browse-by" element={<BrowseBy />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
