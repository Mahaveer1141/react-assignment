import React from "react";
import "./Login.css";
import { Input, Button, Form } from "antd";
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "../images/logo.jpeg";

const Login: React.FC = () => {
  const history = useHistory();
  const onFinish = (values: any) => {
    console.log("Success:", values);
    localStorage.setItem("username", values.username);
    history.push("/profile");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="main">
      <div className="inner-main">
        <img alt="logo" src={Logo} className="logo-image" />
        <h1>Login</h1>
        <Form
          layout="vertical"
          className="form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button className="login-button" type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
