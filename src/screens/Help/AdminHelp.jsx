import React, { useState } from 'react';

const faqs = [
  {
    question: 'How do I add a new course?',
    answer: 'To add a new course, go to the course management page and click on "Add New Course". Fill in the necessary information and click "Save".',
  },
  {
    question: 'How can I approve student registrations?',
    answer: 'Student registrations can be approved in the "Student Registrations" section in your admin panel.',
  },
  {
    question: 'How do I schedule academic events?',
    answer: 'Academic events can be scheduled in the "Events" section of your admin panel.',
  },
  {
    question: 'Where can I view faculty details?',
    answer: 'Faculty details can be viewed in the "Faculty" section of your admin panel.',
  },
  {
    question: 'How can I update semester details?',
    answer: 'Semester details can be updated in the "Semester Management" section of your admin panel.',
  },
  {
    question: 'How do I manage examination schedules?',
    answer: 'Examination schedules can be managed in the "Examinations" section of your admin panel.',
  },
];

const HelpAndSupportAdmin = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-semibold mb-6">Institution Admin Help & Support</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-medium mb-4">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold text-lg">{faq.question}</p>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </section>
      
      {/* Temporary commented, because it was not functional. Have added msg for user to contact admin */}
      {/* <section>
        <h2 className="text-2xl font-medium mb-4">Contact Support</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 border rounded-md"
            placeholder="Type your query here..."
            rows={4}
          />
          <div class="flex justify-end">
            <button type="submit" style={{background: '#2BE2D0', color: '#252525'}} className="bg-blue-500 text-white py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </section> */}

      <div class="p-4 bg-yellow-100 rounded-2">
        <h2 class="text-xl text-yellow-800 font-bold mb-3">Need Further Assistance?</h2>
        <p class="text-yellow-800">You can reach out to us via email at <a href="mailto:admin@munsow.com">admin@munsow.com</a>, or simply click the link below to access our contact page.</p>
        <a href="https://www.munsow.com/contact" target='_blank' class="text-lg text-yellow-800 font-bold mb-3 underline">Contact Us</a>
      </div>
      
    </div>
  );
};

export default HelpAndSupportAdmin;
