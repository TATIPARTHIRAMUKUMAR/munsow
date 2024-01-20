

const CuratedSummary = (props) => {

  const {report_type, skillSuggestions} = props;

  return (
    
    <>
    <div className="mx-3 my-3 md:mx-6 md:my-6 bg-grey">
      {report_type === "skill based report" && (
        <>
          <div className="px-4 py-6 md:px-8 md:py-10">
            <h3 className="text-2xl font-semibold text-purple">Skill Based Curated Summary</h3>
          </div>
          <div className="p-4 md:p-8">             
            {Object.keys(skillSuggestions).map((skill, index) => (
              <div key={index} className="mb-4">
                <h4 className="p-4 text-xl font-semibold text-purple mb-4 munsow-dark-bg text-white">{skill}</h4>
                <ol className="pl-4 text-purple">
                  {skillSuggestions[skill].map((suggestion, subIndex) => (
                    <li key={subIndex} className="mb-1">
                      {suggestion}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </>
      )}
      
      {report_type === "role based report" && (
        <>
          <div className="px-4 py-6 md:px-8 md:py-10">
            <h3 className="text-2xl font-semibold text-purple">Company and Role Based Curated Summary</h3>
          </div>
          {/* update and change below loop based on role based data props */}
          <div className="p-4 md:p-8">             
            {Object.keys(skillSuggestions).map((skill, index) => (
              <div key={index} className="mb-4">
                <h4 className="p-4 text-xl font-semibold text-purple mb-4 munsow-dark-bg text-white">{skill}</h4>
                <ol className="pl-4 text-purple">
                  {skillSuggestions[skill].map((suggestion, subIndex) => (
                    <li key={subIndex} className="mb-1">
                      {suggestion}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </>
      )}


    </div>  
    </>
  );
};

export default CuratedSummary;
