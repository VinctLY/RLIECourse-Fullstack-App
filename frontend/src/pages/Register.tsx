import { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";

import useInput from "../hooks/useInput";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import AuthInput from "../components/AuthInput";
import ShowPassword from "../components/ShowPassword";

interface Password {
	length: number;
	score: number;
	alphaNumeric: boolean;
	submittable: () => boolean;
}

const Register = () => {
	const [email, setEmail] = useInput("");
	const [password, setPassword] = useInput("");
	const [confirmationPassword, setConfirmationPassword] = useInput("");

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmationPassword, setShowConfirmationPassword] = useState<boolean>(false);

	const isValidEmail = () => {
		if (validator.isEmail(email)) return null;
		else if (!validator.isEmpty(email))
			return <span className="text-red-600">Enter a valid email!</span>;
	};

	const passwordProp: Password = {
		length: password.length,
		score: validator.isStrongPassword(password, { returnScore: true }),
		alphaNumeric: validator.isAlphanumeric(password),
		submittable: function () {
			return !this.alphaNumeric && this.score > 40 && password === confirmationPassword;
		},
	};

	const isValidPassword = () => {
		if (passwordProp.length !== 0) {
			const strength = () => {
				if (passwordProp.score < 20) {
					return <span className="text-red-600">Weak</span>;
				} else if (passwordProp.score > 20 && passwordProp.score < 40) {
					return <span className="text-yellow-600">Medium</span>;
				} else if (passwordProp.score > 40) {
					return <span className="text-green-600">Strong</span>;
				}
			};

			return (
				<div className="grid">
					<div className="mb-4">Password Strength: {strength()}</div>
					<p>
						{passwordProp.alphaNumeric ? "❌" : "✅"} <b>Password</b> must contain{" "}
						<b>special character!</b>
					</p>
					<p>
						{password.length <= 12 ? "❌" : "✅"} <b>Password</b> must be at least{" "}
						<b>12 characters long!</b>
					</p>
				</div>
			);
		}

		return null;
	};

	return (
		<div className="flex justify-center items-center h-screen w-screen">
			<form
				className="flex flex-col w-[clamp(300px,100%,500px)] max-h-fit items-center gap-16 p-8 m-4 shadow-xl rounded-lg border-t-primary-100 border-t-8"
				onSubmit={(e) => {
					e.preventDefault();
				}}>
				<div className="grid gap-1 w-full">
					<div className="text-2xl flex items-center gap-3 text-dark">
						<h1 className="text-2xl">Sign Up</h1>
						<FontAwesomeIcon icon={faRightToBracket} />
					</div>
					<span className="text-dark-50">Create your account</span>
				</div>
				<div className="flex flex-col gap-8 w-full">
					<AuthInput
						inputState={email}
						setInputState={setEmail}
						type="email"
						placeholder={"Enter an Email"}
						label={"email"}>
						{isValidEmail()}
					</AuthInput>
					<AuthInput
						inputState={password}
						setInputState={setPassword}
						type={showPassword ? "text" : "password"}
						placeholder="Type a password"
						label="password">
						{isValidPassword()}
						<div className="absolute top-[35px] translate-y-1/2 right-3">
							<ShowPassword show={showPassword} setShow={setShowPassword} />
						</div>
					</AuthInput>
					<AuthInput
						inputState={confirmationPassword}
						setInputState={setConfirmationPassword}
						type={showConfirmationPassword ? "text" : "password"}
						placeholder="Confirm your password"
						label="Password Confirmation">
						<div className="absolute top-[35px] translate-y-1/2 right-3">
							<ShowPassword show={showConfirmationPassword} setShow={setShowConfirmationPassword} />
						</div>
					</AuthInput>
				</div>
				<div className="w-full flex flex-col gap-[0.5em]">
					<p className="self-end w-fit">
						Already have an account? Click here to{" "}
						<Link to="/login" className="text-primary-100 underline underline-offset-2">
							Login
						</Link>
					</p>
					<button
						type="submit"
						className="py-3 font-medium bg-primary-100 w-full rounded-sm text-white shadow-md active:bg-primary-75 disabled:bg-primary-75"
						disabled={!passwordProp.submittable()}>
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
