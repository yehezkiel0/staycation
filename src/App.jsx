import LandingPage from "pages/LandingPage";
import "./assets/scss/style.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "hooks/useAPI";
import PropertyDetailPage from "pages/PropertyDetailPage";
import StoryDetailPage from "pages/StoryDetailPage";
import AgentDetailPage from "pages/AgentDetailPage";
import Checkout from "pages/Checkout";
import BrowseBy from "pages/BrowseBy";
import Stories from "pages/Stories";
import Agents from "pages/Agents";
import Login from "pages/Login";
import Register from "pages/Register";
import Profile from "pages/Profile";
import MyBookings from "pages/MyBookings";
import APITestPage from "pages/APITestPage";
import NotFound from "pages/NotFound";
import Unauthorized from "pages/Unauthorized";

// Admin Imports
import AdminRoute from "components/AdminRoute";
import ProtectedRoute from "components/ProtectedRoute";
import AdminLayout from "layouts/AdminLayout";
import Dashboard from "pages/Admin/Dashboard";
import AdminCategories from "pages/Admin/Categories";
import CategoryForm from "pages/Admin/Categories/Form";
import AdminProperties from "pages/Admin/Properties";
import PropertyForm from "pages/Admin/Properties/Form";
import AdminBookings from "pages/Admin/Bookings";
import Transactions from "pages/Admin/Transactions";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          pauseOnHover={false}
          style={{ zIndex: 99999 }}
        />
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

            {/* Protected Routes - Require Login */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-bookings" element={<MyBookings />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />

                <Route path="categories" element={<AdminCategories />} />
                <Route path="categories/add" element={<CategoryForm />} />
                <Route path="categories/edit/:id" element={<CategoryForm />} />

                <Route path="properties" element={<AdminProperties />} />
                <Route path="properties/add" element={<PropertyForm />} />
                <Route path="properties/edit/:id" element={<PropertyForm />} />

                <Route path="bookings" element={<AdminBookings />} />
                <Route path="transactions" element={<Transactions />} />
              </Route>
            </Route>

            {/* Error Routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
