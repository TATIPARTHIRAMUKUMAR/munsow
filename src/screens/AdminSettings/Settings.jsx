import React, { useState, useEffect, useRef } from 'react';

const SettingsPageAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    twoFactorAuth: false,
    emailNotifications: false,
    smsNotifications: false,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user_data'));

    if (userData) {
      setFormData({
        name: userData?.data?.contact_name || '',
        email: userData?.data?.email || '',
        password: '', 
        twoFactorAuth: false, 
        emailNotifications: false, 
        smsNotifications: false,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold mb-8">Settings</h1>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-medium mb-4">Personal Information</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-2/3 p-3 border rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-2/3 p-3 border rounded-md"
            />
          </div>
        </section>

        {/* Account Settings */}
        <section className="mb-8">
          <h2 className="text-2xl font-medium mb-4">Account Settings</h2>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-2/3 p-3 border rounded-md"
          />
        </section>

        {/* Security */}
        <section className="mb-8">
          <h2 className="text-2xl font-medium mb-4">Security</h2>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={formData.twoFactorAuth}
              onChange={handleCheckChange}
              className="rounded"
            />
            <span>Enable Two-Factor Authentication</span>
          </label>
        </section>

        {/* Notification Preferences */}
        <section className="mb-8">
          <h2 className="text-2xl font-medium mb-4">Notification Preferences</h2>
          <label className="flex items-center space-x-3 mb-3">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={formData.emailNotifications}
              onChange={handleCheckChange}
              className="rounded"
            />
            <span>Email Notifications</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="smsNotifications"
              checked={formData.smsNotifications}
              onChange={handleCheckChange}
              className="rounded"
            />
            <span>SMS Notifications</span>
          </label>
        </section>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SettingsPageAdmin;
