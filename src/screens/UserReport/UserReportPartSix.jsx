const UserReportPartSix = ({ userData }) => {
  return (
    <div className="mt-5" id="page7">
      <div className="bg-white p-5">
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
          <div className="md:w-3/12 md:flex justify-center items-center md:mb-4 bg-[#212e3e]">
            <div className="">
              <span className="md:text-lg font-semibold text-white">
                About The Company
              </span>
            </div>
          </div>
          <div className="md:w-9/12">
            <div className="mt-4 md:ms-4 md:mb-5">
              <ul className="list-disc list-inside text-lg font-medium text-[#212e3e]">
                {userData?.about_company?.map((o, index) => {
                  return (
                    <>
                      <li>
                        {o}
                      </li>
                    </>
                  )
                }
                )
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="md:flex">
          <div className="md:w-3/12 md:flex justify-center items-center md:mb-4 bg-[#212e3e]">
            <div>
              <span className="md:text-lg font-semibold text-white">
                Company-related recent news
              </span>
            </div>
          </div>
          <div className="md:w-9/12">
            <div className="mt-4 md:ms-4 md:mb-5">
              <ul className="list-disc list-inside text-lg font-medium text-[#212e3e]">
              {userData?.lastest_company_news?.map((o, index) => {
                  return (
                    <>
                      <li>
                        {o}
                      </li>
                    </>
                  )
                }
                )
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="md:flex">
          <div className="md:w-3/12 md:flex justify-center items-center md:mb-4 bg-[#7a5fa7]">
            <div>
              <span className="md:text-lg font-semibold text-white">
                Role-specific Skills
              </span>
            </div>
          </div>
          <div className="md:w-9/12">
            <div className="mt-4 md:ms-4 md:mb-5">
              <ul className="list-disc list-inside text-lg font-medium text-purple-800">
              {userData?.role_specific_skills?.map((o, index) => {
                  return (
                    <>
                      <li>
                        {o}
                      </li>
                    </>
                  )
                }
                )
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="md:flex">
          <div className="md:w-3/12 md:flex justify-center items-center md:mb-5 bg-[#7a5fa7]">
            <div>
              <span className="md:text-lg font-semibold text-white">
                Industry Trends
              </span>
            </div>
          </div>
          <div className="md:w-9/12">
            <div className="mt-4 md:ms-4 md:mb-5">
              <ul className="list-disc list-inside text-lg font-medium text-purple-800">
              {userData?.industry_trends?.map((o, index) => {
                  return (
                    <>
                      <li>
                        {o}
                      </li>
                    </>
                  )
                }
                )
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReportPartSix;
