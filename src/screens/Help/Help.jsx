import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDarkMode } from "./../../Dark";

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      'To reset your password, go to the settings page and click on "Change Password".',
  },
  {
    question: "How do I update my email address?",
    answer:
      'You can update your email address in the settings page under the "Email" section.',
  },
  {
    question: "Where can I view my scheduled interviews?",
    answer:
      'Your scheduled interviews can be viewed in the "Interviews" section of your account.',
  },
  {
    question: "How do I get my interview scores?",
    answer:
      "Your interview scores will be sent to your registered email address after the evaluation.",
  },
  {
    question: "How can I reschedule my interview?",
    answer:
      "To reschedule your interview, contact the support team through the Help & Support page.",
  },
  {
    question: "Where can I get technical support?",
    answer:
      "Technical support can be reached through the Help & Support page or by emailing support@example.com.",
  },
];

const HelpAndSupportPage = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };
  const { isDarkMode, colorTheme } = useDarkMode();

  const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);
  const textColor = isDarkMode
    ? reduxColorTheme.dark.textColor2
    : reduxColorTheme.light.textColor2;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1
        className="text-3xl text-[#886cc0] font-semibold mb-6"
        style={{ color: textColor }}
      >
        Help & Support
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-medium mb-4">
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold text-lg">{faq.question}</p>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Contact Support</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 border rounded-md"
            placeholder="Type your query here..."
            rows={4}
          />
          <button
            type="submit"
            className="bg-[#24a7ad]  text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default HelpAndSupportPage;
