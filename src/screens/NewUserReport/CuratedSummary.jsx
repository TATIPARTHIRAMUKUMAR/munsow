const CuratedSummary = (props) => {

    const {interview_type, skillSuggestions, report_data} = props;
  
    return (
  
      <>
      <div className="mx-3 my-3 md:mx-6 md:my-6 bg-grey">
  
        {interview_type === "skill_interview" && (
          <>
            <div className="px-4 py-6 md:px-8 md:py-8">
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
  
        {interview_type === "company_role_interview" && (
          <>
            <div className="px-4 py-6 md:px-8 md:py-8">
              <h3 className="text-2xl font-semibold text-purple">Company and Role Based Curated Summary</h3>
            </div>
  
            <div className="p-4 md:p-8">             
  
              {report_data?.about_company && report_data?.about_company.length > 0 && (
                <div className="mb-4">
                  <h4 className="p-4 text-xl font-semibold text-purple mb-4 munsow-dark-bg text-white">About Company</h4>
                  <ol className="pl-4 text-purple">
                    {report_data?.about_company.map((suggestion, Index) => (
                      suggestion && (<li key={Index} className="mb-1 list-disc">
                        {suggestion}
                      </li>)
                    ))}
                  </ol>
                </div>
              )}
  
              {report_data?.industry_trends && report_data?.industry_trends.length > 0 && (
                <div className="mb-4">
                  <h4 className="p-4 text-xl font-semibold text-purple mb-4 munsow-dark-bg text-white">Industry Trends</h4>
                  <ol className="pl-4 text-purple">
                    {report_data?.industry_trends.map((suggestion, Index) => (
                      suggestion && (<li key={Index} className="mb-1 list-disc">
                        {suggestion}
                      </li>)
                    ))}
                  </ol>
                </div>
              )}
  
              {report_data?.lastest_company_news && report_data?.lastest_company_news.length > 0 && (
                <div className="mb-4">
                  <h4 className="p-4 text-xl font-semibold text-purple mb-4 munsow-dark-bg text-white">Latest Company News</h4>
                  <ol className="pl-4 text-purple">
                    {report_data?.lastest_company_news.map((suggestion, Index) => (
                      suggestion && (<li key={Index} className="mb-1 list-disc">
                        {suggestion}
                      </li>)
                    ))}
                  </ol>
                </div>
              )}
  
              {report_data?.role_specific_skills && report_data?.role_specific_skills.length > 0 && (
                <div className="mb-4">
                  <h4 className="p-4 text-xl font-semibold text-purple mb-4 munsow-dark-bg text-white">Role Specific Skills</h4>
                  <ol className="pl-4 text-purple">
                    {report_data?.role_specific_skills?.map((suggestion, Index) => (
                      suggestion && (<li key={Index} className="mb-1 list-disc">
                        {suggestion}
                      </li>)
                    ))}
                  </ol>
                </div>
              )}
  
            </div>
          </>
        )}
  
  
      </div>  
      </>
    );
  };
  
  export default CuratedSummary;