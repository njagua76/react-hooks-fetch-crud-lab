import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // ✅ fetch questions when component mounts
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  // ✅ delete question from state
  function handleDeleteQuestion(id) {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
  }

  // ✅ update question in state
  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDeleteQuestion={handleDeleteQuestion}
            onUpdateQuestion={handleUpdateQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
