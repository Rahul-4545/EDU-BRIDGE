import React, { useEffect, useState } from 'react';

const AttendQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({}); // Store answers keyed by question index

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost:3001/quizzes');
        const data = await response.json();

        if (data && Array.isArray(data.quizzes)) {
          setQuizzes(data.quizzes);
        } else {
          console.error('Unexpected response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, []);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption, // Store the selected answer for the question
    }));
  };

  const handleSubmit = async () => {
    if (!selectedQuiz) return;

    // Validate answers length
    if (Object.keys(answers).length !== selectedQuiz.questions.length) {
      alert('Please answer all questions.');
      return;
    }

    // Prepare submission data
    const submissionData = {
      quiz_title: selectedQuiz.title,
      quiz_created_by: selectedQuiz.createdBy,
      answers: Object.values(answers), // Submit answers as an array
    };

    console.log('Submitting Data:', submissionData); // Log the data being sent

    try {
      const response = await fetch('http://localhost:3001/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setSelectedQuiz(null);
        setAnswers({});
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    <div>
      <h2>Available Quizzes</h2>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={`${quiz.title}-${quiz.createdBy}`}>
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
          {/* Render questions */}
          {selectedQuiz.questions.map((question, index) => (
            <div key={index}>
              <p>{question.text}</p>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option} // Check if this option is selected
                      onChange={() => handleAnswerChange(index, option)} // Handle answer change
                    />
                    {option}
                  </label>
                </div>
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
