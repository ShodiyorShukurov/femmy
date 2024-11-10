import { Button, Form, Input, InputNumber, message, Modal } from "antd";
import Api from "../../../api";
import React from "react";

const TrailModal = ({
  setIsLoading,
  isModalVisible,
  selectItem,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isModalVisible && selectItem) {
      form.setFieldsValue({
        source: selectItem.source || "",
        day: selectItem.day || "",
      });
    }
  }, [isModalVisible, selectItem, form]);

  const handleSubmitTrial = async (values) => {
    let data = {
      source: values.source,
      day: values.day,
    };

    try {
      if (selectItem && selectItem.id) {
        data.id = Number(selectItem.id);
        await Api.put("/trial/edit", data);
        message.success("Edit successfully!");
      } else {
        await Api.post("/trial/add", data);
        message.success("Add successfully!");
      }
      setIsLoading(true);
      handleCancel();
      form.resetFields();
    } catch (error) {
      setIsLoading(true);
      console.error(error);
      message.error("Failed");
    }
  };

  return (
    <Modal
      title={selectItem?.id ? "Edit" : "Add"}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmitTrial}>
        <Form.Item
          name="source"
          label="Source"
          rules={[{ required: true, message: "Please Source!" }]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="day"
          label="Day"
          rules={[{ required: true, message: "Please day!" }]}
        >
          <InputNumber style={{ width: "100%" }} min={1} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TrailModal;
