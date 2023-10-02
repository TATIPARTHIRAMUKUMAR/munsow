const UserReportPartThree = () => {
  return (
    <div className="mt-5" id="page3">
    <div className="md:flex">
      <div className="md:w-1/12 bg-[#b49fd8] rounded-tr-2xl rounded-br-2xl"></div>
      <div className="md:w-11/12">
        <div className="md:flex justify-between items-center">
          <div className="md:mt-5 md:ms-4 md:mb-4">
            <span className="md:text-3xl md:font-semibold text" style={{ fontSize: "25px" }}>
              Interview Score by Category
            </span>
          </div>
          <div className="md:mt-5 md:me-4 md:mb-4 report3-btn-container">
            <span className="md:text-2xl md:font-normal report3-btn">Part Two</span>
          </div>
        </div>

        <div className="md:flex">
          <div className="md:w-4/12 p-4 md:mt-4">
            <div className="md:flex flex-col justify-content-center items-center">
              <div>
                <span className="md:font-bold report3-mindset text" style={{ fontSize: "50px" }}>
                  8/10
                </span>
              </div>
              <div>
                <span className="md:text-2xl md:font-semibold report3-mindset text">
                  Mindset/Attitude
                </span>
              </div>
            </div>
          </div>
          <div className="md:w-8/12 p-4 md:mt-4">
            <div>
              <span className="md:text-2xl md:font-semibold report3-growth text">
                Growth Mindset
              </span>
            </div>
            <div>
              <p className="md:text-lg md:font-medium text-break text" style={{ lineHeight: 2.2 }}>
                Arpitha exhibited a growth mindset and a positive attitude throughout the interview. However, she sometimes sounded defensive when asked about past failures, instead of embracing them as learning opportunities.
              </p>
            </div>
          </div>
        </div>
        <div className="md:flex">
          <div className="md:w-6/12 p-4 md:mt-4">
            <div>
              <span className="md:text-xl md:font-semibold text-red-600">2/10</span>
              <span className="md:text-2xl md:font-semibold md:ms-2 underline text">
                Resilience
              </span>
            </div>
            <div style={{ marginLeft: "60px" }}>
              <p className="md:text-lg md:font-semibold text-break text mt-2" style={{ lineHeight: 1.8 }}>
                Arpitha showed resilience in dealing with past challenges, but there were moments where she appeared defensive when asked about failures. It's essential to present these instances as learning experiences.
              </p>
            </div>
          </div>
          <div className="md:w-6/12 p-4 md:mt-4">
            <div>
              <span className="md:text-xl md:font-semibold text-orange-500">7/10</span>
              <span className="md:text-2xl md:font-semibold md:ms-2 underline text">
                Teamwork
              </span>
            </div>
            <div style={{ marginLeft: "60px" }}>
              <p className="md:text-lg md:font-semibold text-break mt-2 text" style={{ lineHeight: 1.8 }}>
                She shared relevant instances of successful team collaboration. However, she could improve on recognizing and articulating the contributions of team members to project successes.
              </p>
            </div>
          </div>
        </div>
        <div className="md:flex">
          <div className="md:w-6/12 p-4 md:mt-4">
            <div>
              <span className="md:text-xl md:font-semibold text-green-600">9/10</span>
              <span className="md:text-2xl md:font-semibold md:ms-2 underline text">
                Adaptability
              </span>
            </div>
            <div style={{ marginLeft: "60px" }}>
              <p className="md:text-lg md:font-semibold text-break mt-2 text" style={{ lineHeight: 1.8 }}>
                Arpitha provided good examples of adapting to changing circumstances in her previous roles, demonstrating her ability to manage change effectively.
              </p>
            </div>
          </div>
          <div className="md:w-6/12 p-4 md:mt-4">
            <div>
              <span className="md:text-xl md:font-semibold text-red-600">5/10</span>
              <span className="md:text-2xl md:font-semibold md:ms-2 underline text">
                Initiative
              </span>
            </div>
            <div style={{ marginLeft: "60px" }}>
              <p className="md:text-lg md:font-semibold text-break mt-2 text" style={{ lineHeight: 1.8 }}>
                While Arpitha showed initiative in certain scenarios, she may need to emphasize more proactive behavior in identifying and addressing challenges.
              </p>
            </div>
          </div>
        </div>
        <div >
          <div >
            <div className="mt-3 p-4">
              <span className="text-white md:text-2xl md:font-bold bg-[#7a5fa7] p-5 w-full">
                Can you describe a time when you showed resilience in a challenging work situation?
              </span>
            </div>
          </div>
        </div>

        <div className="md:flex">
          <div className="md:w-6/12 p-4">
            <div>
              <span className="md:text-2xl md:font-semibold text" style={{ lineHeight: 1.8, fontStyle: "italic" }}>
                Arpitha's Answer:
              </span>
              <p className="md:text-lg md:font-medium text-break text" style={{ lineHeight: 1.8, fontStyle: "italic" }}>
                "Well, there was a time when we had a major issue with a project I was handling. I just made sure we got it done."
              </p>
            </div>
            <div className="mt-4">
              <span className="md:text-2xl md:font-semibold text" style={{ lineHeight: 1.8, fontStyle: "italic" }}>
                Insights
              </span>
              <p className="md:text-lg md:font-medium text-break text" style={{ lineHeight: 1.8, fontStyle: "italic" }}>
                Arpitha's answer is rather brief and lacks specificity. She could benefit from explaining the situation more vividly, describing her actions in detail, and highlighting the result of her resilience.
              </p>
            </div>
          </div>
          <div className="md:w-6/12 p-4">
            <span className="md:text-2xl md:font-semibold text" style={{ lineHeight: 1.8, fontStyle: "italic" }}>
              Curated Answer
            </span>
            <p className="md:text-lg md:font-medium text-break text" style={{ lineHeight: 1.8, fontStyle: "italic" }}>
              "At my previous job, we faced a situation where a critical HR transformation project was at risk due to unexpected budget cuts. Instead of giving up, I took the initiative to reassess our resources and recalibrate our project plan. We streamlined our activities, prioritized tasks more effectively, and managed to complete the project successfully under budget. This experience has honed my resilience and ability to adapt to challenging circumstances."
            </p>
          </div>
        </div>

      </div>
    </div>


  </div>
  );
};

export default UserReportPartThree;
