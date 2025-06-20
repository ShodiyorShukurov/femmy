import React from 'react';
import { Button, Col, Form, Input, message, Modal, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Api from '../../../api';
import { API_PATH1 } from '../../../utils/constants';

const AllModal = ({
  isModalVisible,
  fetchAllCategories,
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
        title_en: selectItem.title_en || '',
        type: selectItem.type || '0',
      });
    }
  }, [isModalVisible, selectItem, form]);

  const handleSubmitTrial = async (values) => {
    const formData = new FormData();

    formData.append('title_uz', values.title_uz);
    formData.append('title_ru', values.title_ru);
    formData.append('title_en', values.title_en);
    formData.append('type', values.type);
    formData.append('image', values?.image?.file ? values.image.file : null);

    try {
      if (selectItem && selectItem.id) {
        await fetch(API_PATH1 + '/categories/' + selectItem?.id, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGxhIiwicm9sZSI6InN1cGVyYWRtaW4iLCJjcmVhdGVfYXQiOiIyMDI1LTA2LTE5VDA2OjU5OjE2LjI1M1oiLCJpYXQiOjE3NTAzMjU4MDJ9.uoXZt1Tg7ugIoAZo_4-7hHzD3cJT8zTYZvabZg8RCzU`,
          },

          body: formData,
        });
        message.success('Muvaffaqiyatli tahrirlandi');
      } else {
        await fetch(API_PATH1 + '/categories', {
          method: 'POST',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGxhIiwicm9sZSI6InN1cGVyYWRtaW4iLCJjcmVhdGVfYXQiOiIyMDI1LTA2LTE5VDA2OjU5OjE2LjI1M1oiLCJpYXQiOjE3NTAzMjU4MDJ9.uoXZt1Tg7ugIoAZo_4-7hHzD3cJT8zTYZvabZg8RCzU`,
          },
          body: formData,
        });
        message.success("Muvaffaqiyali qo'shildi");
      }
      handleCancel();
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Xatolik');
    } finally {
      fetchAllCategories();
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
              name="title_en"
              label="Title eng"
              rules={[{ required: true, message: 'Title ENG required' }]}
            >
              <Input placeholder="Title Eng" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: 'Type required' }]}
            >
              <Input placeholder="Type" type="number" min={0} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="image"
          label="Photo"
          rules={[
            {
              required: selectItem?.image_url ? false : true,
              message: 'Image required',
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

export default AllModal;
