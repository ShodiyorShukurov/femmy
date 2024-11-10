import { Button, Form, InputNumber, message, Modal } from "antd";
import Api from "../../../api";
import React from "react";

const PriceModal = ({
  setEditData,
  isModalVisible,
  selectItem,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isModalVisible && selectItem) {
      form.setFieldsValue({
        price: Number(selectItem.price / 100) || "",
      });
    }
  }, [isModalVisible, selectItem, form]);

  const handleEditPrice = async (values) => {
    setEditData(true);
    const data = {
      id: Number(selectItem.id),
      price: Math.round(values.price * 100),
    };

    try {
      await Api.put("/price/edit", data);
      message.success("Price edit successfully!");
      handleCancel();
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Failed to edit price.");
    } finally {
      setEditData(false);
    }
  };

  return (
    <Modal
      title="Edit Price"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleEditPrice}>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please Price!" }]}
        >
          <InputNumber style={{ width: "100%" }} min={1} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Edit Price
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PriceModal;
