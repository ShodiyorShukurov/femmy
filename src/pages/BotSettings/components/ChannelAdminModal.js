import React from "react";
import { Button, Form,  message, Modal } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
     setEditChannelData(true);

    const data = {
      id: Number(selectChannelItem.id),
      username: values.username,
    };

    try {
      await Api.put("/channel-admin/edit", data);
      message.success("Username edit successfully!");
      handleChannelCancel();
      setSelectChannelItem({});
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Failed to edit username.");
    } finally{
      setEditChannelData(false);
    }
  };


  return (
    <Modal
      title="Edit Text"
      open={isModalChannelVisible}
      onCancel={handleChannelCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleEditPrice}>
        <Form.Item
          name="username"
          label="Text"
          rules={[{ required: true, message: "Please Text!" }]}
        >
          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: ["bold", "italic", "link", "undo", "redo"],
              image: {
                upload: false,
              },
            }}
            data={selectChannelItem.username || ""}
            onChange={(event, editor) => {
              const data = editor.getData();
              form.setFieldsValue({ username: data });
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Edit Text
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChannelAdminModal;
