import GLOBAL_CONSTANTS from "../../../GlobalConstants"
const UserReportTitle = () => {
  return (
    <div className="bg-white" id="page1">
      <div className="report1-main-container">
        <div className="flex items-center">
          <div className="report1-sub-container">
            <div className="p-4">
              <div className="mt-5">
                <div className="text-2xl font-semibold report1-header">
                  START X REPORT
                </div>
              </div>
            </div>
            <div className="p-4 report1-cap-container-middle">
              <div className="md:flex mt-5">
                <div className="md:w-6/12">
                  <div>
                    <span className="text-2xl font-semibold report1-title">
                      REPORT FOR
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-semibold">{GLOBAL_CONSTANTS?.user_cred?.first_name} {GLOBAL_CONSTANTS?.user_cred?.last_name}</span>
                  </div>
                </div>
                <div className="md:w-6/12">
                  <div>
                    <span className="text-2xl font-semibold report1-title">
                      CONTACT YOUR GUIDE
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-semibold">MANU R</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-semibold">+91 8328057448</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="line-bar"></div>
            <div className="p-4 report1-cap-container-middle pt-16">
              <div className="font-bold mt-2 report1-cap">
                Candidate Assessment Report
              </div>
            </div>
            <div className="p-4 mt-3">
              <div className="mb-4 report1-footer">
                <span className="report1-footer-txt text-xl">
                  Position: HR Transformation Consultant | Deloitte
                </span>
              </div>
            </div>
          </div>
          <div className="mt-20 -ml-8">
            <div className="w-16 h-16 bg-pink-600 rounded-full mt-8"></div>
            <div className="w-16 h-16 bg-yellow-400 rounded-full mt-8"></div>
            <div className="w-16 h-16 bg-indigo-700 rounded-full mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReportTitle;
