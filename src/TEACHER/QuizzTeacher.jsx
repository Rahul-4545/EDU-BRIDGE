import React, { useState, useEffect } from 'react';
import './QuizzTeacher.css';

const QuizzTeacher = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '', options: ['', ''] }]);
  const [quizzes, setQuizzes] = useState([]);
  const created_by = 1; // Example user ID (should be dynamically assigned)

  // Fetch quizzes from the backend
  const fetchQuizzes = async () => {
    try {
      const response = await fetch('http://localhost:3001/quizzes');
      const data = await response.json();
      setQuizzes(data.quizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  useEffect(() => {
    fetchQuizzes(); // Fetch quizzes when the component mounts
  }, []);

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', ''] }]);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/create-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, questions, created_by }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setTitle('');
        setQuestions([{ text: '', options: ['', ''] }]);
        fetchQuizzes(); // Re-fetch quizzes after creating a new one
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  const handleDeleteQuiz = async (quizTitle) => {
    if (window.confirm(`Are you sure you want to delete the quiz: "${quizTitle}"?`)) {
      try {
        const response = await fetch(`http://localhost:3001/delete-quiz/${encodeURIComponent(quizTitle)}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          fetchQuizzes(); // Re-fetch quizzes after deletion
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error('Error deleting quiz:', error);
      }
    }
  };

  return (
    <div>
      <h2>Create a New Quiz</h2>
      <form onSubmit={handleCreateQuiz}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <h3>Questions</h3>
        {questions.map((question, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Question"
              value={question.text}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].text = e.target.value;
                setQuestions(updatedQuestions);
              }}
              required
            />
            {question.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                type="text"
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].options[optionIndex] = e.target.value;
                  setQuestions(updatedQuestions);
                }}
                required
              />
            ))}
            <button type="button" onClick={() => addOption(index)}>Add Option</button>
            <button type="button" onClick={() => removeQuestion(index)}>Remove Question</button>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Create Quiz</button>
      </form>

      <h2>Created Quizzes</h2>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={quiz.title}>
            <h3>{quiz.title}</h3>
            <button onClick={() => handleDeleteQuiz(quiz.title)}>Delete Quiz</button>
          </div>
        ))
      ) : (
        <p>No quizzes created yet.</p>
      )}
    </div>
  );
};

export default QuizzTeacher;
