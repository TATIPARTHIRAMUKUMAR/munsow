

const SummarySnapshot = () => {
  // const completionPercentage = 50;
  
  return (

    <>
      <div className="py-10 mx-6 my-6 bg-grey">
        <h1 className="mx-8 font-bold text-2xl">Summary Snapshot</h1>
        <div className="mx-8 my-12 rounded-3xl py-6 bg-white flex justify-around ">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red mb-4">2/10</h1>
            <h3 className="font-bold text-purple">Overall Readiness Score</h3>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green mb-4">9/10</h1>
            <h3 className="font-bold text-purple">Presentation and Grooming</h3>
          </div>
        </div>
        <div className="munsow-dark-bg text-white py-1">
          <h2 className="text-center font-bold">Munsow Interview Classification Highlights</h2>
        </div>
        <div className="mx-8 my-8 rounded-3xl py-6 bg-purple">
          <div className="flex mb-8 justify-around items-center">
            <div>
              <h1 className="text-xl font-bold text-purple">Behavioural Analysis</h1>
            </div>
            <div className="rounded-full bg-white w-48 p-4">
              <div class="relative pt-1"> 
                <div class="flex mb-2 items-center justify-start">
                  <div class="w-full bg-gray-300 rounded-full">
                    <div style={{width: "50%"}} class="text-center text-xs text-white bg-rose-500 rounded-full">&nbsp;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-around">
            <div className="">
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-red font-bold">2/10</h1><p className="text-purple font-bold underline">Resilience</p></span>
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-green font-bold">9/10</h1><p className="text-purple font-bold underline">Adaptability</p></span>
            </div>
            <div className="">
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-orange font-bold">7/10</h1><p className="text-purple font-bold underline">Teamwork</p></span>
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-red font-bold">5/10</h1><p className="text-purple font-bold underline">Initiative</p></span>
            </div>
          </div>
        </div>

        <div className="mx-8 my-8 rounded-3xl py-6 bg-green">
          <div className="flex mb-8 justify-around items-center">
            <div>
              <h1 className="text-xl font-bold text-purple">Technical Knowledge</h1>
            </div>
            <div className="rounded-full bg-white w-48 p-4">            
              <div class="relative pt-1"> 
                <div class="flex mb-2 items-center justify-start">
                  <div class="w-full bg-gray-300 rounded-full">
                    <div style={{width: "50%"}} class=" text-center text-xs text-white bg-rose-500 rounded-full">&nbsp;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-around">
            <div className="">
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-red font-bold">2/10</h1><p className="text-purple font-bold underline">Technical Skills</p></span>
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-green font-bold">9/10</h1><p className="text-purple font-bold underline">Leadership Skills</p></span>
            </div>
            <div className="">
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-orange font-bold">7/10</h1><p className="text-purple font-bold underline">Communication Skills</p></span>
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-red font-bold">5/10</h1><p className="text-purple font-bold underline">Initiative</p></span>
            </div>
          </div>
        </div>

        <div className="mx-8 my-8 rounded-3xl py-6 bg-orange">
          <div className="flex mb-8 justify-around items-center">
            <div>
              <h1 className="text-xl font-bold text-purple">Practical Thinking</h1>
            </div>
            <div className="rounded-full bg-white w-48 p-4">
              <div class="relative pt-1"> 
                <div class="flex mb-2 items-center justify-start">
                  <div class="w-full bg-gray-300 rounded-full">
                    <div style={{width: "50%"}} class=" text-center text-xs text-white bg-rose-500 rounded-full">&nbsp;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-around">
            <div className="">
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-red font-bold">2/10</h1><p className="text-purple font-bold underline">Problem Solving</p></span>
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-green font-bold">9/10</h1><p className="text-purple font-bold underline">Initiative</p></span>
            </div>
            <div className="">
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-orange font-bold">7/10</h1><p className="text-purple font-bold underline">Decision Making</p></span>
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-red font-bold">5/10</h1><p className="text-purple font-bold underline">Project Management</p></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummarySnapshot;
