import React from 'react';
import { Button, Form, Input, InputNumber, message, Modal, Select } from 'antd';
import Api from '../../../api';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

const PriceModal = ({
  isModalVisible,
  fetchPriceData,
  selectItem,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isModalVisible && selectItem) {
      form.setFieldsValue({
        title_uz: selectItem.title_uz || '',
        title_ru: selectItem.title_ru || '',
        title_eng: selectItem.title_eng || '',
        period: selectItem.period || '',
        price: selectItem.price || '',
        sort_order: selectItem.sort_order || '',
      });
    }
  }, [isModalVisible, selectItem, form]);

  const handleSubmitTrial = async (values) => {
    const data = {
      title_uz: values.title_uz,
      title_ru: values.title_ru,
      title_eng: values.title_eng,
      period: values.period,
      price: values.price,
      sort_order: values.sort_order,
    };

    try {
      if (selectItem && selectItem.id) {
        data.id = selectItem.id;
        await Api.put('/price', data);
        message.success('Muvaffaqiyatli tahrirlandi');
      } else {
        await Api.post('/price', data);
        message.success("Muvaffaqiyali qo'shildi");
      }
      handleCancel();
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Xatolik');
    } finally {
      fetchPriceData();
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
          name="title_uz"
          label="Title Uz"
          rules={[
            {
              required: true,
              message: 'Title uz required',
            },
          ]}
        >
          <Input placeholder="Title Uz" />
        </Form.Item>

        <Form.Item
          name="title_eng"
          label="Title Eng"
          rules={[
            {
              required: true,
              message: 'Title eng required',
            },
          ]}
        >
          <Input placeholder="Title Eng" />
        </Form.Item>

        <Form.Item
          name="title_ru"
          label="Title Ru"
          rules={[
            {
              required: true,
              message: 'Title ru required',
            },
          ]}
        >
          <Input placeholder="Title Ru" />
        </Form.Item>

        <Form.Item
          name="period"
          label="Period"
          rules={[
            {
              required: true,
              message: 'Period required',
            },
          ]}
        >
          <InputNumber placeholder="Period" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: 'Price required',
            },
          ]}
        >
          <InputNumber placeholder="Price" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="sort_order"
          label="Sort order"
          rules={[
            {
              required: true,
              message: 'Sort order required',
            },
          ]}
        >
          <InputNumber placeholder="Sort order" style={{ width: '100%' }} />
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

export default PriceModal;
