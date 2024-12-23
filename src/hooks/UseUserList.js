import React from "react";
import Api from "../api";
import { Form } from "antd";

const useUserList = () => {
  const [userListData, setUserListData] = React.useState([]);
  const [sourceData, setSourceData] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [next, setNext] = React.useState(1);
  const [isTransactionModalVisible, setIsTransactionModalVisible] =
    React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [isModalUserInfo, setIsModalUserInfo] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [form] = Form.useForm();

  const openMessageModal = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const showTransactionModal = (record) => {
    setSelectedUser(record);
    setIsTransactionModalVisible(true);
  };

  const handleTransactionCancel = () => {
    setIsTransactionModalVisible(false);
    form.resetFields();
  };

  const showUserInfoModal = (record) => {
    setSelectedUser(record);
    setIsModalUserInfo(true);
  };

  const fetchUserListData = async () => {
    setIsLoading(true);
    try {
      const res = await Api.get(`/users/list?limit=50&page=${next}`);
      setUserListData(res.data.data);
    } catch (error) {
      console.error(error);
      if (error.message === "Request failed with status code 404") {
        setUserListData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };


  React.useEffect(() => {
    fetchUserListData();
  }, [next]);

  return {
    userListData,
    next,
    setNext,
    isModalVisible,
    handleCancel,
    selectedUser,
    setSelectedUser,
    openMessageModal,
    isTransactionModalVisible,
    handleTransactionCancel,
    showTransactionModal,
    showUserInfoModal,
    isModalUserInfo,
    setIsModalUserInfo,
    sourceData,
    isLoading,
  };
};

export default useUserList;
