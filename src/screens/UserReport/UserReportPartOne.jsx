const UserReportPartOne = ({ userData }) => {

  function getScoreClass(secured, total) {
    const scorePercentage = (secured / total) * 100;
    if (scorePercentage <= 33) return 'text-red-600';  
    if (scorePercentage <= 66) return 'text-orange-500';
    return 'text-green-600'; 
  }

  return (
    <div className="mt-5 page" id="page2">
      <div className="bg-white">
        <div className="py-1 bg-[#b49fd8]">
          <div className="flex justify-end items-center report2-top-container">
            <span className="me-3 report2-btn-container">
              <span className="text-2xl font-normal report2-btn">Part One</span>
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-3 pt-7">
          <span className="text-3xl font-semibold">
            1. {userData?.title}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10 bg-white px-14 pb-10">
        {userData?.data?.map((o, index) => {
          return (
            <>
              <div className="col-span-1">
                <div className="mt-2">
                  <div>
                    <span className={`text-4xl font-bold ${getScoreClass(o?.secured_marks, o?.total_marks)}`}>
                      {o?.secured_marks}/{o?.total_marks}
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="text-xl font-semibold">{o?.title}</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-lg font-normal break-words ">
                      {o?.notes}
                    </p>
                  </div>
                </div>
              </div>

            </>
          )
        }
        )
        }
      </div>
    </div>
  );
};

export default UserReportPartOne;
