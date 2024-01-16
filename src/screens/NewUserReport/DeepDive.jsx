
import { AiOutlineLike } from "react-icons/ai";
import { FaRegThumbsDown } from "react-icons/fa";

const DeepDive = (props) => {

  const { head, bgcolor, ques, candidateAns, sampleAns } = props;

  return (

    <>
    <div className="mx-6 my-6">
      <div className={`mb-8 ${bgcolor}`}>
        <h1 className={`text-4xl font-semibold text-purple p-8`}>{head} Questions Deep Dive</h1>
      </div>
      <div className={`mb-8 ${bgcolor}`}>
        <h1 className="text-xl font-semibold text-purple p-5">{ques}</h1>
      </div>
      <div className="lg:columns-2 sm:columns-1">
        <div className="p-6">
          <h3 className="text-lg font-semibold italic text-purple">Candidate's Answer:</h3>
          <p className="text-purple">{candidateAns}</p>
        </div>
        <div className="p-6 flex flex-col">
          <h3 className="text-lg font-semibold italic text-purple">Sample Answer for reference</h3>
          <p className="text-purple">{sampleAns}</p>
        </div>
      </div>
      <div insights className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold italic text-purple">Insights</h3>
        </div>
        <div className="lg:columns-2 sm:columns-1">
        <div className="mb-4">
          <h3 className="text-sm font-semibold italic text-darkgreen bg-lightgreen p-1 inline-flex mb-4"><AiOutlineLike color="green" className="m-0.5" />What you got right</h3>
          <p className="bg-lightgreen text-purple rounded-3xl p-4">Sam correctly defined ROl as the returns obtained after a particular
              investment</p>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold italic text-darkred bg-lightred p-1 inline-flex mb-4"><FaRegThumbsDown color="brown" className="m-1" />What you got wrong</h3>
          <p className="bg-lightred text-purple rounded-3xl p-4">Sam did not mention the specific calculation of ROl, which is
              typically expressed as a percentage.</p>
        </div>
        </div>
      </div>
      <div feedback className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold italic text-purple">Feedback for the Candidate:</h3>
        </div>
        <ol className="pl-4 text-purple">
          <li className="mb-1">
            1.Expand on the concept of ROl by mentioning that it is calculated
            by dividing the net profit from an investment by the initial
            investment amount.
          </li>
          <li className="mb-1">
            2.Provide examples of how ROl is used in budgeting, such as
            determining the profitability of different investment options
          </li>
          <li className="mb-1">
            3.Emphasize the importance of considering both the financial returns
            and the time frame when calculating ROl.
          </li>
          <li className="mb-1">
            4.Highlight the significance of ROl in decision-making processes, as
            it helps prioritize investments based on their potential returns.{" "}
          </li>
          <li className="mb-1">
            5.Encourage the candidate to research and understand different
            methods of calculating ROl, such as the payback period and
            discounted cash flow analysis.
          </li>
        </ol>
      </div>
    </div>
    </>
  );
};

export default DeepDive;
