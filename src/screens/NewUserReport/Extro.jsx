
import mailIcon from "./../../assets/email.png";
import globeIcon from "./../../assets/globe.png";

const Extro = () => {
  return (
    <>
      <div className="mx-3 my-4 h-[1050px]">
        <div className="bg-img flex flex-col justify-center items-center text-center">
          <h1 className="text-xl lg:text-3xl font-bold mb-8 munsow-light-text text-center">MUNSOW TECHNOLOGIES Pvt Ltd</h1>
          <div className="text-xl max-[375px]:p-2 p-4 text-center munsow-light-text">
            <a className="text-center max-[375px]:text-base text-xl flex items-center max-[375px]:gap-2 gap-4" href=""><img src={mailIcon} height="42px" width="42px"></img>admin@munsow.com</a>
          </div>
          <div className="text-xl max-[375px]:p-2 p-4 text-center munsow-light-text">
            <a className="text-center max-[375px]:text-base text-xl flex items-center max-[375px]:gap-2 gap-4" href="https://www.munsow.com/" target="_blank"><img src={globeIcon} height="42px" width="42px"></img>www.munsow.com</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Extro;
