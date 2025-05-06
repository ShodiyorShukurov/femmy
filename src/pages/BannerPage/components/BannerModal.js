import React from 'react';
import { Button, Col, Form, Input, message, Modal, Row, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Api from '../../../api';
import TextArea from 'antd/lib/input/TextArea';
import useCategory from '../../../hooks/UseCategory';

const { Option } = Select;

const BannerModal = ({
  isModalVisible,
  fetchBannersData,
  selectItem,
  handleCancel,
}) => {

  const [fileList, setFileList] = React.useState([]);
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isModalVisible && selectItem) {
      form.setFieldsValue({
        title_uz: selectItem.title_uz || '',
        title_ru: selectItem.title_ru || '',
        title_eng: selectItem.title_eng || '',
        description_uz: selectItem.description_uz || '',
        description_ru: selectItem.description_ru || '',
        description_eng: selectItem.description_eng || '',
        mode: selectItem.mode || '0',
      });
    }
  }, [isModalVisible, selectItem, form]);

  const handleSubmitTrial = async (values) => {
    const formData = new FormData();

    formData.append('title_uz', values.title_uz);
    formData.append('title_ru', values.title_ru);
    formData.append('title_eng', values.title_eng);
    formData.append('description_uz', values.description_uz);
    formData.append('description_ru', values.description_ru);
    formData.append('description_eng', values.description_eng);
    formData.append('mode', values.mode);
    formData.append('image', values?.image?.file);

    try {
      if (selectItem && selectItem.id) {
        formData.append('id', selectItem.id);
        await Api.put('/banner/edit', formData);
        message.success('Muvaffaqiyatli tahrirlandi');
      } else {
        await Api.post('/banner/add', formData);
        message.success("Muvaffaqiyali qo'shildi");
      }
      handleCancel();
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Xatolik');
    } finally {
      fetchBannersData();
    }
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length === 0) {
      form.setFieldsValue({ photo: null });
    }
  };

  const beforeUpload = (file) => {
    const isImageOrVideo = file.type.startsWith('image/');
    if (!isImageOrVideo) {
      message.error('');
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  return (
    <Modal
      title={selectItem?.id ? 'Tahrirlash' : "Qo'shish"}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
    <Form form={form} layout="vertical" onFinish={handleSubmitTrial}>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item
        name="title_uz"
        label="Title uz"
        rules={[{ required: true, message: 'Title UZ required' }]}
      >
        <Input placeholder="Title Uz" />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        name="title_ru"
        label="Title ru"
        rules={[{ required: true, message: 'Title RU required' }]}
      >
        <Input placeholder="Title Ru" />
      </Form.Item>
    </Col>
  </Row>

  <Row gutter={16}>
    <Col span={12}>
      <Form.Item
        name="title_eng"
        label="Title Eng"
        rules={[{ required: true, message: 'Title Eng required' }]}
      >
        <Input placeholder="Title Eng" />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        name="mode"
        label="Mode"
        rules={[{ required: true, message: 'Change mode required' }]}
      >
        <Select placeholder="Select mode" allowClear>
          <Option value="0">All</Option>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
        </Select>
      </Form.Item>
    </Col>
  </Row>

  <Row gutter={16}>
    <Col span={12}>
      <Form.Item
        name="description_uz"
        label="Description uz"
        rules={[{ required: true, message: 'Description Uz required' }]}
      >
        <TextArea placeholder="Description Uz" />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        name="description_ru"
        label="Description ru"
        rules={[{ required: true, message: 'Description Ru required' }]}
      >
        <TextArea placeholder="Description Ru" />
      </Form.Item>
    </Col>
  </Row>

  <Form.Item
    name="description_eng"
    label="Description eng"
    rules={[{ required: true, message: 'Description Eng required' }]}
  >
    <TextArea placeholder="Description Eng" />
  </Form.Item>

  <Form.Item
    name="image"
    label="Photo"
    rules={[
      {
        required: selectItem?.image_url ? false : true,
        message: 'Photo required',
      },
    ]}
  >
    <Upload
      fileList={fileList}
      beforeUpload={beforeUpload}
      onChange={handleUploadChange}
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
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

export default BannerModal;
