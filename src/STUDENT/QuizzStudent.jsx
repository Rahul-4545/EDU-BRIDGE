import React, { useState, useEffect } from 'react';
import './QuizzStudent.css';

const AttendQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const userId = 'yourUserId'; // Replace with actual user ID logic

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`http://localhost:3001/quizzes?userId=${userId}`);
        const data = await response.json();
        if (Array.isArray(data.quizzes)) {
          setQuizzes(data.quizzes);
        } else {
          setQuizzes([]); // Fallback to empty array if no quizzes
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, [userId]);

  const handleAnswerChange = (qIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/submit-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, quizId: selectedQuiz.id, answers }),
      });
      if (response.ok) {
        alert('Quiz submitted successfully!');
        setSelectedQuiz(null); // Reset selected quiz to hide it after submission
        setAnswers([]); // Reset answers after submission
      } else {
        console.error('Failed to submit quiz', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    <div>
      <h2>Attend Quiz</h2>
      <div className="quiz-list">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-item" onClick={() => setSelectedQuiz(quiz)}>
              <h3>{quiz.quizTitle} Quiz</h3> {/* Append 'Quiz' to the title */}
            </div>
          ))
        ) : (
          <p>No quizzes available</p>
        )}
      </div>

      {selectedQuiz && (
        <div className="quiz-questions">
          <h3>Quiz: {selectedQuiz.quizTitle} Quiz</h3> {/* Append 'Quiz' here too */}
          {selectedQuiz.questions.map((q, qIndex) => (
            <div key={qIndex}>
              <p>{q.question}</p>
              {q.options.map((option, oIndex) => (
                <div key={oIndex}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      value={option}
                      onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit Quiz</button>
        </div>
      )}
    </div>
  );
};

export default AttendQuiz;
