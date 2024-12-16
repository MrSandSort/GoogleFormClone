import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Drawer, Modal } from "antd";
import muktinath from "../../assets/logo-muktinath.svg";
import {
  HomeOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  UserAddOutlined,
  MenuOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    setIsModalVisible(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/login");
    setIsModalVisible(false);
  };

  const cancelLogout = () => {
    setIsModalVisible(false);
  };

  const navigateToHome=()=>{
    navigate("/");
  }

  const menuItems = [];

  if (!isLoggedIn) {
    menuItems.push(
      { key: "login", label: "Login", icon: <UserOutlined />, to: "/login" },
      { key: "addUser", label: "AddUser", icon: <UserAddOutlined />, to: "/addUser" }
    );
  } else {
    menuItems.push(
      { key: "dashboard", label: "Dashboard", icon: <HomeOutlined />, to: "/dashboard" },
      { key: "survey", label: "Survey", icon: <FileTextOutlined />, to: "/survey" },
      { key: "questions", label: "Questions", icon: <QuestionCircleOutlined />, to: "/questions" },
      { key: "logout", label: "Logout", icon: <LogoutOutlined />, to: "#", onClick: handleLogout }
    );
  }

  return (
    <nav
      className="fixed w-full shadow-lg z-50"
      style={{
        background: "linear-gradient(90deg, #D0B690FF 0%, #66BB6A 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div>
          <img src={muktinath} alt="Survey App Logo" className="h-10 w-auto" onClick={navigateToHome} />
        </div>

        <div className="hidden md:flex space-x-6">
          {menuItems.map(({ key, label, icon, to, onClick }) => (
            <Link
              key={key}
              to={to}
              onClick={onClick}
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
          {menuItems.map(({ key, label, icon, to, onClick }) => (
            <Link
              key={key}
              to={to}
              onClick={onClick}
              className="flex items-center text-black hover:text-gray-700 space-x-2"
            >
              <span>{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </Drawer>

      <Modal
        title="Confirm Logout"
        visible={isModalVisible}
        onOk={confirmLogout}
        onCancel={cancelLogout}
        okText="Logout"
        cancelText="Cancel"
        zIndex={9999}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </nav>
  );
};

export default Navbar;
