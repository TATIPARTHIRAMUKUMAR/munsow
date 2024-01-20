
import mailIcon from "./../../assets/email.png";
import globeIcon from "./../../assets/globe.png";

const Extro = () => {
  return (
    <>
    <div className="mx-6 my-6">
    <div className="bg-img flex flex-col justify-center items-center text-center">
      <h1 className="text-xl lg:text-3xl font-bold mb-8 munsow-light-text text-center">MUNSOW TECHNOLOGIES Pvt Ltd</h1>
      <div className="text-xl p-4 text-center munsow-light-text">
        <a className="flex items-center gap-4" href=""><img src={mailIcon} height="42px" width="42px"></img>admin@munsow.com</a>
      </div>
      <div className="text-xl p-4 text-center munsow-light-text">
        <a className="flex items-center gap-4" href="https://www.munsow.com/" target="_blank"><img src={globeIcon} height="42px" width="42px"></img>www.munsow.com</a>
      </div>
    </div>
    </div>
    </>
  );
};

export default Extro;
