import { Form, message } from 'antd';
import React from 'react';
import Api from '../api';

const usePrice = () => {
  const [priceData, setPriceData] = React.useState([]);
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

  const fetchPriceData = async () => {
    try {
      const res = await Api.get(`/price`);
      setPriceData(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Request failed with status code 404') {
        setPriceData([]);
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
      const res = await Api.delete(`/price`, { data });
      if (res) {
        message.success('Successfully deleted');
      }
      closeDeleteModal();
    } catch (error) {
      closeDeleteModal();
      message.error(error);
      console.log(error);
    } finally {
        fetchPriceData();
    }
  };

  React.useEffect(() => {
    fetchPriceData();
  }, []);

  return {
    priceData,
    isModalVisible,
    setIsModalVisible,
    selectItem,
    openAiModal,
    handleCancel,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    isModalDelete,
    fetchPriceData,
  };
};

export default usePrice;
