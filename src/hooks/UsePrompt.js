import React from 'react';
import Api from '../api';
import { Form } from 'antd';

const UsePrompt = () => {
  const [userPrompData, setUserPrompData] = React.useState([]);
  const [next, setNext] = React.useState(1);
  const [isModalUserInfo, setIsModalUserInfo] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const [form] = Form.useForm();

  const showUserInfoModal = (record) => {
    setSelectedUser(record);
    setIsModalUserInfo(true);
  };

  const fetchUserPrompData = async (id) => {
    setIsLoading(true);
    try {
      if (id) {
        const res = await Api.get(`/user-data/list?limit=50&page=${next}&id=${id}`);
        setUserPrompData(res.data.data);
      } else {
        const res = await Api.get(`/user-data/list?limit=50&page=${next}`);
        setUserPrompData(res.data.data);
      }
    } catch (error) {
      console.error(error);
      if (error.message === 'Request failed with status code 404') {
        setUserPrompData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUserPrompData();
  }, [next]);

  return {
    userPrompData,
    next,
    setNext,
    selectedUser,
    setSelectedUser,
    showUserInfoModal,
    isModalUserInfo,
    setIsModalUserInfo,
    isLoading,
    fetchUserPrompData,
  };
};

export default UsePrompt;
