import { Logo } from "../icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-t-[#333] text-white font-netflix">
      <div className="containe max-wl-[1312px] mx-auto px-4 py-8 ">
        <div className=" flex flex-col md:flex-row justify-between md:items-center mb-6">
          <Logo className="max-w-[90px] md:max-w-[148px] mb-6 md:mb-0" />

          <div className="list flex flex-col md:flex-row gap-2 md:gap-4 font-medium text-lg">
            <Link to="/browse">Browse Page</Link>
            <Link to="/movie">Movie Recommendation</Link>
          </div>
        </div>
        <div className="text-left md:text-center  text-base">This Website is a clone of Netflix which was developed by <span className="font-medium">Singh Aditya</span> for practise purpose.</div>
      </div>
    </footer>
  );
};

export default Footer;
