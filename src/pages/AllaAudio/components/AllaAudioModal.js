import React from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Upload,
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { API_PATH1 } from '../../../utils/constants';
import useAllaCategory from '../../../hooks/UseAllaCategory';

const AllaAudioModal = ({
  isModalVisible,
  fetchAllaAudio,
  selectItem,
  handleCancel,
}) => {
  const [fileList, setFileList] = React.useState([]);
  const [form] = Form.useForm();
  const { allaCategoryData } = useAllaCategory();
  const [byId, setById] = React.useState(null);

  const getAudioById = async () => {
    if (selectItem) {
      try {
        const response = await fetch(API_PATH1 + '/audios/' + selectItem, {
          method: 'GET',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGxhIiwicm9sZSI6InN1cGVyYWRtaW4iLCJjcmVhdGVfYXQiOiIyMDI1LTA2LTE5VDA2OjU5OjE2LjI1M1oiLCJpYXQiOjE3NTAzMjU4MDJ9.uoXZt1Tg7ugIoAZo_4-7hHzD3cJT8zTYZvabZg8RCzU`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setById(data);
      } catch (error) {
        console.error('Error fetching audio:', error);
      }
    }
  };

  React.useEffect(() => {
    if (selectItem) {
      getAudioById();
    }
  }, [selectItem]);

  console.log('byId', byId);

  React.useEffect(() => {
    if (isModalVisible) {
      if (selectItem) {
        form.setFieldsValue({
          title_uz: byId?.title_uz || '',
          title_ru: byId?.title_ru || '',
          title_en: byId?.title_en || '',
          description_uz: byId?.description_uz || '',
          description_ru: byId?.description_ru || '',
          description_en: byId?.description_en || '',
          category_id: byId?.category?.id || '0',
          lyrics: byId?.lyrics || [
            { text_uz: '', text_ru: '', text_en: '', time: '' },
          ],
        });
      } else {
        form.setFieldsValue({
          lyrics: [{ text_uz: '', text_ru: '', text_en: '', time: '' }],
        });
      }
    }
  }, [isModalVisible, byId, form]);

  const handleSubmitTrial = async (values) => {
    const formData = new FormData();

    formData.append('title_uz', values.title_uz);
    formData.append('title_ru', values.title_ru);
    formData.append('title_en', values.title_en);
    formData.append('description_uz', values.description_uz || '');
    formData.append('description_ru', values.description_ru || '');
    formData.append('description_en', values.description_en || '');
    formData.append('category_id', Number(values.category_id) || '0');
    formData.append('lyrics', JSON.stringify(values.lyrics));
    formData.append('audio', values?.audio?.file ? values.audio.file : null);

    try {
      if (selectItem) {
        await fetch(API_PATH1 + '/audios/' + selectItem, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGxhIiwicm9sZSI6InN1cGVyYWRtaW4iLCJjcmVhdGVfYXQiOiIyMDI1LTA2LTE5VDA2OjU5OjE2LjI1M1oiLCJpYXQiOjE3NTAzMjU4MDJ9.uoXZt1Tg7ugIoAZo_4-7hHzD3cJT8zTYZvabZg8RCzU`,
          },

          body: formData,
        });
        message.success('Muvaffaqiyatli tahrirlandi');
      } else {
        await fetch(API_PATH1 + '/audios', {
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
      fetchAllaAudio();
    }
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length === 0) {
      form.setFieldsValue({ photo: null });
    }
  };

  const beforeUpload = (file) => {
    const isImageOrVideo = file.type.startsWith('audio/');
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
      width={1000}
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
              name="category_id"
              label="Category"
              rules={[{ required: true, message: 'Category required' }]}
            >
              <Select
                placeholder="Select Category"
                options={allaCategoryData.map((item) => ({
                  label: item.title_uz,
                  value: item.id,
                }))}
              ></Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description_uz"
          label="Description Uz"
          rules={[{ required: true, message: 'Description UZ required' }]}
        >
          <Input.TextArea placeholder="Description Uz" />
        </Form.Item>

        <Form.Item
          name="description_ru"
          label="Description Ru"
          rules={[{ required: true, message: 'Description RU required' }]}
        >
          <Input.TextArea placeholder="Description Ru" />
        </Form.Item>

        <Form.Item
          name="description_en"
          label="Description Eng"
          rules={[{ required: true, message: 'Description ENG required' }]}
        >
          <Input.TextArea placeholder="Description Eng" />
        </Form.Item>

        <Form.Item
          name="audio"
          label="Audio"
          rules={[
            {
              required: byId?.audio_url ? false : true,
              message: 'audio required',
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

        <Form.List name="lyrics">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'text_uz']}
                    rules={[{ required: true, message: 'Text is required' }]}
                  >
                    <Input placeholder="Matn (text) Uz" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'text_ru']}
                    rules={[{ required: true, message: 'Text is required' }]}
                  >
                    <Input placeholder="Matn (text) Ru" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'text_en']}
                    rules={[{ required: true, message: 'Text is required' }]}
                  >
                    <Input placeholder="Matn (text) En" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'time']}
                    rules={[{ required: true, message: 'Time is required' }]}
                  >
                    <Input placeholder="Vaqt (masalan: 00:30)" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Lyrics qo'shish
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AllaAudioModal;
