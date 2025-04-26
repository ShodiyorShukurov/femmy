import React from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import Api from '../../../api';

const PasswordModal = ({
  isModalVisible,
  fetchUserListData,
  selectedUser,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  const handleSubmitTrial = async (values) => {
    const data = {
      password: values.password,
    };

    try {
      data.id = selectedUser;
      await Api.put('/user/edit', data);
      message.success('Muvaffaqiyatli tahrirlandi');

      handleCancel();
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Xatolik');
    } finally {
      fetchUserListData();
    }
  };

  return (
    <Modal
      title={selectedUser?.id ? 'Tahrirlash' : "Qo'shish"}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmitTrial}>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Name required',
            },
          ]}
        >
          <Input.Password placeholder="Password" />
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

export default PasswordModal;
