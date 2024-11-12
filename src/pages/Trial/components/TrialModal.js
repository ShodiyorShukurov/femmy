import { Button, Form, Input, InputNumber, message, Modal } from "antd";
import Api from "../../../api";
import React from "react";
import { data as changeData } from "../../../mock/data";
import { useMain } from "../../../hooks/UseMain";

const TrailModal = ({
  fetchTrailData,
  isModalVisible,
  selectItem,
  handleCancel,
}) => {
  const { changeValue } = useMain();
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isModalVisible && selectItem) {
      form.setFieldsValue({
        source: selectItem.source || "",
        day: selectItem.day || "",
      });
    }
  }, [isModalVisible, selectItem, form]);

  const handleSubmitTrial = async (values) => {
    let data = {
      source: values.source,
      day: values.day,
    };

    try {
      if (selectItem && selectItem.id) {
        data.id = Number(selectItem.id);
        const res = await Api.put("/trial/edit", data);
        if (res.data) {
          message.success(
            changeData[changeValue].trial_list.message_edit_success
          );
        }
      } else {
        const res = await Api.post("/trial/add", data);
        if (res.data) {
          message.success(changeData[changeValue].trial_list.message_success);
        }
      }

      form.resetFields();
    } catch (error) {
      console.error(error);
      if (error.message === "Request failed with status code 500") {
        message.error(changeData[changeValue].trial_list.uniq_data);
      } else if (error) {
        message.error(changeData[changeValue].trial_list.message_error);
      }
    } finally {
      fetchTrailData();
      handleCancel();
    }
  };

  return (
    <Modal
      title={
        selectItem?.id
          ? changeData[changeValue].trial_list.edit_text
          : changeData[changeValue].trial_list.add_text
      }
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmitTrial}>
        <Form.Item
          name="source"
          label={changeData[changeValue].trial_list.label_1}
          rules={[
            {
              required: true,
              message: changeData[changeValue].trial_list.requred_1,
            },
          ]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="day"
          label={changeData[changeValue].trial_list.label_2}
          rules={[
            {
              required: true,
              message: changeData[changeValue].trial_list.requred_2,
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} min={1} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {changeData[changeValue].trial_list.button_text}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TrailModal;
