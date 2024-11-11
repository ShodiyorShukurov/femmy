import { Button, Form, InputNumber, message, Modal } from "antd";
import Api from "../../../api";
import React from "react";import { data } from "../../../mock/data";
import { useMain } from "../../../hooks/UseMain";

const PriceModal = ({
  setEditData,
  isModalVisible,
  selectItem,
  handleCancel,
}) => {
  
  const { changeValue } = useMain();
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
      message.success(data[changeValue].bot_settings.price_success);
      handleCancel();
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error(data[changeValue].bot_settings.price_error);
    } finally {
      setEditData(false);
    }
  };

  return (
    <Modal
      title={data[changeValue].bot_settings.price_title}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleEditPrice}>
        <Form.Item
          name="price"
          label={data[changeValue].bot_settings.price_label}
          rules={[
            {
              required: true,
              message: data[changeValue].bot_settings.price_required,
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} min={1} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {data[changeValue].bot_settings.price_button}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PriceModal;
