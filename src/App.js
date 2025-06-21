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
import AiPages from './pages/Ai/AiPages';
import UserEdit from './pages/UserList/components/UserEdit';
import PricePage from './pages/Price/PricePage';
import Banner from './pages/BannerPage/Banner';
import AllaCategoryList from './pages/AllaCategoryList/AllaCategoryList';
import AllaAudio from './pages/AllaAudio/AllaAudio';
import UserPromptDataList from './pages/UserPromptData/UserPromptDataList';

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

        <Route path="/" element={<Navigate to='/login'/>} />

        <Route path="/article_details_page/:id" element={<DeepLinkPage />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="users-list" element={<UsersListTable />} />
          <Route path="devices-list" element={<DevicesListTable />} />
          <Route path="categories-list" element={<CategoryListTable />} />
          <Route path="articles-list" element={<ArticlesListTable />} />
          <Route path="ai-list" element={<AiPages />} />
          <Route path="user-edit" element={<UserEdit />} />
          <Route path="price-list" element={<PricePage />} />
          <Route path="banner" element={<Banner />} />
          <Route path="alla-category-list" element={<AllaCategoryList/>} />
          <Route path="alla-audio" element={<AllaAudio />} />
          <Route path="user-prompt" element={<UserPromptDataList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
