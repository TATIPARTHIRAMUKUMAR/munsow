import React from "react";
import card3 from '../../../assets/icons/card3.svg';
import student from '../../../assets/icons/student.png';
import teacher from '../../../assets/icons/teacher.png';
import users from '../../../assets/icons/users.svg';

// Define a function to generate background colors based on index
const getBackgroundColor = (index) => {
  switch (index) {
    case 0:
      // return "#FBD466";
      return "#FDE1E6";
    case 1:
      // return "#98D8E0";
      return "#FCF5DC";
    case 2:
      // return "#88CEA7";
      return "#DEFAE8";
    case 3:
      // return "#A791D4";
      return "#F5E8FF";
    default:
      return "#FBD466"; // Default color
  }
};
const getBackgroundColor2 = (index) => {
  switch (index) {
    case 0:
      return "#C8EBFF";
    case 1:
      // return "#98D8E0";
      return "#DEF3FF";
    default:
      return "#FBD466"; // Default color
  }
};


const NewCard = ({ cardLists = [], className = "" }) => {
  // return cardLists?.map((cardItem, index) => {
    // const { cardContent = "", cardValue = "",icon="",subValues={} } = cardItem;
    return (
        <>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="shadow-lg col-span-1 md:col-span-2 gap-5 grid grid-cols-1 md:grid-cols-2 p-5 rounded-xl" style={{backgroundColor:"#fff"}}>
          {cardLists.slice(2).map((card, index) => (
            <div className="rounded-xl p-2" style={{backgroundColor: getBackgroundColor(index)}} key={index}>
              <div className="flex justify-between">
                <div>
                  <h1 className="text-xl font-bold mb-1 ms-2">{card.cardValue}</h1>
                  <p className="text-md mb-4 ms-2 capitalize">{card.cardContent}</p>
                </div>
                <img src={card3} alt="icon" className="p-2" style={{height:"44px"}} />
              </div>
              {card.subValues?.active  ? <div className="grid grid-cols-2 col-span-2 gap-2" >
             <div className="text-green-500 bg-white p-1 flex items-center justify-center rounded-full" >
                {card.subValues?.active}
                <span className="text-[14px] font-normal ml-1">Active </span>
               </div>
               <div className="text-red-500 bg-white p-1 flex items-center justify-center rounded-full" >
                {card.subValues?.in_active}
                <span className="text-[14px] font-normal ml-1 " >In Active </span>

               </div>
            </div> :<></> }
            </div>
          ))}
          </div>
          <div className="shadow-lg grid md:grid-rows-2 gap-5 p-5 rounded-xl" style={{backgroundColor:"#fff"}}>
          {cardLists.slice(0, 2).map((card, index) => (
            
            <div className="rounded-xl p-2" style={{backgroundColor: getBackgroundColor2(index)}} key={index}>
              <div className="flex justify-between">
                <div>
                  <h1 className="text-xl font-bold mb-1 ms-2">{card.cardValue}</h1>
                  <p className="text-md mb-4 ms-2">{card.cardContent}</p>
                </div>
                {/* <div class="mb-3" style={{color:"black"}}>{card.icon}</div> */}
                {/* <img src={student} alt="icon" class="p-2" style={{height:"44px"}} /> */}
                {index === 0 ? (
                  <img src={student} alt="Student icon" className="p-2" style={{height:"44px"}} />
                ) : index === 1 ? (
                  <img src={teacher} alt="Teacher icon" className="p-2" style={{height:"44px"}} />
                ) : (
                  <img src={users} alt="Default user icon" className="p-2" style={{height:"44px"}} />
                )}
              </div>
              {card.subValues?.active  ? <div className="grid grid-cols-2 col-span-2 gap-2" >
             <div className="text-green-500 bg-white p-1 flex items-center justify-center rounded-full" >
                {card.subValues?.active}
                <span className="text-[14px] font-normal ml-1">Active </span>
               </div>
               <div className="text-red-500 bg-white p-1 flex items-center justify-center rounded-full" >
                {card.subValues?.in_active}
                <span className="text-[14px] font-normal ml-1 " >In Active </span>

               </div>
            </div> :<></> }
            </div>
            
          ))}
          </div>
        </div>
        </>
        // <div style={{background:"#99f6e4" }} className=" mb-3 p-4 rounded-xl shadow-md items-" key={index} >
        //   <div className="w-6 h-6 mb-7">
        //     {icon}
        //   </div>
        //   <div className="text-truncate text-black text-lg mb-2 ms-2 font-bold" title={cardContent}>
        //     {cardValue}
        //   </div>
        //   <div className="text-truncate text-black text-xl mb-4 ms-2 font-bold"> 
        //     {cardContent} 
        //   </div>
        //   {subValues?.active  ? <div className="grid grid-cols-2 col-span-2 gap-2" >
        //     <div className="text-green-500 bg-white p-1 flex items-center justify-center rounded-full" >
        //        {subValues?.active}
        //        <span className="text-[14px] font-normal ml-1">Active </span>
        //       </div>
        //       <div className="text-red-500 bg-white p-1 flex items-center justify-center rounded-full" >
        //        {subValues?.in_active}
        //        <span className="text-[14px] font-normal ml-1 " >In Active </span>

        //       </div>
        //     </div> :<></> }
        // </div>
    );
  // });
};

export default NewCard;