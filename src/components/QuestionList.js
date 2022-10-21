import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questionArray, handleDelete}) {

  const displayQuestions = questionArray.map((question) => {
    const { id, prompt, answers, correctIndex } = question
    return <QuestionItem key={prompt} id={id} prompt={prompt} answers={answers} correctIndex={correctIndex} handleDelete={handleDelete}/>
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {displayQuestions}
      </ul>
    </section>
  );
}

export default QuestionList;
