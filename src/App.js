import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import 'antd/dist/antd.css';
import './assets/styles/main.css';
import './assets/styles/responsive.css';
import PrivateRoute from './utils/PrivateRoute';
import LoginPage from './components/layout/Login';
import UsersListTable from './pages/UserList/UsersListTable';
import DevicesListTable from './pages/DevicesList/DevicesListTable';
import CategoryListTable from './pages/CategoryList/CategoryListTable';
import ArticlesListTable from './pages/ArticlesList/ArticlesListTable';

function DeepLinkPage() {
  const { id } = useParams();

  return (
    <div>
      <h2>Deep Link Ochildi! Parametr: {id}</h2>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/article_details_page/:id" element={<DeepLinkPage />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="users-list" element={<UsersListTable />} />
          <Route path="devices-list" element={<DevicesListTable />} />
          <Route path="categories-list" element={<CategoryListTable />} />
          <Route path="articles-list" element={<ArticlesListTable />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
