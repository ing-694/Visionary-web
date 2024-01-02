import { Router, Route } from "wouter";
import ChatPage from "../components/ChatPage";
import LoginPage from "../components/LoginPage";


const AppRoutes = () => (
  <Router>
    <Route path="/login">
      <LoginPage />
    </Route>
    <Route path="/">
      <ChatPage />
    </Route>
  </Router>
);

export default AppRoutes;
