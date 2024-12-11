import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider} from "./context/AuthContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LogIn from "./pages/LogInPage/LogIn";
import SignUp from "./pages/SignUpPage/SignUp";
import Profile from "./pages/ProfilePage/Profile";
import Library from "./pages/LibraryPage/Library";
import Wishlist from "./pages/WishlistPage/Wishlist";
import Help from "./pages/HelpPage/Help";
import About from "./pages/AboutPage/About";
import CustomizeProfile from "./pages/CustomizeProfilePage/CustomizeProfile";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import RouteGuard from "./components/ProtectedRoute";
import FirstLogin from "./components/FirstLogIn";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/profile"
              element={
                <RouteGuard>
                  <Profile />
                </RouteGuard>
              }
            />
            <Route
              path="/library"
              element={
                <RouteGuard>
                  <Library />
                </RouteGuard>
              }
            />
            <Route
              path="/wishlist"
              element={
                <RouteGuard>
                  <Wishlist />
                </RouteGuard>
              }
            />
            <Route
              path="/help"
              element={
                <RouteGuard>
                  <Help />
                </RouteGuard>
              }
            />
            <Route path="/" element={<About />} />
            <Route
              path="/settings"
              element={
                <RouteGuard>
                  <CustomizeProfile />
                </RouteGuard>
              }
            />
            <Route
              path="/customize-profile"
              element={<FirstLogin> <CustomizeProfile /> </FirstLogin>}
            />
            <Route
              path="/change-password"
              element={
                <RouteGuard>
                  <ChangePassword />
                </RouteGuard>
              }
            />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
