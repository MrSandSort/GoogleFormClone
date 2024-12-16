import React from "react";
import { Form, Input, Button, Select } from "antd";
import "tailwindcss/tailwind.css";
import Swal from "sweetalert2";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await API.post("/api/addUser/", {
        username: values.username,
        employee_id: values.employee_id,
        email: values.email,
        role: values.role,
        password: values.password,
      });

      console.log("Registration successful:", response.data);

      Swal.fire({
        title: "Success!",
        text: "User registered successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);

      Swal.fire({
        title: "Error!",
        text: "Registration failed. Please check your inputs and try again.",
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
      <div className="flex-grow flex justify-center items-center mt-20 px-4">
        <div
          className="bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl"
          style={{ minHeight: "300px" }}
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
            Employee Registration
          </h2>
          <Form
            name="register"
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
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select your role!" }]}
            >
              <Select placeholder="Select your role">
                <Option value="admin">Admin</Option>
                <Option value="staff">Staff</Option>
                <Option value="supervisor">Supervisor</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white border-none focus:bg-green-700 active:bg-green-800"
                style={{ transition: "background-color 0.3s ease" }}
                onClick={(e) => (e.target.style.backgroundColor = "#0E711FFF")}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
