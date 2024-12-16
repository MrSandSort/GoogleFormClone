import React from "react";
import { Form, Input, Button } from "antd";
import "tailwindcss/tailwind.css";
import Swal from "sweetalert2";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate= useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await API.post("api/login/", {
        username: values.username,
        employee_id: values.employee_id,
        password: values.password,
      });

      console.log("Login successful:", response.data);
      const token= response.data.access
      console.log(token)
      if(token){
        localStorage.setItem('authToken', token)
      }

      Swal.fire({
        title: "Success!",
        text: "Login successful!",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate('/dashboard')

  

    } catch (error) {
      console.error("Login failed:", error);

      Swal.fire({
        title: "Error!",
        text: "Login failed. Please check your credentials and try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-green-50">
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
              rules={[{ required: true, message: "Please input your Employee ID!" }]}
            >
              <Input placeholder="Enter your Employee ID" />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Enter your username" }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your Password!" }]}
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
