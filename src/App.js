import LandingPage from "pages/LandingPage";
import "./assets/scss/style.scss";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import PropertyDetailPage from "pages/PropertyDetailPage";
import StoryDetailPage from "pages/StoryDetailPage";
import AgentDetailPage from "pages/AgentDetailPage";
import Checkout from "pages/Checkout";
import BrowseBy from "pages/BrowseBy";
import Stories from "pages/Stories";
import Agents from "pages/Agents";
import Login from "pages/Login";
import Register from "pages/Register";
import APITestPage from "pages/APITestPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/properties" element={<BrowseBy />} />
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:id" element={<StoryDetailPage />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agents/:id" element={<AgentDetailPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/browse-by" element={<BrowseBy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/api-test" element={<APITestPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
