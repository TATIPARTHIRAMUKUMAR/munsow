import React from 'react';

const notifications = [
  {
    type: 'Interview Scheduled',
    message: 'You have an interview scheduled with XYZ Corp on 15th Oct, 2023 at 10:00 AM.',
    date: '14th Oct, 2023',
  },
  {
    type: 'Interview Score',
    message: 'Your interview score with ABC Corp is 8/10.',
    date: '13th Oct, 2023',
  },
  {
    type: 'Interview Report',
    message: 'Your interview report with ABC Corp is now available.',
    date: '13th Oct, 2023',
  },
];

const Notification = ({ type, message, date }) => {
  return (
    <div className="border border-gray-300 m-4 p-4 rounded-lg">
      <div className="font-semibold text-lg">{type}</div>
      <div className="text-gray-700">{message}</div>
      <div className="text-sm text-gray-500">{date}</div>
    </div>
  );
};

const NotificationsPage = () => {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-center text-3xl text-[#886cc0] font-bold my-4">Notifications</h1>
      {notifications.map((notification, index) => (
        <Notification key={index} {...notification} />
      ))}
    </div>
  );
};

export default NotificationsPage;
