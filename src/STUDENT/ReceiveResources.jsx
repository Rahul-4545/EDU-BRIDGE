import React, { useEffect, useState } from 'react';
import './ReceiveResources.css'; // Import the CSS file

const ResourceList = ({ userId }) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Fetch the list of resources for the student
    const fetchResources = async () => {
      try {
        const response = await fetch(`http://localhost:3001/resources?userId=${userId}`);
        const data = await response.json();
        setResources(data.resources);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, [userId]);

  return (
    <div>
      <h2>Available Resources</h2>
      {resources.length === 0 ? (
        <p>No resources available at the moment.</p>
      ) : (
        <div className="resource-list">
          {resources.map((resource) => (
            <div className="resource-item" key={resource.id}>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a href={`http://localhost:3001/${resource.filePath}`} download>
                Download Resource
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceList;
