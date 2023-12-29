// import { useEffect, useState } from "react";
import ReportOverview from "./ReportOverview";

const MainReportOverview = () => {

    return (
        <>
        <ReportOverview
            head="Behavioural Analysis"
            score="8/10"
            bgcolor="bg-purple" 
            scoreclr="text-green"
            />
        <ReportOverview
            head="Technical Knowledge"
            score="6/10"
            bgcolor="bg-green"
            scoreclr="text-orange"
            />
        <ReportOverview
            head="Practical Thinking"
            score="3/10"
            bgcolor="bg-orange" 
            scoreclr="text-red"
            />
        </>
    );
  };
  
export default MainReportOverview;