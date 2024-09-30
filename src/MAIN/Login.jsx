import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState(null); // Store the role

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        localStorage.setItem('token', data.token); // Store JWT token
        setRole(data.role); // Store the user's role

        // Redirect based on the user's role
        if (data.role === 'student') {
          window.location.href = '/student-dashboard'; // Redirect to student dashboard
        } else if (data.role === 'teacher') {
          window.location.href = '/teacher-dashboard'; // Redirect to teacher dashboard
        } else if (data.role === 'administrator') {
          window.location.href = '/admin-dashboard'; // Redirect to admin dashboard
        }
      } else {
        setMessage(data.message); // Show error message from server
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred during login.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      {role && <p>Logged in as: {role}</p>} {/* Display role if logged in */}
    </div>
  );
};

export default Login;
