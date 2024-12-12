import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer } from "antd";
import muktinath from "../../assets/logo-muktinath.svg";
import {
  HomeOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  UserAddOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <HomeOutlined />, to: "/" },
    {
      key: "survey",
      label: "Survey",
      icon: <FileTextOutlined />,
      to: "/survey",
    },
    {
      key: "questions",
      label: "Questions",
      icon: <QuestionCircleOutlined />,
      to: "/questions",
    },
    { key: "login", label: "Login", icon: <UserOutlined />, to: "/login" },
    {
      key: "register",
      label: "Register",
      icon: <UserAddOutlined />,
      to: "/register",
    },
  ];

  return (
    <nav
      className="fixed w-full shadow-lg z-50"
      style={{
        background: "linear-gradient(90deg, #D0B690FF 0%, #66BB6A 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div>
          <img src={muktinath} alt="Survey App Logo" className="h-10 w-auto" />
        </div>

        <div className="hidden md:flex space-x-6">
          {menuItems.map(({ key, label, icon, to }) => (
            <Link
              key={key}
              to={to}
              className="flex items-center text-white hover:text-gray-200 space-x-2"
            >
              <span>{icon}</span>
              <span className="text-xs font-medium">{label}</span>

            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <MenuOutlined className="text-xl" />
          </button>
        </div>
      </div>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        bodyStyle={{
          background: "rgba(255, 255, 255, 0.9)",
          color: "black",
          padding: "16px",
        }}
        headerStyle={{
          background: "rgba(255, 255, 255, 0.9)",
          color: "black",
        }}
      >
        <div className="space-y-4">
          {menuItems.map(({ key, label, icon, to }) => (
            <Link
              key={key}
              to={to}
              className="flex items-center text-black hover:text-gray-700 space-x-2"
            >
              <span>{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
