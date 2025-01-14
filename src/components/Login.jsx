import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";

const Login = () => {
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [emailValue, setEmailValue] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [passValue, setPassValue] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSignIn, setIsSignIn] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate data and then change Routings
    const validateData = () => {
      const isNameValid = name.length > 0 ? true : false;
      const isEmailValid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailValue);
      const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(passValue);

      if (!isSignIn && !isNameValid) {
        setIsNameValid(false);
        return false;
      }else{
        setIsNameValid(true);
      }

      if (!isEmailValid) {
        setIsEmailValid(false);
        return false;
      }else{
        setIsEmailValid(true);
      }

      if (!isPasswordValid) {
        setIsPasswordValid(false);
        return false;
      }else{
        setIsPasswordValid(true);
      }

      return true;
    };

    if (!validateData()) return null;

    if (isSignIn) {
      // Sign In Logic

      signInWithEmailAndPassword(auth, emailValue, passValue)
        .then((userCredential) => {})
        .catch((error) => {
          console.error(error);
          if (error.code === "auth/invalid-credential") {
            setErrorMessage("Invalid Credentials");
          }
        });
    } else {
      //Sign Up logic
      createUserWithEmailAndPassword(auth, emailValue, passValue)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {
              const { uid, displayName, email } = auth.currentUser;

              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage("Something went wrong");
        });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassValue(e.target.value);
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setIsNameValid(true);
    setIsEmailValid(true);
    setIsPasswordValid(true);
    setErrorMessage(null);
  };

  return (
    <div className="main flex flex-col justify-between min-h-full">
      <div className="main-inner-wrap flex-1">
        <Header className="hidden" />
        <main>
          <div className="container max-w-full md:max-w-[482px] mx-auto px-4">
            <div className="py-6 px-4 mt-6 md:mt-0 md:px-[68px] font-netflix text-white bg-[rgba(0,0,0,0.7)] rounded">
              <form>
                <div className="form-content flex flex-col">
                  <h2 className="font-medium text-2xl md:text-3xl mb-4 md:mb-6">{isSignIn ? "Sign In" : "Sign Up"}</h2>
                  {!isSignIn && (
                    <>
                      <input placeholder="Name" className="mb-2 py-3 px-4 bg-transparent border border-[##808080b3] rounded" value={name} onChange={handleNameChange} />
                      {!isNameValid && <p className="mb-3 text-red-500">Name is Invalid</p>}
                    </>
                  )}
                  <input placeholder="Email Id" className="mb-2 py-3 px-4 bg-transparent border border-[##808080b3] rounded" value={emailValue} onChange={handleEmailChange} />
                  {!isEmailValid && <p className="mb-3 text-red-500">Email Id is Invalid</p>}
                  <input placeholder="Password" className="mb-2 py-3 px-4 bg-transparent border border-[##808080b3] rounded" value={passValue} onChange={handlePassChange} />
                  {!isPasswordValid && <p className="mb-3 text-red-500">Password is Invalid</p>}
                  {errorMessage && <p className="mb-3 text-red-500">{errorMessage}</p>}
                  <button className="py-[6px] px-4 bg-[#e50914] rounded-md" onClick={handleFormSubmit}>
                    {isSignIn ? "Sign In" : "Sign Up"}
                  </button>
                </div>
              </form>

              <p className="mt-4 cursor-pointer" onClick={toggleForm}>
                {isSignIn ? "New to Netflix? Sign Up Now" : "Already a User? Sign In Now"}
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
