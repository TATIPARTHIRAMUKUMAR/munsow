import React from "react";

const CardContainer = ({ cardLists = [], className = "" }) => {
  return cardLists?.map((cardItem, index) => {
    const { cardContent = "", cardValue = "",icon="",subValues={} } = cardItem;
    return (
        <div style={{background:"linear-gradient(180.43deg, #A191C2 19.43%, #886CC0 87.63%)" }} className=" mb-3 p-4 rounded-lg shadow-md grid items-" key={index} >
          <div className="w-6 h-6 mb-3">
            {icon}
          </div>
          <div className="text-truncate text-white text-lg mt-6 font-bold" title={cardContent}>
            {cardContent}
          </div>
          <div className="text-truncate text-white text-xl mt-2 font-bold grid grid-cols-3 ">
            {cardValue}
            {subValues?.active  ? <div className="grid grid-cols-2 col-span-2 gap-2" >
            <div className="text-green-500 bg-white p-1 flex items-center justify-center rounded-full" >
               {subValues?.active}
               <span className="text-[14px] font-normal ml-1 " >Active </span>
              </div>
              <div className="text-red-500 bg-white p-1 flex items-center justify-center rounded-full" >
               {subValues?.in_active}
               <span className="text-[14px] font-normal ml-1 " >In Active </span>

              </div>
            </div> :<></> }
          </div>
        </div>
    );
  });
};

export default CardContainer;
