import React, { useState } from "react";

export default function useInput<T>(
	initialValue: T
): [T, (e: React.ChangeEvent<HTMLInputElement> | T) => void] {
	const [input, setInput] = useState(initialValue);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | T): void => {
		if (e && typeof e === "object" && "target" in e) {
			return setInput(e.target.value as T);
		}

		setInput(e);
	};

	return [input, onChangeHandler];
}
