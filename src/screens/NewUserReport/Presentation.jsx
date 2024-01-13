import React from "react";

const Presentation = (props) => {

  const { head, score, bgcolor, scoreclr } = props;

  return (
    
    <>
      <div className="mx-6 my-6">
        <div className="flex justify-around items-center pb-8 munsow-dark-bg">
          <h1 className="md:ms-4 text-4xl font-semibold text-white">{head}</h1>
          <div className="flex flex-col bg-white p-8 rounded-b-3xl">
            <span className={`flex text-4xl font-bold justify-center ${scoreclr}`}>{score}</span>
            <span className="flex justify-center text-lg font-semibold text-purple">Overall Score</span>
          </div>
        </div>
        <div className="lg:flex sm:block p-6 items-stretch">

          <div className="p-4 lg:w-4/12 sm:w-full">
            <h1 className="text-center text-4xl font-bold text-red">3/10</h1>
            <h3 className="text-center text-lg font-semibold text-purple">Eye contact</h3>
            <p className="text-purple">Arpitha could benefit from maintaining more consistent eye
              contact, which can establish trust and foster a sense of
              connection with the interviewer.</p>
          </div>
          <div className="p-4 lg:w-4/12 sm:w-full">
            <h1 className="text-center text-4xl font-bold text-green">8/10</h1>
            <h3 className="text-center text-lg font-semibold text-purple">Posture</h3>
            <p className="text-purple">While mostly upright and engaged, there were moments of slouching
              which could indicate a lack of confidence or interest.</p>
          </div>
          <div className="p-4 lg:w-4/12 sm:w-full">
            <h1 className="text-center text-4xl font-bold text-green">6/10</h1>
            <h3 className="text-center text-lg font-semibold text-purple">Grooming</h3>
            <p className="text-purple">Arpitha was well-dressed and professional, in line with Deloitte's
              standards.</p>
          </div>  
          
        </div>

        <div className="lg:flex sm:block p-6 items-stretch">

          <div className="p-4 lg:w-4/12 sm:w-full">
            <h1 className="text-center text-4xl font-bold text-red">2/10</h1>
            <h3 className="text-center text-lg font-semibold text-purple">Hand Gestures</h3>
            <p className="text-purple">Hand gestures can add value to verbal communication, but excessive
              or nervous gesturing can be distracting. Arpitha should aim for
              balanced and meaningful hand movements to underline key points.</p>
          </div>
          <div className="p-4 lg:w-4/12 sm:w-full">
            <h1 className="text-center text-4xl font-bold text-green">8/10</h1>
            <h3 className="text-center text-lg font-semibold text-purple">Facial Expressions</h3>
            <p className="text-purple">Arpitha has a pleasant facial expression that indicates her
              interest and engagement in the conversation. However she could
              benefit from more expressive reactions to reflect understanding or
              agreement with the interviewer.</p>
          </div>
          <div className="p-4 lg:w-4/12 sm:w-full">
            <h1 className="text-center text-4xl font-bold text-green">6/10</h1>
            <h3 className="text-center text-lg font-semibold text-purple">Background and Lighting</h3>
            <p className="text-purple">The background was clean and uncluttered, which is ideal for a
              video interview. However, lighting could be improved. Frontal,
              soft lighting will reduce shadows and make the candidate more
              clearly visible.</p>
          </div>  

        </div>

        <div className="lg:flex sm:block justify-center p-6 items-stretch">

          <div className="p-4 lg:w-4/12 sm:w-full">
            <h1 className="text-center text-4xl font-bold text-red">9/10</h1>
            <h3 className="text-center text-lg font-semibold text-purple">Audio Quality</h3>
            <p className="text-purple">The audio was clear and without significant background noise,
              which is essential for effective communication during the
              interview.</p>
          </div>
          <div className="p-4 lg:w-4/12 sm:w-full">
            <h1 className="text-center text-4xl font-bold text-green">10/10</h1>
            <h3 className="text-center text-lg font-semibold text-purple">Device Position</h3>
            <p className="text-purple">The device from which Arpitha was conducting the interview was
              placed at a proper angle, allowing a clear view of her face and
              upper body. This is critical for non-verbal communication.</p>
          </div>

        </div>

      </div>
    </>
  );
};

export default Presentation;
