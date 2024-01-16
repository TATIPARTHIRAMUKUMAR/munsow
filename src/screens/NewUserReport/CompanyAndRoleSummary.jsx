import React from "react";

const CompanyAndRoleSummary = () => {
  return (
    
    <>
    <div className="mx-6 my-6">
      <div className="px-8 py-12">
        <h3 className="text-xl font-semibold text-purple">Company and Role Based Curated Summary</h3>
      </div>
      <div className="pr-8">
        <div className="flex items-center">
          <div className="w-1/5 h-48 px-4 my-6 mx-8 munsow-dark-bg flex justify-center items-center text-center">
            <h3 className="font-semibold text-white">About the Company</h3>
          </div>
          <div className="w-4/5">
            <ul className="list-disc">
              <li className="text-purple">Deloitte is a global leader in consulting and has a robust
                framework for HR transformation, which includes cloud
                technologies, process improvement, and change management.
                Familiarize yourself with their approach.</li>
              <li className="text-purple"> Deloitte's culture values learning and growth. Emphasize your
                eagerness to learn and develop your skills.</li>
              <li className="text-purple">Deloitte often works with diverse, global teams. If you have any
                experiences working in diverse or cross-cultural settings, be
                sure to mention these.</li>
            </ul>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1/5 h-32 px-4 my-6 mx-8 munsow-dark-bg flex justify-center items-center text-center">
            <h3 className="font-semibold text-white">Company< br></br> related recent news</h3>
          </div>
          <div className="w-4/5">
            <ul className="list-disc">
              <li className="text-purple">In recent news, Deloitte has announced plans to increase their
                investment in Al and digital transformation services. Mentioning
                awareness of this can show that you stay updated with company
                news.</li>
            </ul>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1/5 h-32 px-4 my-6 mx-8 munsow-dark-bg flex justify-center items-center text-center">
            <h3 className="font-semibold text-white">Role-specific Skills</h3>
          </div>
          <div className="w-4/5">
            <ul className="list-disc">
              <li className="text-purple">Showcasing your experience with digital HR platforms is crucial
                for a HR Transformation Consultant role at Deloitte.</li>
              <li className="text-purple">Deloitte's HR Transformation services also involve process
                redesign and change management. Share examples of your
                experience in these areas.</li>
            </ul>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1/5 h-48 px-4 my-6 mx-8 munsow-dark-bg flex justify-center items-center text-center">
            <h3 className="font-semibold text-white">Industry Trends</h3>
          </div>
          <div className="w-4/5">
            <ul className="list-disc">
              <li className="text-purple">The HR industry is increasingly leveraging Al and machine
                learning for various HR functions. Highlighting your awareness
                and any experience you have with these technologies could
                beneficial.</li>
              <li className="text-purple">According to a recent study, HR departments are playing a key
                role in environmental, social and governance (ESG) initiatives.
                This is also an area that Deloitte is focusing on, as per recent
                news. Be prepared to discuss your views or experience in this
                area.</li>
  
            </ul>
          </div>
        </div>
      </div>
    </div>  
    </>
  );
};

export default CompanyAndRoleSummary;
