import React from "react";
import { Button, Form, Input, message, Modal } from "antd";
import Api from "../../../api";

const ChannelAdminModal = ({
  setEditChannelData,
  isModalChannelVisible,
  handleChannelCancel,
  selectChannelItem,
  setSelectChannelItem,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isModalChannelVisible && selectChannelItem) {
      form.setFieldsValue({
        username: selectChannelItem.username || "",
      });
    }
  }, [isModalChannelVisible, selectChannelItem, form]);

  const handleEditPrice = async (values) => {
    const data = {
      id: Number(selectChannelItem.id),
      username: values.username,
    };

    try {
      await Api.put("/channel-admin/edit", data);
      setEditChannelData(true);
      message.success("Username edit successfully!");
      handleChannelCancel();
      setSelectChannelItem({});
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Failed to edit username.");
    }
  };


  return (
    <Modal
      title="Edit Username"
      open={isModalChannelVisible}
      onCancel={handleChannelCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleEditPrice}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please Username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Edit Username
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChannelAdminModal;
