// src/components/ReadMore.jsx
import React, { useState } from 'react';

const ReadMore = ({ text, maxLength = 150 }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  // Agar text null ya undefined hai, toh kuch na dikhayein
  if (!text) {
    return null;
  }

  // Agar text chhota hai, toh poora dikhayein
  if (text.length <= maxLength) {
    return <p className="text-gray-600 text-sm mb-4">{text}</p>;
  }

  // Toggle function
  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <p className="text-gray-600 text-sm mb-4">
      {isTruncated ? `${text.substring(0, maxLength)}...` : text}
      <button
        onClick={toggleTruncate}
        className="text-blue-600 hover:text-blue-800 font-semibold ml-2"
      >
        {isTruncated ? 'View More' : 'View Less'}
      </button>
    </p>
  );
};

export default ReadMore;