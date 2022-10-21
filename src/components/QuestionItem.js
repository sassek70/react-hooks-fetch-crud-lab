import React from "react";

function QuestionItem({ id, prompt, answers, correctIndex, handleDelete}) {
  // console.log(answers)

  const options = answers.map((answers, index) => (
    <option key={index} value={index}>
      {answers}
    </option>
  ));


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={() => handleDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
