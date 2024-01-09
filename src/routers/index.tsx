import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Navigate
} from "react-router-dom";
import ChatPage from "../components/ChatPage";
import LoginPage from "../components/LoginPage";
import { useAuthStore } from "../store";


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const jwt = useAuthStore(state => state.jwt); // 获取 JWT
  const location = useLocation();

  if (!jwt || jwt === "") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}


const router = createBrowserRouter([
    { path: "/login", element: <LoginPage /> },
    { path: "/", element: <ProtectedRoute><ChatPage /></ProtectedRoute> },
  ]);

const AppRoutes = () => (
  <RouterProvider router={router} />
);

export default AppRoutes;
