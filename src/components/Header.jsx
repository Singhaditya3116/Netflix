import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Logo } from "../icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import useIsMobile from "../hooks/useIsMobile";
import { Hamburger, Cross } from "../icons";

const Header = ({ className = "" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = useSelector((store) => store.user);

  useEffect(() => {
    // if (!initialLoad) return;

    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        if (window.location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // setInitialLoad(false);

    return () => {
      unSubscribe();
    };
  }, []);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <header>
      <div className="containe max-wl-[1312px] mx-auto flex justify-between font-netflix text-white px-4 py-4 md:py-6">
        <Logo className="max-w-[90px] md:max-w-[148px] shrink-0" />

        <div className={`${className} ${isMobile ? "hidden" : "block"}`}>
          <Link to="/movie" className="px-3 py-2 bg-[#e50914] font-medium rounded cursor-pointer">
            Try Recommendation
          </Link>
          <span className="mx-4 font-semibold">{user?.displayName}</span>
          <button className="px-3 py-2 bg-[#e50914] font-medium rounded cursor-pointer" onClick={logoutHandler}>
            Logout
          </button>
        </div>

        <div className={`cursor-pointer ${isMobile ? "block" : "hidden"}`} onClick={toggleMobileMenu}>
          <Hamburger />
        </div>

        <div className={`mobile-menu fixed top-0 left-0 w-full h-full z-50 bg-black ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="header flex justify-between items-center px-4 py-4">
            <Logo className="max-w-[90px] shrink-0" />
            <div className="icon w-6 h-6 cursor-pointer" onClick={toggleMobileMenu}>
              <Cross />
            </div>
          </div>
          <div className="items h-[calc(100%-64px)] flex flex-col justify-between">
            <Link to="/movie" className="px-3 py-2  border-y border-[#e50914] font-medium  cursor-pointer">
              Try Recommendation
            </Link>
            <div className="flex justify-between items-center px-4 bottom mb-4">
              <span className="mx-4 font-semibold">{user?.displayName}</span>
              <button className="px-3 py-2 bg-[#e50914] font-medium rounded cursor-pointer" onClick={logoutHandler}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
