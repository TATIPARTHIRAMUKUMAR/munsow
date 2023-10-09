const UserReportPartFive = ({userData}) => {
  return (
    <div className="mt-5 bg-white pt-10 pb-10" style={{ height: '1000px' }} id="page6">
      <div className="md:flex">
        <div className="md:w-5/6 py-72 px-20">
          <div>
            <div className="bg-white">
              <div className="flex justify-between items-center">
                <div className="mt-5 mb-5 ml-6 w-96">
                  <span className="font-semibold text-[#46315b] text-5xl">
                    Where you stand
                  </span>
                </div>
                <div className="md:mt-5 md:me-4 md:mb-4 report3-btn-container">
                  <span className="md:text-2xl md:font-normal report3-btn">Part Two</span>
                </div>
              </div>
            </div>
            <div className="bg-white">
              <div className="my-8 ml-6">
                <span className="text-xl font-semibold">
                  Certain Application Insight
                </span>
              </div>
            </div>
            <div className="bg-white text-[#dd66af]">
              <div className="flex justify-between ml-6">
                <div className="mt-5 ms-4 me-4 w-52">
                  <div>
                    <span className="font-bold text-7xl">{userData?.percentage}</span>
                  </div>
                  <div className="py-8">
                    <span className="text-lg font-semibold text-center">
                      You would stand in the top {userData?.percentage} applicants
                    </span>
                  </div>
                </div>
                <div className="mt-5 ms-4 me-4 w-52">
                  <div>
                    <span className="font-bold text-7xl">{userData?.content}</span>
                  </div>
                  <div className="py-8">
                    <span className="text-lg font-semibold text-center">Content</span>
                  </div>
                </div>
                <div className="mt-5 ms-4 me-4 w-52">
                  <div>
                    <span className="font-bold text-7xl">{userData?.content_highlight}</span>
                  </div>
                  <div className="py-8">
                    <span className="text-lg font-semibold text-center">
                      Content Highlight
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/6 bg-[#b49fd8] rounded-tl-2xl rounded-bl-2xl" style={{ height: '920px' }}></div>
      </div>
    </div>
  );
};

export default UserReportPartFive;
