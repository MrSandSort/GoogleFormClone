import { jsPDF } from "jspdf";


export const generateSurveyPDF = (title, maxResponses, questions) => {
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
