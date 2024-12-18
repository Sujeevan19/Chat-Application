import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    const { email, password } = values;
    setLoading(true);

    if (!email || !password) {
      message.warning("Please fill all the fields");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      message.success("Login Successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      message.error(error.response?.data?.message || "Error occurred!");
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    form.setFieldsValue({ email: "guest@example.com", password: "123456" });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={submitHandler}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <Form.Item
        label="Email Address"
        name="email"
        rules={[
          { required: true, message: "Please enter your email address" },
          { type: "email", message: "Please enter a valid email address" },
        ]}
      >
        <Input placeholder="Enter Your Email Address" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password placeholder="Enter Your Password" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ width: "100%" }}
        >
          Login
        </Button>
      </Form.Item>

      <Form.Item>
        <Button
          type="default"
          onClick={handleGuestLogin}
          style={{ width: "100%" }}
        >
          Get Guest User Credentials
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
