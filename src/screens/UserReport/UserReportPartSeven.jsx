const UserReportPartSeven = ({userData}) => {
  return (
    <div className="mt-5 bg-white" id="page8" style={{ height: '1000px' }}>
      <div className="md:flex justify-center items-center">
        <div className="md:w-95 md:m-auto h-500">
          <div className="md:col-span-12">
            <div className="mt-5 md:mt-0 md:ms-4 md:mb-5">
              <span className="md:ms-4 text-4xl font-semibold text-purple-800">
              {userData?.source_company}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex justify-center items-center">
        <div className="md:w-95 md:m-auto h-398 ps-5">
          <div className="md:col-span-12">
            <div className="mt-4 md:mb-4">
              <span className="text-lg font-normal text-purple-800">
              {userData?.source_company_number}
              </span>
            </div>
            <div className="mt-4 md:mb-4">
              <span className="text-lg font-normal text-purple-800">
              {userData?.source_company_email}
              </span>
            </div>
            <div className="mt-4 md:mb-5">
              <span className="text-lg font-normal text-purple-800">
              {userData?.source_company_websites}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReportPartSeven;
