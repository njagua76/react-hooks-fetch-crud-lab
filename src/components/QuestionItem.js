import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    onDeleteQuestion(id);
  }

  function handleCorrectAnswerChange(e) {
    const newIndex = parseInt(e.target.value, 10);
    onUpdateQuestion({ ...question, correctIndex: newIndex });
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <ul>
        {answers.map((ans, i) => (
          <li key={i} style={{ fontWeight: i === correctIndex ? "bold" : "normal" }}>
            {ans}
          </li>
        ))}
      </ul>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectAnswerChange}>
          {answers.map((_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default QuestionItem;
