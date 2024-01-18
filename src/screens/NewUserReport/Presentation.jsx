// import React from "react";

// const Presentation = (props) => {

//   const { overallScore, eyeContact, posture, grooming, handGest, facialExpr, bgAndLight, audioQlty, devicePos } = props;

//   return (
    
//     <>
//       <div className="mx-6 my-6">
//         <div className="flex justify-around items-center pb-8 munsow-dark-bg">
//           <h1 className="md:ms-4 text-4xl font-semibold text-white">Presentation and Grooming</h1>
//           <div className="flex flex-col bg-white p-8 rounded-b-3xl">
//             <span className="flex text-4xl font-bold justify-center text-red">{overallScore}</span>
//             <span className="flex justify-center text-lg font-semibold text-purple">Overall Score</span>
//           </div>
//         </div>
//         <div className="lg:flex sm:block p-6 items-stretch">

//           <div className="p-4 lg:w-4/12 sm:w-full">
//             <h1 className="text-center text-4xl font-bold text-red">{eyeContact}/10</h1>
//             <h3 className="text-center text-lg font-semibold text-purple">Eye contact</h3>
//             <p className="text-purple">Arpitha could benefit from maintaining more consistent eye
//               contact, which can establish trust and foster a sense of
//               connection with the interviewer.</p>
//           </div>
//           <div className="p-4 lg:w-4/12 sm:w-full">
//             <h1 className="text-center text-4xl font-bold text-green">{posture}/10</h1>
//             <h3 className="text-center text-lg font-semibold text-purple">Posture</h3>
//             <p className="text-purple">While mostly upright and engaged, there were moments of slouching
//               which could indicate a lack of confidence or interest.</p>
//           </div>
//           <div className="p-4 lg:w-4/12 sm:w-full">
//             <h1 className="text-center text-4xl font-bold text-green">{grooming}/10</h1>
//             <h3 className="text-center text-lg font-semibold text-purple">Grooming</h3>
//             <p className="text-purple">Arpitha was well-dressed and professional, in line with Deloitte's
//               standards.</p>
//           </div>  
          
//         </div>

//         <div className="lg:flex sm:block p-6 items-stretch">

//           <div className="p-4 lg:w-4/12 sm:w-full">
//             <h1 className="text-center text-4xl font-bold text-red">{handGest}/10</h1>
//             <h3 className="text-center text-lg font-semibold text-purple">Hand Gestures</h3>
//             <p className="text-purple">Hand gestures can add value to verbal communication, but excessive
//               or nervous gesturing can be distracting. Arpitha should aim for
//               balanced and meaningful hand movements to underline key points.</p>
//           </div>
//           <div className="p-4 lg:w-4/12 sm:w-full">
//             <h1 className="text-center text-4xl font-bold text-green">{facialExpr}/10</h1>
//             <h3 className="text-center text-lg font-semibold text-purple">Facial Expressions</h3>
//             <p className="text-purple">Arpitha has a pleasant facial expression that indicates her
//               interest and engagement in the conversation. However she could
//               benefit from more expressive reactions to reflect understanding or
//               agreement with the interviewer.</p>
//           </div>
//           <div className="p-4 lg:w-4/12 sm:w-full">
//             <h1 className="text-center text-4xl font-bold text-green">{bgAndLight}/10</h1>
//             <h3 className="text-center text-lg font-semibold text-purple">Background and Lighting</h3>
//             <p className="text-purple">The background was clean and uncluttered, which is ideal for a
//               video interview. However, lighting could be improved. Frontal,
//               soft lighting will reduce shadows and make the candidate more
//               clearly visible.</p>
//           </div>  

//         </div>

//         <div className="lg:flex sm:block justify-center p-6 items-stretch">

//           <div className="p-4 lg:w-4/12 sm:w-full">
//             <h1 className="text-center text-4xl font-bold text-red">{audioQlty}/10</h1>
//             <h3 className="text-center text-lg font-semibold text-purple">Audio Quality</h3>
//             <p className="text-purple">The audio was clear and without significant background noise,
//               which is essential for effective communication during the
//               interview.</p>
//           </div>
//           <div className="p-4 lg:w-4/12 sm:w-full">
//             <h1 className="text-center text-4xl font-bold text-green">{devicePos}/10</h1>
//             <h3 className="text-center text-lg font-semibold text-purple">Device Position</h3>
//             <p className="text-purple">The device from which Arpitha was conducting the interview was
//               placed at a proper angle, allowing a clear view of her face and
//               upper body. This is critical for non-verbal communication.</p>
//           </div>

//         </div>

//       </div>
//     </>
//   );
// };

// export default Presentation;



const UserReportPartOne = ({ userData,overallScore }) => {

  function getScoreClass(secured, total) {
    const scorePercentage = (secured / total) * 100;
    if (scorePercentage <= 33) return 'text-red-600';  
    if (scorePercentage <= 66) return 'text-orange-500';
    return 'text-green-600'; 
  }

  return (
    <div className="mt-5 page" id="page2">
       <div className="flex justify-around items-center pb-8 munsow-dark-bg">
          <h1 className="md:ms-4 text-4xl font-semibold text-white">Presentation and Grooming</h1>
           <div className="flex flex-col bg-white p-8 rounded-b-3xl">
           <span className="flex text-4xl font-bold justify-center text-red">{overallScore}</span>
            <span className="flex justify-center text-lg font-semibold text-purple">Overall Score</span>
           </div>
         </div>
      {/* <div className="bg-white">
        <div className="py-1 bg-[#b49fd8]">
          <div className="flex justify-end items-center report2-top-container">
            <span className="me-3 report2-btn-container">
              <span className="text-2xl font-normal report2-btn">Part One</span>
            </span>
          </div>
        </div>
      </div> */}
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
