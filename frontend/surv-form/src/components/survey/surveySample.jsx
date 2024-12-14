import React, { useState } from "react";
import { Input, Button, Select, Form, Space, message } from "antd";
import { FaTrash } from "react-icons/fa";
import { jsPDF } from "jspdf";  // Import jsPDF
import "antd/dist/reset.css"; // Ant Design CSS reset

const { Option } = Select;

const SurveyForm = () => {
  const [title, setTitle] = useState("");
  const [maxResponses, setMaxResponses] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", type: "text", options: [] },
  ]);


  const addQuestion = () => {
    setQuestions([...questions, { question: "", type: "text", options: [] }]);
  };


  const handleQuestionChange = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };


  const handleQuestionTypeChange = (value, index) => {
    const newQuestions = [...questions];
    newQuestions[index].type = value;
    setQuestions(newQuestions);
  };

 
  const handleOptionChange = (e, index, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionIndex] = e.target.value;
    setQuestions(newQuestions);
  };


  const addOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push("");
    setQuestions(newQuestions);
  };


  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !maxResponses) {
      message.error("Please fill out all required fields.");
      return;
    }
    console.log("Survey Title:", title);
    console.log("Max Responses:", maxResponses);
    console.log("Questions:", questions);


    generatePDF();
    message.success("Survey submitted successfully!");
  };


  const generatePDF = () => {
    const doc = new jsPDF();
    
  
    doc.setFontSize(16);
    doc.text(`Survey Title: ${title}`, 20, 20);
    doc.text(`Max Responses: ${maxResponses}`, 20, 30);

    let yPosition = 40; 

    
    questions.forEach((question, index) => {
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${question.question}`, 20, yPosition);
      yPosition += 10;

      if (question.type === "multiple" && question.options.length > 0) {
        doc.text("Options:", 20, yPosition);
        yPosition += 10;
        question.options.forEach((option, optionIndex) => {
          doc.text(`- ${option}`, 30, yPosition);
          yPosition += 8;
        });
      }

      yPosition += 10;
    });

    
    doc.save("survey.pdf");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
        Create Survey
      </h1>

      <Form onSubmitCapture={handleSubmit} layout="vertical">
     
        <Form.Item label="Survey Title" required>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter survey title"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#4CAF50", 
              color: "#4CAF50",
            }}
          />
        </Form.Item>

       
        <Form.Item label="Max Responses" required>
          <Input
            type="number"
            value={maxResponses}
            onChange={(e) => setMaxResponses(e.target.value)}
            placeholder="Set maximum number of responses"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#4CAF50", 
              color: "#4CAF50", 
            }}
          />
        </Form.Item>

        
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Form.Item label={`Question #${index + 1}`} required>
                <Input
                  value={question.question}
                  onChange={(e) => handleQuestionChange(e, index)}
                  placeholder="Enter your question here"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#4CAF50", 
                    color: "#4CAF50", 
                  }}
                />
              </Form.Item>

              <Form.Item label="Question Type" required>
                <Select
                  value={question.type}
                  onChange={(value) => handleQuestionTypeChange(value, index)}
                  style={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    borderColor: "#4CAF50", 
                  }}
                >
                  <Option value="text">Text</Option>
                  <Option value="multiple">Multiple Choice</Option>
                  <Option value="rating">Rating</Option>
                </Select>
              </Form.Item>

             
              {question.type === "multiple" && (
                <>
                  <Form.Item label="Options" required>
                    {question.options.map((option, optionIndex) => (
                      <Input
                        key={optionIndex}
                        value={option}
                        onChange={(e) => handleOptionChange(e, index, optionIndex)}
                        placeholder={`Option #${optionIndex + 1}`}
                        style={{
                          marginBottom: "10px",
                          backgroundColor: "#ffffff",
                          borderColor: "#4CAF50", 
                        }}
                      />
                    ))}
                    <Button
                      type="dashed"
                      onClick={() => addOption(index)}
                      style={{
                        width: "100%",
                        marginBottom: "1rem",
                        borderColor: "#4CAF50",
                        color: "#4CAF50",
                      }}
                    >
                      Add Option
                    </Button>
                  </Form.Item>
                </>
              )}

              <Button
                type="danger"
                icon={<FaTrash />}
                onClick={() => removeQuestion(index)}
                style={{
                  backgroundColor: "#f44336", 
                  borderColor: "#f44336",
                  color: "#fff",
                }}
              >
                Remove Question
              </Button>
            </Space>
          </div>
        ))}

        
        <Button
          type="dashed"
          onClick={addQuestion}
          style={{
            width: "100%",
            marginBottom: "1rem",
            borderColor: "#4CAF50", 
            color: "#4CAF50",
          }}
        >
          Add Question
        </Button>

      
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "100%",
            backgroundColor: "#4CAF50", 
            borderColor: "#4CAF50", 
          }}
          onClick={handleSubmit}
        >
          Submit Survey
        </Button>
      </Form>
    </div>
  );
};

export default SurveyForm;
