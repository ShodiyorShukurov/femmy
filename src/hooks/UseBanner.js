import { Form, message } from 'antd';
import React from 'react';
import Api from '../api';

const useBanner = () => {
  const [bannersData, setBannersData] = React.useState([]);
  const [lang, setLang] = React.useState('uz');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isModalDelete, setIsModalDelete] = React.useState(false);
  const [isVideoModal, setVideoModal] = React.useState(false);
  const [articleMoreInfoModal, setArticleMoreInfoModal] = React.useState(false);
  const [id, setId] = React.useState();
  const [selectItem, setSelectItem] = React.useState({});
  const [form] = Form.useForm();

  const openCategoryModal = (item) => {
    setSelectItem(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectItem(null);
    form.resetFields();
  };

  /*Get data function start*/
  const fetchBannersData = async () => {
    try {
      const res = await Api.get(`/banners/list/admin?limit=50&page=1`);
      setBannersData(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Request failed with status code 404') {
        setBannersData([]);
      }
    }
  };

  /*Article by id function start*/
  const openArticleMoreInfoModal = (id) => {
    setSelectItem(id);
    setArticleMoreInfoModal(true);
  };

  const closeArticleMoreInfoModal = () => {
    setSelectItem(null);
    setArticleMoreInfoModal(false);
  };
  /*Article by id function end*/

  /* Delete functions start*/
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
      const res = await Api.delete(`/banner/${id}`);
      if (res.data) {
        message.success('Successfully deleted');
      }
      closeDeleteModal();
    } catch (error) {
      closeDeleteModal();
      message.error(error);
      console.log(error);
    } finally {
      fetchBannersData();
    }
  };


  React.useEffect(() => {
    fetchBannersData();
  }, []);

  return {
    bannersData,
    setLang,
    lang,
    isModalVisible,
    setIsModalVisible,
    selectItem,
    openCategoryModal,
    handleCancel,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    isModalDelete,
    fetchBannersData,
    isVideoModal,
    openArticleMoreInfoModal,
    closeArticleMoreInfoModal,
    articleMoreInfoModal,
  };
};

export default useBanner;
