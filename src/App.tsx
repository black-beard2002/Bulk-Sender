import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateGroup from "./pages/Contacts/CreateGroup/CreateGroup";
import ContactsGroup from "./pages/Contacts/Groups/ContactsGroups";
import SendMessages from "./pages/Contacts/SendMessages/SendMessages";
import Templates from "./pages/Templates/Templates";
import NewTemplate from "./pages/Templates/NewTemplate";
import BuildTemplate from "./pages/Templates/BuildTemplate";
import RootLayout from "./layouts/RootLayout";
import { TemplatesProvider } from "./contexts/TemplatesProvider";
import { AuthProvider, useAuth } from "./contexts/AuthProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GroupProvider } from "./contexts/GroupsProvider";
import SignIn from "./pages/Auth/signIn";
import SignUp from "./pages/Auth/signUp";
import AuthLayout from "./layouts/AuthLayout";

// Define types for location state
interface LocationState {
  from: {
    pathname: string;
  };
}

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Public Route wrapper component - redirects to dashboard if user is authenticated
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();
  const from =
    (location.state as LocationState)?.from?.pathname || "/dashboard";

  if (user) {
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            element={
              <PublicRoute>
                <AuthLayout />
              </PublicRoute>
            }
          >
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <ThemeProvider>
                  <TemplatesProvider>
                    <GroupProvider>
                      <RootLayout />
                    </GroupProvider>
                  </TemplatesProvider>
                </ThemeProvider>
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contactsgroups" element={<ContactsGroup />} />
            <Route path="/newgroup" element={<CreateGroup />} />
            <Route path="/sendmessage" element={<SendMessages />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/createtemplate" element={<NewTemplate />} />
            <Route path="/createtemplate/build" element={<BuildTemplate />} />
          </Route>

          {/* Catch-all route - redirects to signin if not authenticated, dashboard if authenticated */}
          <Route
            path="*"
            element={
              <Navigate
                to={localStorage.getItem("user") ? "/dashboard" : "/signin"}
                replace
              />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
