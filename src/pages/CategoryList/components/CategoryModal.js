import React from 'react';
import { Button, Form, Input, message, Modal, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Api from '../../../api';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

const CategoryModal = ({
  isModalVisible,
  fetchCategoryData,
  selectItem,
  handleCancel,
}) => {
  const [fileList, setFileList] = React.useState([]);
  const [form] = Form.useForm();
  console.log(selectItem);
  React.useEffect(() => {
    if (isModalVisible && selectItem) {
      form.setFieldsValue({
        name: selectItem.name || '',
        type: selectItem.type || '',
        free: selectItem.free ? 'true' : 'false',
        lang: selectItem.lang || '',
        html_code: selectItem.html_code || '',
      });
    }
  }, [isModalVisible, selectItem, form]);

  const handleSubmitTrial = async (values) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('lang', values.lang);
    formData.append('type', values.type);
    formData.append('free', values.free);
    formData.append('html_code', values.html_code);
    formData.append('image', values?.image?.file);

    try {
      if (selectItem && selectItem.id) {
        formData.append('id', selectItem.id);
        await Api.put('/category/edit', formData);
        message.success('Muvaffaqiyatli tahrirlandi');
      } else {
        await Api.post('/category/add', formData);
        message.success("Muvaffaqiyali qo'shildi");
      }
      handleCancel();
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Xatolik');
    } finally {
      fetchCategoryData();
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
          name="type"
          label="Type"
          rules={[
            {
              required: true,
              message: 'Type required',
            },
          ]}
        >
          <Select placeholder="Change Type">
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
          name="lang"
          label={'Language'}
          rules={[
            {
              required: true,
              message: 'Language required',
            },
          ]}
        >
          <Select placeholder="Change Lang">
            <Option value="uz" key="uz">
              Uzbek
            </Option>
            <Option value="en" key="en">
              English
            </Option>
            <Option value="ru" key="ru">
              Russian
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="html_code"
          label="Html code"
          rules={[
            {
              required: true,
              message: 'Html code required',
            },
          ]}
        >
          <TextArea placeholder="Html code" rows={5} />
        </Form.Item>


        <Form.Item
          name="free"
          label={'Premium'}
          rules={[
            {
              required: true,
              message: 'Premium required',
            },
          ]}
        >
          <Select placeholder="Change Premium">
            <Option value="true" key="1">
              True
            </Option>
            <Option value="false" key="2">
              False
            </Option>
          </Select>
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

export default CategoryModal;
