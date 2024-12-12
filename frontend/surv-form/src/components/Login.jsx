import React from "react";
import { Form, Input, Button } from "antd";
import "tailwindcss/tailwind.css";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-green-50">
      <nav className="w-full bg-green-600 text-white p-4 text-center font-bold">
        Navbar Component
      </nav>
      <div className="flex-grow flex justify-center items-center mt-8 px-4">
        <div
          className="bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl"
          style={{ minHeight: "200px" }}
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
            Employee Login
          </h2>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="Employee ID"
              name="employee_id"
              rules={[
                { required: true, message: "Please input your Employee ID!" },
              ]}
            >
              <Input placeholder="Enter your Employee ID" />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input placeholder="Enter your Name" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password placeholder="Enter your Password" />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white border-none focus:bg-green-700 active:bg-green-800"
                style={{ transition: "background-color 0.3s ease" }}
                onClick={(e) => (e.target.style.backgroundColor = "#0E711FFF")}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
