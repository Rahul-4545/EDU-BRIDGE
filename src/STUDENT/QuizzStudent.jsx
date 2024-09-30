import React, { useState, useEffect } from 'react';
import './QuizzStudent.css';

const AttendQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const userId = 'yourUserId'; // Replace with actual user ID logic

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/quizzes?userId=${userId}`);
        const data = await response.json();
        setQuizzes(Array.isArray(data.quizzes) ? data.quizzes : []);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
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
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/submit-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, quizId: selectedQuiz.id, answers }),
      });
      if (response.ok) {
        setSubmissionStatus('Quiz submitted successfully!');
        setSelectedQuiz(null); // Reset quiz
        setAnswers([]); // Clear answers
      } else {
        setSubmissionStatus('Failed to submit quiz');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setSubmissionStatus('Error submitting quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Attend Quiz</h2>
      {loading && <p>Loading...</p>}
      <div className="quiz-list">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className={`quiz-item ${selectedQuiz?.id === quiz.id ? 'selected' : ''}`}
              onClick={() => setSelectedQuiz(quiz)}
            >
              <h3>{quiz.quizTitle} Quiz</h3>
            </div>
          ))
        ) : (
          <p>No quizzes available</p>
        )}
      </div>

      {selectedQuiz && (
        <div className="quiz-questions">
          <h3>Quiz: {selectedQuiz.quizTitle} Quiz</h3>
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
          <button onClick={handleSubmit} disabled={loading}>Submit Quiz</button>
        </div>
      )}

      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
};

export default AttendQuiz;
