import React, { useState } from 'react';

const SettingsPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [marksAlertsEnabled, setMarksAlertsEnabled] = useState(true);
  const [interviewAlertsEnabled, setInterviewAlertsEnabled] = useState(true);
  const [classScheduleAlertsEnabled, setClassScheduleAlertsEnabled] = useState(true);
  const [libraryDueAlertsEnabled, setLibraryDueAlertsEnabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to an API
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <h1 className="text-3xl text-[#886cc0] font-semibold mb-6">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="notifications" className="block text-sm font-medium text-gray-600">
            Enable Notifications
          </label>
          <input
            id="notifications"
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            className="mt-1 text-[#886cc0]"
          />
        </div>
        <div>
          <label htmlFor="marksAlerts" className="block text-sm font-medium text-gray-600">
            Enable Marks Alerts
          </label>
          <input
            id="marksAlerts"
            type="checkbox"
            checked={marksAlertsEnabled}
            onChange={(e) => setMarksAlertsEnabled(e.target.checked)}
            className="mt-1 text-[#886cc0]"
          />
        </div>
        <div>
          <label htmlFor="interviewAlerts" className="block text-sm font-medium text-gray-600">
            Enable Interview Alerts
          </label>
          <input
            id="interviewAlerts"
            type="checkbox"
            checked={interviewAlertsEnabled}
            onChange={(e) => setInterviewAlertsEnabled(e.target.checked)}
            className="mt-1 text-[#886cc0]"
          />
        </div>
        <div>
          <label htmlFor="classScheduleAlerts" className="block text-sm font-medium text-gray-600">
            Enable Class Schedule Alerts
          </label>
          <input
            id="classScheduleAlerts"
            type="checkbox"
            checked={classScheduleAlertsEnabled}
            onChange={(e) => setClassScheduleAlertsEnabled(e.target.checked)}
            className="mt-1 text-[#886cc0]"
          />
        </div>
        <div>
          <label htmlFor="libraryDueAlerts" className="block text-sm font-medium text-gray-600">
            Enable Library Due Alerts
          </label>
          <input
            id="libraryDueAlerts"
            type="checkbox"
            checked={libraryDueAlertsEnabled}
            onChange={(e) => setLibraryDueAlertsEnabled(e.target.checked)}
            className="mt-1 text-[#886cc0]"
          />
        </div>
        <button type="submit" className="bg-[#886cc0] text-white py-2 px-4 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
