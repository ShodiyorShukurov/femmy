import { useEffect, useState } from 'react';
import { API_PATH1 } from '../utils/constants';
import { Form, message } from 'antd';

const UseAllaAudio = () => {
  const [allaAudio, setAllaAudio] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [form] = Form.useForm();
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [id, setId] = useState(null);

  const openAuidoModal = (item) => {
    setSelectItem(item || null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectItem(null);
  };

  const fetchAllaAudio = async () => {
    try {
      const response = await fetch(API_PATH1 + '/audios/list?take=10&page=1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGxhIiwicm9sZSI6InN1cGVyYWRtaW4iLCJjcmVhdGVfYXQiOiIyMDI1LTA2LTE5VDA2OjU5OjE2LjI1M1oiLCJpYXQiOjE3NTAzMjU4MDJ9.uoXZt1Tg7ugIoAZo_4-7hHzD3cJT8zTYZvabZg8RCzU`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAllaAudio(data);
    } catch (error) {
      console.error('Error fetching audio:', error);
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
    try {
      const res = await fetch(API_PATH1 + `/audios/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGxhIiwicm9sZSI6InN1cGVyYWRtaW4iLCJjcmVhdGVfYXQiOiIyMDI1LTA2LTE5VDA2OjU5OjE2LjI1M1oiLCJpYXQiOjE3NTAzMjU4MDJ9.uoXZt1Tg7ugIoAZo_4-7hHzD3cJT8zTYZvabZg8RCzU`,
        },
      });
      if (res) {
        message.success('Successfully deleted');
      }
      closeDeleteModal();
    } catch (error) {
      closeDeleteModal();
      message.error(error);
      console.log(error);
    } finally {
      fetchAllaAudio();
    }
  };

  useEffect(() => {
    fetchAllaAudio();
  }, []);

  return {
    allaAudio,
    fetchAllaAudio,
    isModalVisible,
    openAuidoModal,
    handleCancel,
    selectItem,
    isModalDelete,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
  };
};

export default UseAllaAudio;
