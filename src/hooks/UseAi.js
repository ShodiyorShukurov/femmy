import { Form, message } from 'antd';
import React from 'react';
import Api from '../api';

const useAi = () => {
  const [aiData, setAiData] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isModalDelete, setIsModalDelete] = React.useState(false);
  const [id, setId] = React.useState();
  const [selectItem, setSelectItem] = React.useState({});
  const [form] = Form.useForm();

  const openAiModal = (item) => {
    setSelectItem(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectItem(null);
    form.resetFields();
  };

  const fetchAiData = async () => {
    try {
      const res = await Api.get(`/ai/list`);
      setAiData(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Request failed with status code 404') {
        setAiData([]);
      }
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
      const res = await Api.delete(`/ai/delete`, { data });
      if (res) {
        message.success('Successfully deleted');
      }
      closeDeleteModal();
    } catch (error) {
      closeDeleteModal();
      message.error(error);
      console.log(error);
    } finally {
      fetchAiData();
    }
  };

  React.useEffect(() => {
    fetchAiData();
  }, []);

  return {
    aiData,
    isModalVisible,
    setIsModalVisible,
    selectItem,
    openAiModal,
    handleCancel,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    isModalDelete,
    fetchAiData,
  };
};

export default useAi;
