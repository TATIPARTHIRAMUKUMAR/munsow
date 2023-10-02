import React from "react";
import videoSrc from "../../assets/caption.mp4"
import person1 from "../../assets/download.jpeg"
export default function NewGridLayout() {
  return <div className="p-5 grid grid-cols-5 gap-3 h-full" >
    <div className=" col-span-4" >
        <video src={videoSrc}  autoPlay controls></video>
    </div>
    {/* <div className=" col-span-1 grid gap-3 overflow-y-auto" >
    {
        [1,1,1,1,1,1]?.map((_,i)=>(
        <div key={i} className="bg-blue-500 rounded-xl min-h-[150px]" style={{background:`url(${person1})`,backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat"}} > </div> 
        ))
    }
    </div> */}
  </div>;
}