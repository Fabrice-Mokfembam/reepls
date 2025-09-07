import React from 'react';
import { useParams } from 'react-router-dom';

const Analytics: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  return (
    <div>
      <h1>Analytics Page</h1>
      {username && <p>Analytics for: {username}</p>}
    </div>
  );
};

export default Analytics;