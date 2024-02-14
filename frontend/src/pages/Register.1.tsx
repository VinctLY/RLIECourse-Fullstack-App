import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import useInput from "../hooks/useInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import AuthInput from "../components/AuthInput";
import ShowPassword from "../components/ShowPassword";
import { Password } from "./Register";

export const Register = () => {
	const [email, setEmail] = useInput("");
	const [password, setPassword] = useInput("");
	const [confirmationPassword, setConfirmationPassword] = useInput("");

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmationPassword, setShowConfirmationPassword] = useState<boolean>(false);

	const buttonSubmitRef = useRef<HTMLButtonElement>(null);

	const navigate = useNavigate();

	const isValidEmail = () => {
		if (validator.isEmail(email)) return null;
		else if (!validator.isEmpty(email))
			return <span className="text-red-600">Enter a valid email!</span>;
	};

	const passwordProp: Password = {
		length: password.length,
		score: validator.isStrongPassword(password, { returnScore: true }),
		alphaNumeric: validator.isAlphanumeric(password),
	};

	const isValidPassword = () => {
		if (passwordProp.length !== 0) {
			const strength = () => {
				if (passwordProp.score < 20) {
					return <b className="text-red-600">Weak</b>;
				} else if (passwordProp.score > 20 && passwordProp.score < 40) {
					return <b className="text-yellow-600">Medium</b>;
				} else if (passwordProp.score > 40) {
					return <b className="text-green-600">Strong</b>;
				}
			};

			return (
				<div className="grid">
					<div className="mb-4">Password Strength: {strength()}</div>
					<div className="flex items-center gap-1">
						{passwordProp.alphaNumeric ? "❌" : "✅"}
						<span>
							<b>Password</b> must contain <b>special character!</b>
						</span>
					</div>
					<div className="flex items-center gap-1">
						{password.length <= 12 ? "❌" : "✅"}{" "}
						<span>
							{" "}
							<b>Password</b> must be at least <b>12 characters long!</b>
						</span>
					</div>
				</div>
			);
		}

		return null;
	};

	const isValidConfirmationPassword = () => {
		if (!validator.isEmpty(confirmationPassword) && password !== confirmationPassword) {
			return <p className="text-red-600">Confirmation password must be the same as password!</p>;
		}

		return null;
	};

	const isFormSubmittable = () => {
		return (
			validator.isEmail(email) &&
			!passwordProp.alphaNumeric &&
			passwordProp.score > 40 &&
			password === confirmationPassword
		);
	};
	const [error, setError] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isFormSubmittable() && buttonSubmitRef.current)
			return (buttonSubmitRef.current.disabled = true);

		try {
			// await signUp(email, password);
			// navigate("/login");
		} catch (error: any) {
			setError(true);
		}
	};

	return (
		<div className="flex h-screen justify-center items-center">
			<form
				className="items-center m-4 flex h-fit w-[clamp(300px,100%,500px)] max-h-screen flex-col gap-16 rounded-lg border-t-8 border-t-primary-100 p-8 shadow-xl"
				onSubmit={handleSubmit}>
				<div className="grid w-full gap-1">
					<div className="flex items-center gap-3 text-2xl text-dark">
						<h1 className="text-2xl">Sign Up</h1>
						<FontAwesomeIcon icon={faRightToBracket} />
					</div>
					<span className="text-dark-50">Create your account</span>
				</div>
				<div className="flex w-full flex-col gap-8">
					<AuthInput
						value={email}
						onChange={setEmail}
						type="email"
						placeholder={"Enter an Email"}
						label={"email"}>
						{isValidEmail()}
					</AuthInput>
					<AuthInput
						value={password}
						onChange={setPassword}
						type={showPassword ? "text" : "password"}
						placeholder="Type a password"
						label="password">
						{isValidPassword()}
						<div className="absolute right-3 top-[35px] translate-y-1/2 grid justify-center items-center size-6 show_password-bubble">
							<ShowPassword show={showPassword} setShow={setShowPassword} />
						</div>
					</AuthInput>
					<AuthInput
						value={confirmationPassword}
						onChange={setConfirmationPassword}
						type={showConfirmationPassword ? "text" : "password"}
						placeholder="Confirm your password"
						label="Password Confirmation">
						{isValidConfirmationPassword()}
						<div className="absolute right-3 top-[35px] translate-y-1/2 grid justify-center items-center size-6 show_password-bubble">
							<ShowPassword show={showConfirmationPassword} setShow={setShowConfirmationPassword} />
						</div>
					</AuthInput>
				</div>
				<div className="flex w-full flex-col gap-[0.5em]">
					<p className="w-fit self-end">
						Already have an account? Click here to{" "}
						<Link to="/login" className="text-primary-100 underline underline-offset-2">
							Login
						</Link>
					</p>
					<button
						type="submit"
						className="w-full rounded-sm bg-primary-100 py-3 font-medium text-white shadow-md active:bg-primary-75 disabled:bg-primary-75"
						disabled={!isFormSubmittable()}
						ref={buttonSubmitRef}>
						Sign Up
					</button>
					{error && (
						<p className="text-red-600">Failed to create an account, please try again later!</p>
					)}
				</div>
			</form>
		</div>
	);
};
