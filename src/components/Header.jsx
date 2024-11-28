import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Logo } from "../icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";

const Header = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    // if (!initialLoad) return;

    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
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

  return (
    <header>
      <div className="containe ma-w-[1312px] mx-auto flex justify-between text-white px-4 py-6">
        <Logo className="max-w-[90px] md:max-w-[148px]" />

        <div className={className}>
          <span className="mr-2 font-semibold">{user?.displayName}</span>
          <button className="px-3 py-2 bg-[#e50914] rounded cursor-pointer" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
