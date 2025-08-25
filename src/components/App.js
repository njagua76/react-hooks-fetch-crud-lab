import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // ✅ GET /questions on load
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  // ✅ POST /questions → add a new one
  function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then((savedQuestion) => {
        setQuestions([...questions, savedQuestion]);
      });
  }

  // ✅ DELETE /questions/:id
  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updated = questions.filter((q) => q.id !== id);
      setQuestions(updated);
    });
  }

  // ✅ PATCH /questions/:id
  function handleUpdateQuestion(updatedQuestion) {
    fetch(`http://localhost:4000/questions/${updatedQuestion.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: updatedQuestion.correctIndex }),
    })
      .then((r) => r.json())
      .then((savedQuestion) => {
        const updated = questions.map((q) =>
          q.id === savedQuestion.id ? savedQuestion : q
        );
        setQuestions(updated);
      });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
