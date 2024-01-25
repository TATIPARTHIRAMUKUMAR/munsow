import React, { useState } from 'react';

const faqs = [
  {
    question: 'How do I reset my password?',
    answer: 'To reset your password, go to the settings page and click on "Change Password".',
  },
  {
    question: 'How do I update my email address?',
    answer: 'You can update your email address in the settings page under the "Email" section.',
  },
  {
    question: 'What is Munsow?',
    answer: 'Munsow is a platform offering specialized mock interview sessions for various roles across leading companies, helping candidates fine-tune their skills and be industry-ready.',
  },
  {
    question: "How does Munsow's mock interview process work?",
    answer: 'Once you sign up and choose your desired role / company / skills, Munsow simulates real-time interviews, providing feedback afterward to enhance your preparation.',
  },
  {
    question: 'Are the interviews conducted in real-time?',
    answer: 'Yes, all mock interviews on Munsow are conducted in real-time to replicate the actual interview experience.',
  },
  {
    question: 'Can I choose the company for which I want a mock interview?',
    answer: 'Yes, Munsow offers mock interview sessions for various roles across top companies like Google, Facebook, Tesla, Deloitte and more. You can select your desired company and role during the booking process. Our team is continuously in the process of adding new roles and companies in each release to curate the best experience for you.',
  },
  {
    question: "How long is each mock interview session?",
    answer: 'Typically, each session lasts about 15 minutes.',
  },
  {
    question: 'How much does it cost to book a mock interview session?',
    answer: "Munsow offers different pricing plans tailored to various needs. Check our 'Pricing' page for detailed information.",
  },
  {
    question: 'Is there a cancellation policy?',
    answer: "Yes, we offer a flexible cancellation policy. You can view the details on our 'Cancellation & Refund' page.",
  },
  {
    question: 'Do I get feedback after the mock interview?',
    answer: "Absolutely! Post the mock interviews taken on the 'Pro' or 'Plus' plan, you will receive comprehensive feedback, highlighting areas of strength and where you might need improvement.",
  },
  {
    question: 'Can I reschedule my mock interview?',
    answer: "No, you can't reschedule a mock interview session that has been started. If the session remains un-finished for any reasons like electricity/wifi issues - kindly contact our support team at admin@munsow.com",
  },
];

const HelpAndSupportPage = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-3xl text-[#886cc0] font-semibold mb-6">Help & Support</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-medium mb-4">Frequently Asked Questions</h2>
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
          <button type="submit" className="bg-[#886cc0] text-white py-2 px-4 rounded float-right">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default HelpAndSupportPage;
