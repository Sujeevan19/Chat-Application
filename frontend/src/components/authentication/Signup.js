import { Button, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async (values) => {
    const { name, email, password, confirmpassword } = values;
    setPicLoading(true);

    if (password !== confirmpassword) {
      message.warning("Passwords do not match");
      setPicLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );

      message.success("Registration Successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      message.error(error.response?.data?.message || "Error Occurred!");
      setPicLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.warning("You can only upload JPG/PNG file!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.warning("Image must be smaller than 2MB!");
        return false;
      }
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Chat-Application");
      fetch("https://api.cloudinary.com/v1_1/dyado8mfu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.secure_url);
          message.success("Image uploaded successfully");
        })
        .catch((err) => {
          console.error(err);
          message.error("Image upload failed");
        });
      return false;
    },
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={submitHandler}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input placeholder="Enter Your Name" />
      </Form.Item>

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
        <Input.Password placeholder="Enter Password" />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmpassword"
        rules={[{ required: true, message: "Please confirm your password" }]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>

      <Form.Item label="Upload Your Picture" valuePropName="fileList">
        <Upload {...uploadProps} maxCount={1}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={picLoading}
          style={{ width: "100%" }}
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;
