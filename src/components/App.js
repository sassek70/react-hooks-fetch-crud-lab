import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionArray, setQuestionArray] = useState([])
  
  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
    .then(res => res.json())
    .then((questions) => setQuestionArray(questions))
  },[])



  // const onSubmit = (newQuestion) => {
  //   setQuestionArray((questionArray) => ([...questionArray, newQuestion]))
  //   persistSubmit(newQuestion)
  // }



  const onSubmit = (newQuestion) => {
    
    fetch(`http://localhost:4000/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        prompt: newQuestion.prompt,
        answers: [
          newQuestion.answer1,
          newQuestion.answer2,
          newQuestion.answer3,
          newQuestion.answer4,
        ],
      correctIndex: parseInt(newQuestion.correctIndex)})
      })
      .then(res => res.json())
      .then(setQuestionArray((questionArray) => ([...questionArray, newQuestion])))

  }

  const handleDelete = (id) => {
    
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const afterDelete = questionArray.filter((question) => question.id !== id)
        setQuestionArray(afterDelete)
  })
  }


  const handleUpdate = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questionArray.map((question) => {
          if (question.id === updatedQuestion.id) return updatedQuestion;
          return question;
        });
        setQuestionArray(updatedQuestions);
      });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onSubmit={onSubmit}/> : <QuestionList questionArray={questionArray} handleDelete={handleDelete} handleUpdate={handleUpdate}/>}
    </main>
  );
}

export default App;
