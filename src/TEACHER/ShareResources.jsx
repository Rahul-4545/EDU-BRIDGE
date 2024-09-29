import React, { useState } from 'react';
import './ShareResources.css'; 

const ResourceUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(''); // To store success or error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    // Sending resource data to the backend
    try {
      const response = await fetch('http://localhost:3001/upload-resource', {
        method: 'POST',
        body: formData,
      });

      console.log('Response Status:', response.status); // Log response status
      const textResponse = await response.text(); // Read response as text
      console.log('Response Body:', textResponse); // Log response body

      if (!response.ok) {
        throw new Error(textResponse); // Throw an error with the response body
      }

      const result = JSON.parse(textResponse); // Now parse it as JSON
      alert('Resource uploaded successfully!');
      // Optionally clear the form after successful upload
      setTitle('');
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading resource:', error);
      setMessage(`Error: ${error.message}`); // Display error message
    }
  };

  return (
    <div>
      <h2>Upload a Resource</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Upload Resource</button>
      </form>
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};

export default ResourceUpload;
