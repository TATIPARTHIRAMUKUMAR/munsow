import React from "react";
import mailIcon from "./../../assets/Images/mailicon.jpg";
// import globe from "./../../assets/Images/globe.png";

const Extro = () => {
  return (
    <div className="container mt-60">
      <div className="extro   ">
        <h2 className="extro-h2">MUNSOW TECHNOLOGIES Pvt Ltd</h2>
        <div className="extro-a d-flex align-items-center mt-3">
          {/* <img className="logo me-2" src={mailIcon} alt="mail" width={"30px"} /> */}
          <a href="mailto:admin@munsow.com" className="text-decoration-none">
            admin@munsow.com
          </a>
        </div>
        <div className="extro-a d-flex align-items-center mt-3">
          {/* <img className="logo me-2" src={globe} alt="globe" width={"30px"} /> */}
          <a href="http://www.munsow.com" className="text-decoration-none">
            www.munsow.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Extro;
