import React from "react";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { API_PATH1 } from "../../../utils/constants";
import useAllaCategory from "../../../hooks/UseAllaCategory";

const AllaAudioModal = ({
  isModalVisible,
  fetchAllaAudio,
  selectItem,
  handleCancel,
}) => {
  const [fileList, setFileList] = React.useState([]);
  const [fileListPhoto, setFileListPhoto] = React.useState([]);
  const [form] = Form.useForm();
  const { allaCategoryData } = useAllaCategory();
  const [byId, setById] = React.useState(null);

  const getAudioById = async () => {
    if (selectItem) {
      try {
        const response = await fetch(API_PATH1 + "/audios/" + selectItem, {
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGxhIiwicm9sZSI6InN1cGVyYWRtaW4iLCJjcmVhdGVfYXQiOiIyMDI1LTA2LTE5VDA2OjU5OjE2LjI1M1oiLCJpYXQiOjE3NTAzMjU4MDJ9.uoXZt1Tg7ugIoAZo_4-7hHzD3cJT8zTYZvabZg8RCzU`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setById(data);
      } catch (error) {
        console.error("Error fetching audio:", error);
      }
    }
  };

  React.useEffect(() => {
    if (selectItem) {
      getAudioById();
    }
  }, [selectItem]);

  const parseLrc = (lrcText) => {
    return lrcText
      .split("\n")
      .map((line) => {
        const match = line.match(/\[(\d{2}:\d{2}(?:\.\d{1,2})?)\](.*)/);
        return match
          ? {
              time: match[1].trim(),
              text_uz: match[2].trim(),
              text_ru: match[2].trim(),
              text_en: match[2].trim(),
            }
          : null;
      })
      .filter(Boolean);
  };

  React.useEffect(() => {
  if (isModalVisible) {
    if (selectItem && byId) {
      form.setFieldsValue({
        title_uz: byId?.title_uz || "",
        title_ru: byId?.title_ru || "",
        title_en: byId?.title_en || "",
        description_uz: byId?.description_uz || "",
        description_ru: byId?.description_ru || "",
        description_en: byId?.description_en || "",
        arabic_title: byId?.arabic_title || "",
        category_id: byId?.category?.id || "0",
        lyrics: byId?.lyrics
          ? byId.lyrics.map((line) => `[${line.time}]${line.text_uz}`).join("\n")
          : "",
        author_uz: byId?.author_uz || "",
        author_ru: byId?.author_ru || "",
        author_en: byId?.author_en || "",
        sort_order: byId?.sort_order || "",
        is_free: byId?.is_free || false,
      });
    } else {
      form.setFieldsValue({
        lyrics: "",
      });
    }
  }
}, [isModalVisible, byId, form, selectItem]);


  const handleSubmitTrial = async (values) => {
    let parsedLyrics = values.lyrics;
    if (typeof values.lyrics === "string") {
      parsedLyrics = parseLrc(values.lyrics);
    }

    const formData = new FormData();

    formData.append("title_uz", values.title_uz);
    formData.append("title_ru", values.title_ru);
    formData.append("title_en", values.title_en);
    formData.append("description_uz", values.description_uz || "");
    formData.append("description_ru", values.description_ru || "");
    formData.append("description_en", values.description_en || "");
    formData.append("category_id", Number(values.category_id) || "0");
    formData.append("lyrics", JSON.stringify(parsedLyrics));
    formData.append("audio", values?.audio?.file ? values.audio.file : null);
    formData.append("arabic_title", values.arabic_title || "");
    formData.append("image", values?.photo?.file ? values.photo.file : null);
    formData.append("author_uz", values.author_uz || "");
    formData.append("author_ru", values.author_ru || "");
    formData.append("author_en", values.author_en || "");
    formData.append("sort_order", values.sort_order || "");
    formData.append("is_free", values.is_free ? "true" : "false");



    try {
      if (selectItem) {
        await fetch(API_PATH1 + "/audios/" + selectItem, {
          method: "PUT",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGxhIiwicm9sZSI6InN1cGVyYWRtaW4iLCJjcmVhdGVfYXQiOiIyMDI1LTA2LTE5VDA2OjU5OjE2LjI1M1oiLCJpYXQiOjE3NTAzMjU4MDJ9.uoXZt1Tg7ugIoAZo_4-7hHzD3cJT8zTYZvabZg8RCzU`,
          },

          body: formData,
        });
        message.success("Muvaffaqiyatli tahrirlandi");
      } else {
        await fetch(API_PATH1 + "/audios", {
          method: "POST",
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
      message.error("Xatolik");
    } finally {
      fetchAllaAudio();
      setFileList([]);
      setFileListPhoto([]);
    }
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length === 0) {
      form.setFieldsValue({ audio: null });
    }
  };

  const beforeUpload = (file) => {
    const isImageOrVideo = file.type.startsWith("audio/");
    if (!isImageOrVideo) {
      message.error("");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleUploadChangePhoto = ({ fileList: newFileList }) => {
    setFileListPhoto(newFileList);
    if (newFileList.length === 0) {
      form.setFieldsValue({ photo: null });
    }
  };

  const beforeUploadPhoto = (file) => {
    const isImageOrVideo = file.type.startsWith("image/");
    if (!isImageOrVideo) {
      message.error("");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  return (
    <Modal
      title={selectItem?.id ? "Tahrirlash" : "Qo'shish"}
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
              rules={[{ required: true, message: "Title UZ required" }]}
            >
              <Input placeholder="Title Uz" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="title_ru"
              label="Title ru"
              rules={[{ required: true, message: "Title RU required" }]}
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
              rules={[{ required: true, message: "Title ENG required" }]}
            >
              <Input placeholder="Title Eng" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="category_id"
              label="Category"
              rules={[{ required: true, message: "Category required" }]}
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

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="author_uz"
              label="Author Uz"
              rules={[{ required: true, message: "Author Uz required" }]}
            >
              <Input placeholder="Author Uz" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="author_ru"
              label="Author Ru"
              rules={[{ required: true, message: "Author Ru required" }]}
            >
              <Input placeholder="Author Ru" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="author_en"
              label="Author Eng"
              rules={[{ required: true, message: "Author Eng required" }]}
            >
              <Input placeholder="Author Eng" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[{ required: true, message: "Sort Order required" }]}
              name="sort_order"
              label="Sort Order"
            >
              <Input placeholder="Sort Order" type="number" min={1} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="is_free" label="Is Free" valuePropName="checked">
              <Select
                placeholder="Select Free Status"
                options={[
                  { label: "True", value: true },
                  { label: "False", value: false },
                ]}
                style={{ width: "100%" }}
                defaultValue={selectItem?.is_free ? true : false}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="arabic_title" label="Arabic Title">
              <Input placeholder="Arabic title" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="description_uz" label="Description Uz">
          <Input.TextArea placeholder="Description Uz" />
        </Form.Item>

        <Form.Item name="description_ru" label="Description Ru">
          <Input.TextArea placeholder="Description Ru" />
        </Form.Item>

        <Form.Item name="description_en" label="Description Eng">
          <Input.TextArea placeholder="Description Eng" />
        </Form.Item>

        <Form.Item
          name="audio"
          label="Audio"
          rules={[
            {
              required: byId?.audio_url ? false : true,
              message: "audio required",
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

        <Form.Item name="photo" label="Photo">
          <Upload
            fileList={fileListPhoto}
            beforeUpload={beforeUploadPhoto}
            onChange={handleUploadChangePhoto}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Photo yuklash</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="lyrics" label="LRC Lyrics Input">
          <Input.TextArea rows={8} placeholder="[00:00.65]Matn..." />
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

export default AllaAudioModal;
