import { PropsWithChildren } from "react";

interface AuthInputProps extends PropsWithChildren<{}> {
	inputState: string;
	setInputState: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type: React.HTMLInputTypeAttribute;
	label?: string;
	placeholder?: string;
}

import { useId, Children } from "react";

const AuthInput = (props: AuthInputProps) => {
	const label = props.label || "label";
	const placeholder = props.placeholder || "Placeholder..";

	const id = useId();

	return (
		<div className="grid gap-2 relative">
			<label htmlFor={id + label}>{label.split("")[0].toUpperCase() + label.slice(1)}:</label>
			<input
				type={props.type}
				placeholder={placeholder}
				id={id + label}
				value={props.inputState}
				onChange={props.setInputState}
				className="input-auth"
			/>
			{Children.map(props.children, (child) => child)}
		</div>
	);
};

export default AuthInput;
