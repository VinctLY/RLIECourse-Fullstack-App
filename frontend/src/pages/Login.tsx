import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

import { signIn } from "../utils/firebaseAuth";

import useInput from "../hooks/useInput";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import AuthInput from "../components/AuthInput";
import ShowPassword from "../components/ShowPassword";

const Login = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useInput("");
	const [password, setPassword] = useInput("");

	const [showPassword, setShowPassword] = useState(false);

	const buttonSubmitRef = useRef<HTMLButtonElement>(null);

	const isFormSubmittable = () => isEmail(email) && password;
	const [error, setError] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (buttonSubmitRef.current && !isFormSubmittable())
			return (buttonSubmitRef.current.disabled = true);

		try {
			const userCred = await signIn(email, password);

			navigate("/");
		} catch (error: any) {
			setError(true);
			setEmail(email);
			setPassword("");
		}
	};

	return (
		<div className="flex h-screen justify-center items-center">
			<form
				className="items-center m-4 flex h-fit w-[clamp(300px,100%,500px)] max-h-screen flex-col gap-16 rounded-lg border-t-8 border-t-primary-100 p-8 shadow-xl"
				onSubmit={handleSubmit}>
				<div className="grid w-full gap-1">
					<div className="flex items-center gap-3 text-2xl text-dark">
						<h1 className="text-2xl">Sign In</h1>
						<FontAwesomeIcon icon={faUser} />
					</div>
					<span className="text-dark-50">Login into your account</span>
				</div>
				<div className="flex w-full flex-col gap-8">
					<AuthInput
						value={email}
						onChange={setEmail}
						label="email"
						type="email"
						placeholder="Enter your email.."
					/>
					<AuthInput
						value={password}
						onChange={setPassword}
						label="password"
						type={showPassword ? "text" : "password"}
						placeholder="Your password">
						<div className="absolute right-3 top-[35px] translate-y-1/2 grid justify-center items-center size-6 show_password-bubble">
							<ShowPassword show={showPassword} setShow={setShowPassword} />
						</div>
					</AuthInput>
				</div>
				<div className="flex w-full flex-col gap-[0.5em]">
					<p className="w-fit self-end">
						Don't an account yet? Click here to{" "}
						<Link to="/register" className="text-primary-100 underline underline-offset-2">
							Sign Up
						</Link>
					</p>
					<button
						type="submit"
						className="w-full rounded-sm bg-primary-100 py-3 font-medium text-white shadow-md active:bg-primary-75 disabled:bg-primary-75"
						disabled={!isFormSubmittable()}
						ref={buttonSubmitRef}>
						Login
					</button>
					{error && (
						<p className="text-red-600">
							Login failed, please check your email/password field and try again!
						</p>
					)}
				</div>
			</form>
		</div>
	);
};

export default Login;
