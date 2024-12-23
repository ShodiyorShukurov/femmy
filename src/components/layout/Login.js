import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Api from "../../api";
import { API_TOKEN } from "../../utils/constants";


const LoginPage = () => {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await Api.post("/admin/login", {
        admin_email: values.admin_email.trim(),
        admin_password: values.admin_password.trim(),
      });

      if (res.data.status === 401 || res.data.status === 404) {
        notification.error({
          message: "Xato",
          description: "Kodni xato kiritdingiz!",
        });
      } else if (res.data.token) {
        localStorage.setItem(API_TOKEN, res.data.token);
        navigate("/users-list");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Xato",
        description: error.message,
      });
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      handleSubmit(values);
    } catch (error) {
      notification.error({ message: error.errors.join(", ") });
    }
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="admin_email"
            rules={[
              {
                required: true,
                message: "Required Email ",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="admin_password"
            rules={[
              {
                required: true,
                message: "Required Password",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            {loading ? "Login" : "Login in..."}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
