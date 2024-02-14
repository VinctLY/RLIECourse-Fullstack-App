import { PropsWithChildren } from "react";

interface AuthInputProps
	extends PropsWithChildren<{}>,
		React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

import { useId, Children } from "react";

const AuthInput = ({ children, ...props }: AuthInputProps) => {
	const label = props.label || "label";

	const id = useId();
	const labelId = label + id;

	return (
		<div className="relative grid gap-2 text-dark">
			<label htmlFor={labelId}>{label.split("")[0].toUpperCase() + label.slice(1)}:</label>
			<input {...props} id={labelId} className={`input-auth bg-slate-100 ${props.className}`} />
			{Children.map(children, (child) => child)}
		</div>
	);
};

export default AuthInput;
