import React from 'react';
import { Button, Form, Input, message, Modal, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Api from '../../../api';
import TextArea from 'antd/lib/input/TextArea';
import useCategory from '../../../hooks/UseCategory';

const { Option } = Select;

const ArticlesModal = ({
  isModalVisible,
  fetchArticlesData,
  selectItem,
  handleCancel,
}) => {
  const { categoryData } = useCategory();
  const [fileList, setFileList] = React.useState([]);
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isModalVisible && selectItem) {
      form.setFieldsValue({
        title: selectItem.title || '',
        description: selectItem.description || '',
        html_code: selectItem.html_code || '',
        category_id: selectItem.category_id || '',
        source: selectItem.source || '',
        video_url: selectItem.video_url || '',
        featured: selectItem.featured ? 'true' : 'false',
        free: selectItem.free ? 'true' : 'false',
        lang: selectItem.lang || '',
      });
    }
  }, [isModalVisible, selectItem, form]);

  const handleSubmitTrial = async (values) => {
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('html_code', values.html_code);
    formData.append('category_id', values.category_id);
    formData.append('source', values.source);
    formData.append('video_url', values.video_url);
    formData.append('featured', values.featured);
    formData.append('free', values.free);
    formData.append('image', values?.image?.file);

    try {
      if (selectItem && selectItem.id) {
        formData.append('id', selectItem.id);
        await Api.put('/article/edit', formData);
        message.success('Muvaffaqiyatli tahrirlandi');
      } else {
        await Api.post('/article/add', formData);
        message.success("Muvaffaqiyali qo'shildi");
      }
      handleCancel();
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Xatolik');
    } finally {
      fetchArticlesData();
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
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Title required',
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Description required',
            },
          ]}
        >
          <TextArea placeholder="Description" rows={5} />
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
          name="category_id"
          label={'Category'}
          rules={[
            {
              required: true,
              message: 'Category required',
            },
          ]}
        >
          <Select placeholder="Change Category">
            {categoryData.length > 0
              ? categoryData.map((category) => (
                  <Option value={category.id} key={category.id}>
                    {category.name}
                  </Option>
                ))
              : ''}
          </Select>
        </Form.Item>

        <Form.Item
          name="source"
          label="Source"
          rules={[
            {
              required: true,
              message: 'Source required',
            },
          ]}
        >
          <Input placeholder="Source" />
        </Form.Item>

        <Form.Item name="video_url" label="Afzalliklar">
          <Input placeholder="Afzalliklar"  />
        </Form.Item>

        <Form.Item
          name="featured"
          label={'Featured'}
          rules={[
            {
              required: true,
              message: 'Featured required',
            },
          ]}
        >
          <Select placeholder="Change Featured">
            <Option value="true" key="1">
              True
            </Option>
            <Option value="false" key="2">
              False
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="free"
          label={'Free'}
          rules={[
            {
              required: true,
              message: 'Free required',
            },
          ]}
        >
          <Select placeholder="Change Free">
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

export default ArticlesModal;
