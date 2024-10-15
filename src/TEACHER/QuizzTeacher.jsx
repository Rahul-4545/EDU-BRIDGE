import React, { useState } from 'react';

const QuizzTeacher = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '', options: ['', ''] }]); // Initial question with two options
  const created_by = 1; // Example user ID (should be dynamically assigned)

  // Handle adding a new question
  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', ''] }]);
  };

  // Handle adding an option to a specific question
  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  // Handle removing a question
  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Handle text change for questions and options
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Handle quiz creation
  const createQuiz = async () => {
    try {
      const response = await fetch('http://localhost:3001/create-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, questions, created_by }),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Quiz created successfully!');
      } else {
        console.error('Error:', data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div>
      <h2>Create Quiz</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quiz Title"
      />
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <input
            type="text"
            value={question.text}
            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
            placeholder={`Question ${questionIndex + 1}`}
          />
          {question.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
              placeholder={`Option ${optionIndex + 1}`}
            />
          ))}
          <button onClick={() => addOption(questionIndex)}>Add Option</button>
          <button onClick={() => removeQuestion(questionIndex)}>Remove Question</button>
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={createQuiz}>Create Quiz</button>
    </div>
  );
};

export default QuizzTeacher;
