import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDarkMode } from "./../../Dark";

const SettingsForm = () => {
  const [reportAlertsEnabled, setReportAlertsEnabled] = useState(false);
  const [munsowUpdatesAlertsEnabled, setMunsowUpdatesAlertsEnabled] =
    useState(false);

  const { isDarkMode, colorTheme } = useDarkMode();

  const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);

  const headerTextColor = isDarkMode
    ? reduxColorTheme.dark.textColor2
    : reduxColorTheme.light.textColor2;

  const textColor = isDarkMode
    ? reduxColorTheme.dark.textColor3
    : reduxColorTheme.light.textColor3;

  const buttonColor = isDarkMode
    ? reduxColorTheme.dark.selectBackground
    : reduxColorTheme.light.selectBackground;

  const handleToggle = (setting) => {
    switch (setting) {
      case "reportAlerts":
        setReportAlertsEnabled(!reportAlertsEnabled);
        break;
      case "munsowUpdatesAlerts":
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
    <>
    <div className="m-6">
      <div class="p-4 bg-yellow-100 rounded-2">
        <p class="text-yellow-800">Please note that the values on this page are not editable at the moment. Kindly contact our team at <a href="mailto:admin@munsow.com" class="font-bold">admin@munsow.com</a></p>
      </div>
    </div>
    <div className="max-w-lg mx-auto mt-10 p-4 relative overflow-auto h-auto">
      <h1
        className="text-3xl text-700 font-semibold mb-6 relative overflow-auto max-w-full h-auto"
        style={{ color: textColor }}
      >
        Settings
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 relative overflow-auto max-w-full h-auto"
      >
        <div className="flex items-center justify-between">
          <label
            htmlFor="notifications"
            className="block text-sm font-medium text-gray-600"
          >
            Notify me over email once my report is ready
          </label>
          <button
            type="button"
            onClick={() => handleToggle("reportAlerts")}
            className=" relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none"
            style={{
              background: reportAlertsEnabled ? buttonColor : "lightGray",
            }}
          >
            <span
              className=" inline-block w-5 h-5 transform translate-y-0.4 rounded-full transition-transform"
              style={{
                transform: reportAlertsEnabled
                  ? "translateX(24px)"
                  : "translateX(0px)",
                background: reportAlertsEnabled ? "white" : headerTextColor,
              }} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="notifications"
            className="w-[350px] text-sm font-medium text-gray-600"
          >
            Opt in for new updates on Munsow and get notified when more features
            are added to the platform
          </label>
          <button
            type="button"
            onClick={() => handleToggle("munsowUpdatesAlerts")}
            className=" relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none"
            style={{
              background: munsowUpdatesAlertsEnabled
                ? buttonColor
                : "lightGray",
            }}
          >
            <span
              className="inline-block w-5 h-5 transform translate-y-0.4 rounded-full transition-transform"
              style={{
                transform: munsowUpdatesAlertsEnabled
                  ? "translateX(24px)"
                  : "translateX(0px)",
                background: munsowUpdatesAlertsEnabled
                  ? "white"
                  : headerTextColor,
              }} />
          </button>
        </div>
        <div className="pt-5 relative overflow-auto max-w-full h-auto">
          <button
            type="submit"
            className=" py-2 px-4 rounded"
            style={{
              background: buttonColor,
              color: textColor,
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default SettingsForm;