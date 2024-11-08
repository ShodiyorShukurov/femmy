import { Route, Routes, Navigate } from "react-router-dom";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import LoginPage from "./components/layout/Login";
import UsersListTable from "./pages/UserList/UsersListTable";
import TransactionListTable from "./pages/TransactionList/TransactionListTable";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./pages/Home";
import BotSettings from "./pages/BotSettings/BotSettings";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Private route logic for protecting routes */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Home />} />
          <Route path="user-list" element={<UsersListTable />} />
          <Route path="transaction-list" element={<TransactionListTable />} />
          <Route path="bot-settings" element={<BotSettings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
