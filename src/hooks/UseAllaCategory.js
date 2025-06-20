import { Form, message } from 'antd';
import { use, useEffect, useState } from 'react';
import Api from '../api';
import { API_PATH1 } from '../utils/constants';

const useAllaCategory = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [form] = Form.useForm();
  const [allaCategoryData, setAllaCategoryData] = useState([]);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [id, setId] = useState(null);

  const openCategoryModal = (item) => {
    setSelectItem(item || null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectItem(null);
  };

  const fetchAllCategories = async () => {
    try {
      const response = await fetch(API_PATH1 + '/categories/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGxhIiwicm9sZSI6InN1cGVyYWRtaW4iLCJjcmVhdGVfYXQiOiIyMDI1LTA2LTE5VDA2OjU5OjE2LjI1M1oiLCJpYXQiOjE3NTAzMjU4MDJ9.uoXZt1Tg7ugIoAZo_4-7hHzD3cJT8zTYZvabZg8RCzU`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setAllaCategoryData(data.data);
      } else {
        console.error('Failed to fetch categories:', data);
        throw new Error(data.message || 'Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
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
      const res = await fetch(API_PATH1+`/categories/${id}`, {
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
      fetchAllCategories();
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return {
    isModalVisible,
    selectItem,
    openCategoryModal,
    handleCancel,
    allaCategoryData,
    fetchAllCategories,
    isModalDelete,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
  };
};

export default useAllaCategory;
