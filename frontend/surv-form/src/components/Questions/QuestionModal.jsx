import React, { useState, useEffect } from "react";
import { Layout, Card, Statistic, Spin, Table, Modal, Button, Row, Col } from "antd";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import API from "../../utils/api";

const { Header, Content } = Layout;

const QuestionModal = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await API.get("api/questions/");
      const data = response.data.data;
      setQuestions(data);

      const questionTypeStats = data.reduce((acc, item) => {
        acc[item.question_type] = (acc[item.question_type] || 0) + 1;
        return acc;
      }, {});

      setChartData(
        Object.entries(questionTypeStats).map(([key, value]) => ({
          name: key,
          value,
        }))
      );

      setStats(
        Object.entries(questionTypeStats).map(([key, value]) => ({
          title: key,
          value,
        }))
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const questionModal = {
    show: (question) => {
      setSelectedQuestion(question);
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
      setSelectedQuestion(null);
    },
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Type",
      dataIndex: "question_type",
      key: "question_type",
      render: (text) => <span style={{ textTransform: "capitalize" }}>{text}</span>,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => questionModal.show(record)}
          style={{
            backgroundColor: "green",
            borderColor: "green",
            fontSize: "14px",
            padding: "6px 12px",
          }}
        >
          View Details
        </Button>
      ),
    },
  ];

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6058", "#7E57C2"];

  return (
    <Layout style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <Header style={{ background: "#fff", padding: "16px", textAlign: "center" }} />
      <Content
        style={{
          margin: "24px",
          padding: "24px",
          background: "#f0f2f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Spin size="large" />
          </div>
        ) : (
          <div style={{ width: "100%", maxWidth: "1200px", padding: "20px" }}>
            <Row gutter={16}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Card bordered>
                  <Statistic title="Total Questions" value={questions.length} />
                </Card>
              </Col>
              {stats.map((stat, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card bordered>
                    <Statistic title={stat.title} value={stat.value} />
                  </Card>
                </Col>
              ))}
            </Row>

            <Row justify="center" style={{ marginTop: "24px" }}>
              <Col xs={24} sm={24} md={12} lg={8}>
                <h3 style={{ textAlign: "center" }}>Question Types Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={120}
                      fill="#8884d8"
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Col>
            </Row>

            <div style={{ overflowX: "auto", width: "100%" }}>
              <Table
                columns={columns.filter(
                  (col) =>
                    col.key === "question" || col.key === "action"
                )}
                dataSource={questions}
                rowKey={(record) => record.id}
                pagination={{ pageSize: 5 }}
                bordered
                style={{ marginTop: "24px" }}
                scroll={{ x: true }}
              />
            </div>

            <Modal
              title="Question Details"
              visible={visible}
              onCancel={questionModal.hide}
              footer={null}
              width={800}
            >
              {selectedQuestion && (
                <div>
                  <Card style={{ marginBottom: "16px" }}>
                    <h3>Question:</h3>
                    <p>{selectedQuestion.question}</p>
                  </Card>
                  <Card style={{ marginBottom: "16px" }}>
                    <h3>Type:</h3>
                    <p>{selectedQuestion.question_type}</p>
                  </Card>
                  <Card>
                    <h3>Created At:</h3>
                    <p>{new Date(selectedQuestion.created_at).toLocaleDateString()}</p>
                  </Card>
                </div>
              )}
            </Modal>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default QuestionModal;
