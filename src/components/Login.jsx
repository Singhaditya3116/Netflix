import { useRef } from "react";
import { Logo } from "../icons/index";

const Login = () => {

	const emailRef = useRef();
	const paswordRef = useRef();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		console.log("email Ref :", emailRef.current.value);
		console.log("pass Ref :", paswordRef.current.value);

		// Validate data and then change Routing
		const validateData = () => {

		}

		if (validateData() === null) {

		} else {
			// Error
		}

	}

	return (
		<div className="main flex flex-col justify-between min-h-full">
			<div className="main-inner-wrap flex-1">
				<header>
					<div className="containe max-w-[1312px] mx-auto px-4 py-6">
						<Logo className="max-w-[90px] md:max-w-[148px]" />
					</div>
				</header>
				<main>
					<div className="containe max-w-[482px] mx-auto px-4">
						<div className="py-12 px-8 md:px-[68px] text-white bg-[rgba(0,0,0,0.7)] rounded">
							<form>
								<div className="form-content flex flex-col">
									<h2 className="text-3xl mb-7">Sign In</h2>
									<input ref={emailRef} placeholder="Email or Mobile Number" className="mb-3 py-3 px-4 bg-transparent border border-[##808080b3] rounded" />
									<input ref={paswordRef} placeholder="Password" className="mb-3 py-3 px-4 bg-transparent border border-[##808080b3] rounded" />
									<button className="py-[6px] px-4 bg-[#e50914] rounded-md" onClick={handleFormSubmit}>Sign in</button>
								</div>
							</form>
						</div>
					</div>
				</main>
			</div>
			<footer>Footer</footer>
		</div>
	);
};

export default Login;
