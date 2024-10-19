import React, { useEffect, useState } from 'react';
import './QuizzStudent.css'; 

const AttendQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [submittedQuizzes, setSubmittedQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost:3001/quizzes');
        const data = await response.json();

        // Fetch submitted quizzes for the user (mockUserId = 1)
        const submittedResponse = await fetch('http://localhost:3001/submitted-quizzes/1');
        const submittedData = await submittedResponse.json();

        if (data && Array.isArray(data.quizzes)) {
          const availableQuizzes = data.quizzes.filter(
            (quiz) => !submittedData.submittedQuizzes.includes(quiz.title)
          );
          setQuizzes(availableQuizzes);
          setSubmittedQuizzes(submittedData.submittedQuizzes);
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, []);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedQuiz) return;

    try {
      const response = await fetch(`http://localhost:3001/submit-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quiz_title: selectedQuiz.title,
          quiz_created_by: selectedQuiz.created_by || 1,
          answers: Object.values(answers),
        }),
      });

      if (response.ok) {
        alert('Quiz submitted successfully!');
        setSelectedQuiz(null);
        setAnswers({});
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('An error occurred while submitting the quiz.');
    }
  };

  return (
    <div>
      <h2>Available Quizzes</h2>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={quiz.title}>
            <h3>{quiz.title}</h3>
            <button onClick={() => setSelectedQuiz(quiz)}>Take Quiz</button>
          </div>
        ))
      ) : (
        <p>No quizzes available</p>
      )}

      {selectedQuiz && (
        <div>
          <h2>{selectedQuiz.title}</h2>
          {selectedQuiz.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <h4>{question.text}</h4>
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex}>
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={option}
                    checked={answers[questionIndex] === option}
                    onChange={() => handleAnswerChange(questionIndex, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit Quiz</button>
          <button onClick={() => setSelectedQuiz(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AttendQuiz;
