import React from 'react';

const SubtopicContent = ({ content }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg mt-2">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default SubtopicContent;
