import React from "react";
import Api from "../api";

const useDevicesList = () => {
  const [transactionListData, setTransactionListData] = React.useState([]);
  const [next, setNext] = React.useState(1);
  const [isModalUserInfo, setIsModalUserInfo] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const showUserInfoModal = (record) => {
    setSelectedUser(record);
    setIsModalUserInfo(true);
  };

  const fetchTransactionData = async () => {
    setIsLoading(true);
    try {
      const res = await Api.get(`/devices/list?limit=50&page=${next}`);
      setTransactionListData(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 404") {
        setTransactionListData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };



  React.useEffect(() => {
    fetchTransactionData();
  }, [next,]); // Include method in dependencies

  return {
    transactionListData,
    setNext,
    next,
    showUserInfoModal,
    isModalUserInfo,
    setIsModalUserInfo,
    selectedUser,
    setSelectedUser,
    isLoading,
  };
};

export default useDevicesList;
