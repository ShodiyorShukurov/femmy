import React from 'react';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import Api from '../../../api';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

const AiModal = ({ isModalVisible, fetchAiData, selectItem, handleCancel }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isModalVisible && selectItem) {
      form.setFieldsValue({
        name: selectItem.name || '',
        token: selectItem.token || '',
        mode_id: selectItem.mode_id || '',
        prompt: selectItem.prompt || '',
        model: selectItem.model || '',
        questions: selectItem.questions.join('\n') || '',
      });
    }
  }, [isModalVisible, selectItem, form]);

  const handleSubmitTrial = async (values) => {

    const data = {
      name: values.name,
      token: values.token,
      mode_id: Number(values.mode_id),
      prompt: values.prompt,
      model: values.model,
      questions: values.questions.split('\n'),
    };

    try {
      if (selectItem && selectItem.id) {
        data.id = selectItem.id;
        await Api.put('/ai/edit', data);
        message.success('Muvaffaqiyatli tahrirlandi');
      } else {
        await Api.post('/ai/add', data);
        message.success("Muvaffaqiyali qo'shildi");
      }
      handleCancel();
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Xatolik');
    } finally {
      fetchAiData();
    }
  };

  return (
    <Modal
      title={selectItem?.id ? 'Tahrirlash' : "Qo'shish"}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmitTrial}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Name required',
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="token"
          label="Token"
          rules={[
            {
              required: true,
              message: 'Token required',
            },
          ]}
        >
          <Input placeholder="Token" />
        </Form.Item>

        <Form.Item
          name="prompt"
          label="Prompt"
          rules={[
            {
              required: true,
              message: 'Prompt required',
            },
          ]}
        >
          <TextArea placeholder="Prompt" rows={5} />
        </Form.Item>

        <Form.Item
          name="mode_id"
          label={'Mode id'}
          rules={[
            {
              required: true,
              message: 'Mode id required',
            },
          ]}
        >
          <Select placeholder="Change Mode Id">
            <Option value="1" key="1">
              1
            </Option>
            <Option value="2" key="2">
              2
            </Option>
            <Option value="3" key="3">
              3
            </Option>
            <Option value="4" key="4">
              4
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="model"
          label="Model"
          rules={[
            {
              required: true,
              message: 'Model required',
            },
          ]}
        >
          <Input placeholder="Model" />
        </Form.Item>

        <Form.Item
          name="questions"
          label="Questions"
          rules={[
            {
              required: true,
              message: 'Questions required',
            },
          ]}
        >
          <TextArea placeholder="Questions" rows={5} />
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

export default AiModal;
