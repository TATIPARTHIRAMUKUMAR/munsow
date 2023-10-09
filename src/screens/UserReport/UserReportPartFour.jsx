import { useEffect, useState } from "react";

const UserReportPartFour = ({ userData }) => {

  const [data, setData] = useState({});

  useEffect(() => {
    const filteredData = userData?.data.filter(o => o.main_title === "Equipped Mastery");
    if (filteredData?.length > 0) {
      setData(filteredData[0]);
    }
    console.log("data", data, filteredData)
  }, [userData])

  function getScoreClass(secured, total) {
    const scorePercentage = (secured / total) * 100;
    if (scorePercentage <= 33) return 'text-red-600';
    if (scorePercentage <= 66) return 'text-orange-500';
    return 'text-green-600';
  }

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
                    {data?.secured_marks}/{data?.total_marks}
                  </span>
                </div>
                <div>
                  <span className="md:text-2xl md:font-semibold report3-mindset text">
                    {data?.title}
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-8/12 p-4 md:mt-4">
              <div>
                <span className="md:text-2xl md:font-semibold report3-growth text">
                  {data?.main_title}
                </span>
              </div>
              <div>
                <p className="md:text-lg md:font-medium text-break text" style={{ lineHeight: 2.2 }}>
                  {data?.notes}                </p>
              </div>
            </div>
          </div>
          <div className="md:flex md:flex-wrap">

            {data?.sub_segements?.map((o, index) => {
              return (
                <>

                  <div className="md:w-6/12 p-4 md:mt-4">
                    <div>
                      <span className={`md:text-xl md:font-semibold ${getScoreClass(o?.secured_marks, o?.total_marks)}`}>{o?.secured_marks}/{o?.total_marks}</span>
                      <span className="md:text-2xl md:font-semibold md:ms-2 underline text">
                        {o?.title}
                      </span>
                    </div>
                    <div style={{ marginLeft: "60px" }}>
                      <p className="md:text-lg md:font-semibold text-break text mt-2" style={{ lineHeight: 1.8 }}>
                        {o.notes}
                      </p>
                    </div>
                  </div>
                </>



              )
            }
            )
            }


          </div>


          {data?.interview_questions?.map((o, index) => {
            return (
              <>
              < div className="bg-gray-100 m-5">
                <div >
                  <div >
                    <div className=" p-2 bg-[#7a5fa7] m-5">
                      <span className="text-white md:text-2xl md:font-bold  w-full">
                        {o.question}                      </span>
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
                        {o.answer}                       </p>
                    </div>
                    <div className="mt-4">
                      <span className="md:text-2xl md:font-semibold text" style={{ lineHeight: 1.8, fontStyle: "italic" }}>
                        Insights
                      </span>
                      <p className="md:text-lg md:font-medium text-break text" style={{ lineHeight: 1.8, fontStyle: "italic" }}>
                        {o.Insights}                       </p>
                    </div>
                  </div>
                  <div className="md:w-6/12 p-4">
                    <span className="md:text-2xl md:font-semibold text" style={{ lineHeight: 1.8, fontStyle: "italic" }}>
                      Curated Answer
                    </span>
                    <p className="md:text-lg md:font-medium text-break text" style={{ lineHeight: 1.8, fontStyle: "italic" }}>
                      {o.suggested_answer}                     </p>
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


    </div>
  );
};

export default UserReportPartFour;
