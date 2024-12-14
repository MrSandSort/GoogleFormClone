import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";
import { Input, Table, Spin, Card } from "antd";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const { Search } = Input;

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/addUser/");
      setUsers(response.data);
      setFilteredUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getUserCounts = () => {
    const counts = {
      Admin: 0,
      Supervisor: 0,
      Staff: 0,
    };

    users.forEach((user) => {
      if (user.role === "admin") counts.Admin += 1;
      else if (user.role === "supervisor") counts.Supervisor += 1;
      else if (user.role === "staff") counts.Staff += 1;
    });

    return [
      { name: "Admin", value: counts.Admin },
      { name: "Supervisor", value: counts.Supervisor },
      { name: "Staff", value: counts.Staff },
    ];
  };

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    setFilteredUsers(
      users.filter(
        (user) =>
          user.username.toLowerCase().includes(lowerCaseQuery) ||
          user.role.toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [searchQuery, users]);

  const pieData = getUserCounts();

  const data = {
    labels: pieData.map((item) => item.name),
    datasets: [
      {
        label: "User Role Distribution",
        data: pieData.map((item) => item.value),
        backgroundColor: ["#0088FE", "#00C49F", "#FFBB28"],
        hoverBackgroundColor: ["#0056b3", "#007d66", "#c7a700"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} users`,
        },
      },
    },
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employee_id",
      key: "employee_id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => <span style={{ textTransform: "capitalize" }}>{text}</span>,
    }
  ];

  const totalUserCount = users.length;

  return (
    <div className="bg-gray-100 min-h-screen pt-16 px-4">
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <div
              className="w-full"
              style={{
                maxWidth: "400px",
                aspectRatio: "1",
              }}
            >
              <Pie data={data} options={options} />
            </div>
          </div>

          <div className="mt-4 max-w-4xl mx-auto">
            <Card
              style={{
                backgroundColor: "#d4f8e5", 
                textAlign: "center",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3>Total Users</h3>
              <p style={{ fontSize: "36px", fontWeight: "bold", color: "#2e8b57" }}>
                {totalUserCount}
              </p>
            </Card>
          </div>
          
          <div className="mt-8 max-w-4xl mx-auto">
            <Search
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              enterButton
              className="w-full"
            />
          </div>

          <div className="mt-6 max-w-4xl mx-auto">
            <Table
              columns={columns}
              dataSource={filteredUsers}
              rowKey={(record) => record.employee_id}
              pagination={{ pageSize: 5 }}
              bordered
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
