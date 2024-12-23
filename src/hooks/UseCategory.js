import { Form, message } from "antd";
import React from "react";
import Api from "../api";

const useCategory = () => {
  const [categoryData, setCategoryData] = React.useState([]);
  const [lang, setLang] = React.useState("uz");
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isModalDelete, setIsModalDelete] = React.useState(false);
  const [id, setId] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState({});
  const [form] = Form.useForm();

  const openCategoryModal = (item) => {
    setSelectItem(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectItem(null);
    form.resetFields()
  };

  const fetchCategoryData = async () => {
    setIsLoading(true);
    try {
      const res = await Api.get(`/categories`);
      setCategoryData(res.data.data);
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 404") {
        setCategoryData([]);
      }
    } finally {
      setIsLoading(false);
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
      const res = await Api.delete(`/category/delete`, { data });
      if (res) {
        message.success("Successfully deleted");
      }
      closeDeleteModal();
    } catch (error) {
      closeDeleteModal();
      message.error(error);
      console.log(error);
    } finally {
      fetchCategoryData();
    }
  };

  React.useEffect(() => {
    fetchCategoryData();
  }, []);

  return {
    categoryData,
    setLang,
    lang,
    isModalVisible,
    setIsModalVisible,
    selectItem,
    openCategoryModal,
    handleCancel,
    // isLoading,
    // setIsLoading,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    isModalDelete,
    fetchCategoryData,
  };
};

export default useCategory;
