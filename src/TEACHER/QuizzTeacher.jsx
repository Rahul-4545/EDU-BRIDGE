import React, { useState } from 'react';
import './QuizzTeacher.css'; // Ensure this file exists for styling

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''] }]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''] }]);
  };

  const handleSubmit = async () => {
    const quizData = { quizTitle, questions };
    try {
      const response = await fetch('http://localhost:3001/create-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData),
      });
      if (response.ok) {
        const data = await response.json();
        alert('Quiz created successfully!');
        // Optionally reset form
        setQuizTitle('');
        setQuestions([{ question: '', options: ['', '', '', ''] }]);
      } else {
        console.error('Failed to create quiz', response.statusText);
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className="create-quiz-container">
      <h2>Create Quiz</h2>
      <input
        type="text"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        placeholder="Quiz Title"
        className="quiz-title-input"
      />
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="quiz-question-input">
          <input
            type="text"
            value={q.question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            placeholder={`Question ${qIndex + 1}`}
          />
          {q.options.map((option, oIndex) => (
            <input
              key={oIndex}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
              placeholder={`Option ${oIndex + 1}`}
            />
          ))}
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default CreateQuiz;
