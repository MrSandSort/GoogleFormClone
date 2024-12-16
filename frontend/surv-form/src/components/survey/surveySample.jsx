import React, { useState } from "react";
import {
  Button,
  Input,
  Form,
  Select,
  message,
  List,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
  EditOutlined,
  BarsOutlined,
  AlignLeftOutlined,
  FileTextOutlined,
  CheckSquareOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import API from "../../utils/api";

const { Option } = Select;

const SurveySample = () => {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [surveyTitle, setSurveyTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      question_type: "",
      required: true,
      choices: [],
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", question_type: "", required: true, choices: [] },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSaveForm = async () => {
    const formData = {
      title: surveyTitle,
      background_color: backgroundColor,
      questions: questions.map((question) => ({
        question: question.question,
        question_type: question.question_type,
        required: question.required,
        choices: question.choices.map((choice) => ({ choice: choice })),
      })),
    };

    try {
      const response = await API.post("api/form/", formData);
      message.success("Form created successfully!");
      console.log(response.data);
    } catch (error) {
      message.error("Error creating form");
      console.error(error);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddChoice = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].choices.push("");
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (qIndex, cIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].choices[cIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleRemoveChoice = (qIndex, cIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].choices.splice(cIndex, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4" style={{ backgroundColor }}>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-green-600 flex items-center">
            <EditOutlined className="mr-2" /> Create Survey Form
          </h2>
          <Form.Item label="Background Color" style={{ marginBottom: 0 }}>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-10 h-10 cursor-pointer"
            />
          </Form.Item>
        </div>

        <Form layout="vertical">
          <Form.Item label="Survey Title">
            <Input
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
              placeholder="Enter survey title"
            />
          </Form.Item>

          {questions.map((question, qIndex) => (
            <div
              key={qIndex}
              className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <Form.Item className="w-full">
                  <Input
                    value={question.question}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, "question", e.target.value)
                    }
                    placeholder={`Question ${qIndex + 1}`}
                    prefix={<BarsOutlined />}
                  />
                </Form.Item>
                <Form.Item className="ml-2 w-36">
                  <Select
                    value={question.question_type}
                    onChange={(value) =>
                      handleQuestionChange(qIndex, "question_type", value)
                    }
                    placeholder="Type"
                    className="w-full"
                  >
                    <Option value="short_answer">
                      <AlignLeftOutlined /> Short Answer
                    </Option>
                    <Option value="long_answer">
                      <FileTextOutlined /> Long Answer
                    </Option>
                    <Option value="multiple_choices">
                      <AppstoreOutlined /> Multiple Choice
                    </Option>
                    <Option value="checkbox">
                      <CheckSquareOutlined /> Checkbox
                    </Option>
                  </Select>
                </Form.Item>
                <Button
                  onClick={() => handleRemoveQuestion(qIndex)}
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                />
              </div>
              {(question.question_type === "multiple_choices" ||
                question.question_type === "checkbox") && (
                <div>
                  <List
                    dataSource={question.choices}
                    renderItem={(choice, cIndex) => (
                      <List.Item
                        actions={[
                          <Button
                            type="text"
                            danger
                            onClick={() => handleRemoveChoice(qIndex, cIndex)}
                            icon={<DeleteOutlined />}
                          />,
                        ]}
                      >
                        <Input
                          placeholder={`Choice ${cIndex + 1}`}
                          value={choice}
                          onChange={(e) =>
                            handleChoiceChange(qIndex, cIndex, e.target.value)
                          }
                        />
                      </List.Item>
                    )}
                  />
                  <Button
                    onClick={() => handleAddChoice(qIndex)}
                    type="dashed"
                    icon={<PlusOutlined />}
                  >
                    Add Choice
                  </Button>
                </div>
              )}
            </div>
          ))}

          <Button
            onClick={handleAddQuestion}
            type="dashed"
            block
            icon={<PlusOutlined />}
          >
            Add Question
          </Button>

          <Button
            onClick={handleSaveForm}
            type="primary"
            block
            icon={<SaveOutlined />}
            className="mt-6 bg-green-500 hover:bg-green-600"
          >
            Save Form
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SurveySample;
