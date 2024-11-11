import React from "react";
import { Button, Form,  message, Modal } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Api from "../../../api";
import { data } from "../../../mock/data";
import { useMain } from "../../../hooks/UseMain";

const ChannelAdminModal = ({
  setEditChannelData,
  isModalChannelVisible,
  handleChannelCancel,
  selectChannelItem,
  setSelectChannelItem,
}) => {
  
  const { changeValue } = useMain();
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
      message.success(data[changeValue].bot_settings.message_success);
      handleChannelCancel();
      setSelectChannelItem({});
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error(data[changeValue].bot_settings.message_error);
    } finally{
      setEditChannelData(false);
    }
  };


  return (
    <Modal
      title={data[changeValue].bot_settings.edit_text}
      open={isModalChannelVisible}
      onCancel={handleChannelCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleEditPrice}>
        <Form.Item
          name="username"
          label={data[changeValue].bot_settings.label_admin}
          rules={[
            {
              required: true,
              message: data[changeValue].bot_settings.requred_admin,
            },
          ]}
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
            {data[changeValue].bot_settings.admin_button}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChannelAdminModal;
