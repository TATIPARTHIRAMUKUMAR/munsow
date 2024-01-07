// ComingSoonPage.jsx
import React from 'react';

const ComingSoonPage = () => {
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold mb-4">Coming Soon</h1>
        <p className=" mb-8">We're building something amazing for you!</p>
        <div className="flex justify-center">
          <div className="flex items-center space-x-4">
            <div className="bg-black p-2 rounded-full">
              <i className="ri-facebook-fill text-xl text-blue-500"></i>
            </div>
            <div className="bg-black p-2 rounded-full">
              <i className="ri-twitter-fill text-xl text-blue-400"></i>
            </div>
            <div className="bg-black p-2 rounded-full">
              <i className="ri-instagram-fill text-xl text-pink-500"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
