const UserReportPartOne = () => {
  return (
    <div className="mt-5 page" id="page2">
    <div className="bg-white">
      <div className="py-5 bg-[#b49fd8]">
        <div className="flex justify-end items-center report2-top-container">
          <span className="me-3 report2-btn-container">
            <span className="text-2xl font-normal report2-btn">Part One</span>
          </span>
        </div>
      </div>
    </div>
    <div className="bg-white">
      <div className="p-3">
        <span className="text-3xl font-semibold">
          1. Behavioral Presentation and Grooming
        </span>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-10 bg-white px-14 pb-10">
      {/* <div className=""> */}
      {/* First Row */}
      <div className="col-span-1"><div className="mt-2">
        <div>
          <span className="text-5xl font-bold text-red-600">3/10</span>
        </div>
        <div className="mt-1">
          <span className="text-xl font-semibold">Eye contact</span>
        </div>
        <div className="mt-3">
          <p className="text-base font-normal break-words report2-text">
            Arpitha could benefit from maintaining more consistent eye contact, which can establish trust and foster a sense of connection with the interviewer.
          </p>
        </div>
      </div></div>



      <div className="col-span-1"><div className="mt-2">
        <div>
          <span className="text-5xl font-bold text-green-600">8/10</span>
        </div>
        <div className="mt-1">
          <span className="text-xl font-semibold">Posture</span>
        </div>
        <div className="mt-3">
          <p className="text-base font-normal break-words report2-text">
            While mostly upright and
            engaged, there were
            moments of slouching which
            could indicate a lack of
            confidence or interest                </p>
        </div>
      </div></div>


      <div className="col-span-1"><div className="mt-2">
        <div>
          <span className="text-5xl font-bold text-green-600">7/10</span>
        </div>
        <div className="mt-1">
          <span className="text-xl font-semibold">Grooming</span>
        </div>
        <div className="mt-3">
          <p className="text-base font-normal break-words report2-text">
            Arpitha was well-dressed and
            professional, in line with
            Deloitte's standards.                </p>
        </div>
      </div></div>

      {/* Second Row */}
      <div className="col-span-1"><div className="mt-2">
        <div>
          <span className="text-5xl font-bold text-red-600">4/10</span>
        </div>
        <div className="mt-1">
          <span className="text-xl font-semibold">Hand Gestures</span>
        </div>
        <div className="mt-3">
          <p className="text-base font-normal break-words report2-text">
            Hand gestures can add value
            to verbal communication, but
            excessive or nervous
            gesturing can be distracting.
            Arpitha should aim for
            balanced and meaningful
            hand movements to underline
            key points.                </p>
        </div>
      </div></div>
      <div className="col-span-1"><div className="mt-2">
        <div>
          <span className="text-5xl font-bold text-green-600">8/10</span>
        </div>
        <div className="mt-1">
          <span className="text-xl font-semibold">Facial Expressions</span>
        </div>
        <div className="mt-3">
          <p className="text-base font-normal break-words report2-text">
            Arpitha has a pleasant facial
            expression that indicates her
            interest and engagement in
            the conversation. However,
            she could benefit from more
            expressive reactions to reflect
            understanding or agreement
            with the interviewer.                </p>
        </div>
      </div></div>
      <div className="col-span-1"><div className="mt-2">
        <div>
          <span className="text-5xl font-bold text-orange-600">6/10</span>
        </div>
        <div className="mt-1">
          <span className="text-xl font-semibold">Background and Lighting</span>
        </div>
        <div className="mt-3">
          <p className="text-base font-normal break-words report2-text">
            The background was clean
            and uncluttered, which is ideal
            for a video interview. However,
            the lighting could be
            improved. Frontal, soft lighting
            will reduce shadows and make
            the candidate more clearly
            visible.                </p>
        </div>
      </div></div>

      {/* Third Row */}
      <div className="col-span-1"><div className="mt-2">
        <div>
          <span className="text-5xl font-bold text-green-600">9/10</span>
        </div>
        <div className="mt-1">
          <span className="text-xl font-semibold">Audio Quality</span>
        </div>
        <div className="mt-3">
          <p className="text-base font-normal break-words report2-text">
            The audio was clear and
            without significant
            background noise, which is
            essential for effective
            communication during the
            interview.                </p>
        </div>
      </div></div>
      <div className="col-span-1"><div className="mt-2">
        <div>
          <span className="text-5xl font-bold text-green-600">10/10</span>
        </div>
        <div className="mt-1">
          <span className="text-xl font-semibold">Device Position</span>
        </div>
        <div className="mt-3">
          <p className="text-base font-normal break-words report2-text">
            The device from which Arpitha was
            conducting the interview was placed
            at a proper angle, allowing a clear
            view of her face and upper body.
            This is critical for non-verbal
            communication                </p>
        </div>
      </div></div>
      {/* </div> */}

    </div>



    {/* ... (repeat similar structure for other sections) */}
  </div>
  );
};

export default UserReportPartOne;
