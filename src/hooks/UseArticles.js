import { Form, message } from "antd";
import React from "react";
import Api from "../api";

const useArticles = () => {
  const [articlesData, setArticlesData] = React.useState([]);
  const [lang, setLang] = React.useState("uz");
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
  const fetchArticlesData = async () => {
    try {
      const res = await Api.get(`/articles/list?limit=50&page=1`);
      setArticlesData(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 404") {
        setArticlesData([]);
      }
    }
  };
  /*Get data function end*/

  /*Video modal function start*/
  const openVideoModal = (item) => {
    setSelectItem(item);
    setVideoModal(true);
  };

  const closeVideoModal = () => {
    setVideoModal(false);
    setSelectItem(null);
  };
  /*Video modal function end*/

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
    const data = {
      id: id,
    };

    try {
      const res = await Api.delete(`/article/delete`, { data });
      if (res) {
        message.success("Successfully deleted");
      }
      closeDeleteModal();
    } catch (error) {
      closeDeleteModal();
      message.error(error);
      console.log(error);
    } finally {
      fetchArticlesData();
    }
  };

  /* Delete functions end*/

  React.useEffect(() => {
    fetchArticlesData();
  }, []);

  return {
    articlesData,
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
    fetchArticlesData,
    openVideoModal,
    closeVideoModal,
    isVideoModal,
    openArticleMoreInfoModal,
    closeArticleMoreInfoModal,
    articleMoreInfoModal,
  };
};

export default useArticles;
