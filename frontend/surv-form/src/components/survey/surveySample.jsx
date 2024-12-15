import React, { useState, useEffect } from "react";
import { Input, Checkbox, Radio, Button, Spin, message } from "antd";
import API from "../../utils/api";

const FillForm = ({ match }) => {
  const { formCode } = match.params; 
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState({});

  useEffect(() => {
 
    const fetchForm = async () => {
      try {
        const response = await API.get(`/form/${formCode}/`);
        setForm(response.data.data);
      } catch (error) {
        message.error("Failed to fetch form data");
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [formCode]);

  const handleChange = (questionId, value) => {
    setResponses({ ...responses, [questionId]: value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        code: form.code,
        responder_email: "example@example.com", 
        responses: Object.entries(responses).map(([questionId, answer]) => ({
          answer,
          answer_to: questionId,
        })),
      };
      await API.post("/store-responses/", payload);
      message.success("Responses submitted successfully!");
    } catch (error) {
      message.error("Failed to submit responses");
    }
  };

  if (loading) return <Spin size="large" />;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">{form.title}</h1>
      {form.questions.map((question) => (
        <div key={question.id} className="mb-6">
          <label className="block mb-2 font-semibold">
            {question.required && "*"} {question.question}
          </label>
          {question.question_type === "text" && (
            <Input
              value={responses[question.id] || ""}
              onChange={(e) => handleChange(question.id, e.target.value)}
            />
          )}
          {question.question_type === "multiple choices" && (
            <Radio.Group
              value={responses[question.id] || null}
              onChange={(e) => handleChange(question.id, e.target.value)}
            >
              {question.choices.map((choice) => (
                <Radio key={choice.id} value={choice.choices}>
                  {choice.choices}
                </Radio>
              ))}
            </Radio.Group>
          )}
          {question.question_type === "checkbox" && (
            <Checkbox.Group
              value={responses[question.id] || []}
              onChange={(values) => handleChange(question.id, values)}
            >
              {question.choices.map((choice) => (
                <Checkbox key={choice.id} value={choice.choices}>
                  {choice.choices}
                </Checkbox>
              ))}
            </Checkbox.Group>
          )}
        </div>
      ))}
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default FillForm;
