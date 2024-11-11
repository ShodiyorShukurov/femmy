import React from "react";
import Api from "../api";
import { Form, message } from "antd";

const useTrial = () => {
  const [trialListData, setTrialListData] = React.useState([]);
  const [next, setNext] = React.useState(1);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isModalDelete, setIsModalDelete] = React.useState(false);
  const [id, setId] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState({});
  const [form] = Form.useForm();

  const showModal = (item) => {
    setSelectItem(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const fetchTrailData = async () => {
    setIsLoading(true);

    try {
      const res = await Api.get(`/trial/list`);
      setTrialListData(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 404") {
        setTrialListData([]);
      }
    }finally{
      setIsLoading(false)
    }
  };

  const openDeleteModal = (id) => {
    setId(id);
    setIsModalDelete(true);
  };

  const closeDeleteModal = () => {
    setIsModalDelete(false);
    setId(null);
  };

  const handleDelete = async () => {
    const data = {
      id: id,
    };

    try {
      const res = await Api.delete(`/trial/delete`, { data });
      if (res) {
        message.success("Successfully deleted");
      }
      closeDeleteModal();
    } catch (error) {
      closeDeleteModal()
      message.error(error);
      console.log(error);
    }finally{
      fetchTrailData();
    }
  };

  React.useEffect(() => {
    fetchTrailData();
  }, []);

  return {
    trialListData,
    setNext,
    next,
    isModalVisible,
    selectItem,
    showModal,
    handleCancel,
    isLoading,
    setIsLoading,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    isModalDelete,
    fetchTrailData,
  };
};

export default useTrial;
