import React from "react";
import Api from "../api";
import { Form } from "antd";

const usePrice = () => {
  const [data, setData] = React.useState([]);
  const [editData, setEditData] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
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

  const fetchPriceData = async () => {
    try {
      const res = await Api.get("/prices");
      setEditData(false);
      setData([res.data.data]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  React.useEffect(() => {
    fetchPriceData();
  }, [editData]);

  return {
    data,
    setEditData,
    isModalVisible,
    selectItem,
    showModal,
    handleCancel,
  };
};

export default usePrice;
