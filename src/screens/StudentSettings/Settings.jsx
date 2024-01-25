
import React, { useState } from 'react';

const SettingsForm = () => {
  // const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  // const [marksAlertsEnabled, setMarksAlertsEnabled] = useState(false);
  // const [interviewAlertsEnabled, setInterviewAlertsEnabled] = useState(false);
  // const [classScheduleAlertsEnabled, setClassScheduleAlertsEnabled] = useState(false);
  // const [libraryDueAlertsEnabled, setLibraryDueAlertsEnabled] = useState(false);
  const [reportAlertsEnabled, setReportAlertsEnabled] = useState(false);
  const [munsowUpdatesAlertsEnabled, setMunsowUpdatesAlertsEnabled] = useState(false);

  const handleToggle = (setting) => {
    switch (setting) {
      // case 'notifications':
      //   setNotificationsEnabled(!notificationsEnabled);
      //   break;
      // case 'marksAlerts':
      //   setMarksAlertsEnabled(!marksAlertsEnabled);
      //   break;
      // case 'interviewAlerts':
      //   setInterviewAlertsEnabled(!interviewAlertsEnabled);
      //   break;
      // case 'classScheduleAlerts':
      //   setClassScheduleAlertsEnabled(!classScheduleAlertsEnabled);
      //   break;
      // case 'libraryDueAlerts':
      //   setLibraryDueAlertsEnabled(!libraryDueAlertsEnabled);
      //   break;
      case 'reportAlerts':
        setReportAlertsEnabled(!reportAlertsEnabled);
        break;
      case 'munsowUpdatesAlerts':
        setMunsowUpdatesAlertsEnabled(!munsowUpdatesAlertsEnabled);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic here
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 relative overflow-auto max-w-full h-auto">
      <h1 className="text-3xl text-purple-700 font-semibold mb-6 relative overflow-auto max-w-full h-auto">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4 relative overflow-auto max-w-full h-auto">
        {/* <div className="flex items-center justify-between">
          <label htmlFor="notifications" className="block text-sm font-medium text-gray-600">
            Enable Notifications
          </label>
          <button
            type="button"
            onClick={() => handleToggle('notifications')}
            className={`${
              notificationsEnabled
                ? 'bg-purple-700'
                : 'bg-gray-300'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
          >
            <span
              className={`${
                notificationsEnabled
                  ? 'translate-x-6 bg-white'
                  : 'translate-x-0 bg-purple-700'
              } inline-block w-5 h-5 transform translate-y-0.4 rounded-full transition-transform`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="marksAlerts" className="block text-sm font-medium text-gray-600">
            Enable Marks Alerts
          </label>
          <button
            type="button"
            onClick={() => handleToggle('marksAlerts')}
            className={`${
              marksAlertsEnabled
                ? 'bg-purple-700'
                : 'bg-gray-300'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
          >
            <span
              className={`${
                marksAlertsEnabled
                  ? 'translate-x-6 bg-white'
                  : 'translate-x-0 bg-purple-700'
              } inline-block w-5 h-5 transform translate-y-0.4 rounded-full transition-transform`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="notifications" className="block text-sm font-medium text-gray-600">
            Enable Interview Alerts
          </label>
          <button
            type="button"
            onClick={() => handleToggle('interviewAlerts')}
            className={`${
              interviewAlertsEnabled
                ? 'bg-purple-700'
                : 'bg-gray-300'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
          >
            <span
              className={`${
                interviewAlertsEnabled
                  ? 'translate-x-6 bg-white'
                  : 'translate-x-0 bg-purple-700'
              } inline-block w-5 h-5 transform translate-y-0.4 rounded-full transition-transform`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="notifications" className="block text-sm font-medium text-gray-600">
            Enable Class Schedule Alerts
          </label>
          <button
            type="button"
            onClick={() => handleToggle('classScheduleAlerts')}
            className={`${
              classScheduleAlertsEnabled
                ? 'bg-purple-700'
                : 'bg-gray-300'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
          >
            <span
              className={`${
                classScheduleAlertsEnabled
                  ? 'translate-x-6 bg-white'
                  : 'translate-x-0 bg-purple-700'
              } inline-block w-5 h-5 transform translate-y-0.4 rounded-full transition-transform`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="notifications" className="block text-sm font-medium text-gray-600">
            Enable Library Due Alerts
          </label>
          <button
            type="button"
            onClick={() => handleToggle('libraryDueAlerts')}
            className={`${
              libraryDueAlertsEnabled
                ? 'bg-purple-700'
                : 'bg-gray-300'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
          >
            <span
              className={`${
                libraryDueAlertsEnabled
                  ? 'translate-x-6 bg-white'
                  : 'translate-x-0 bg-purple-700'
              } inline-block w-5 h-5 transform translate-y-0.4 rounded-full transition-transform`}
            />
          </button>
        </div> */}
        <div className="flex items-center justify-between">
          <label htmlFor="notifications" className="block text-sm font-medium text-gray-600">
            Nofiy me over email once my report is ready
          </label>
          <button
            type="button"
            onClick={() => handleToggle('reportAlerts')}
            className={`${
              reportAlertsEnabled
                ? 'bg-purple-700'
                : 'bg-gray-300'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
          >
            <span
              className={`${
                reportAlertsEnabled
                  ? 'translate-x-6 bg-white'
                  : 'translate-x-0 bg-purple-700'
              } inline-block w-5 h-5 transform translate-y-0.4 rounded-full transition-transform`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="notifications" className="w-[350px] text-sm font-medium text-gray-600">
            Opt in for new updates on Munsow and get notified when more features are added to the platform
          </label>
          <button
            type="button"
            onClick={() => handleToggle('munsowUpdatesAlerts')}
            className={`${
              munsowUpdatesAlertsEnabled
                ? 'bg-purple-700'
                : 'bg-gray-300'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
          >
            <span
              className={`${
                munsowUpdatesAlertsEnabled
                  ? 'translate-x-6 bg-white'
                  : 'translate-x-0 bg-purple-700'
              } inline-block w-5 h-5 transform translate-y-0.4 rounded-full transition-transform`}
            />
          </button>
        </div>
        <div className="pt-5 relative overflow-auto max-w-full h-auto">
          <button type="submit" className="bg-purple-700 text-white py-2 px-4 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;

