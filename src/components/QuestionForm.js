import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleAnswerChange(index, value) {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = value;
    setFormData({ ...formData, answers: updatedAnswers });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddQuestion(formData); // call parent App
    setFormData({ prompt: "", answers: ["", "", "", ""], correctIndex: 0 });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer Index:
          <input
            type="number"
            name="correctIndex"
            min="0"
            max="3"
            value={formData.correctIndex}
            onChange={handleChange}
          />
        </label>
        {formData.answers.map((ans, i) => (
          <label key={i}>
            Answer {i + 1}:
            <input
              type="text"
              value={ans}
              onChange={(e) => handleAnswerChange(i, e.target.value)}
            />
          </label>
        ))}
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
