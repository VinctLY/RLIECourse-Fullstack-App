import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface ShowPasswordProps {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	className?: string;
}

const ShowPassword = (props: ShowPasswordProps) => {
	return (
		<FontAwesomeIcon
			icon={props.show ? faEye : faEyeSlash}
			className={`cursor-pointer text-dark-50 active:text-dark ${props.className}`}
			onMouseDown={() => {
				props.setShow((state) => (state = true));
			}}
			onMouseUp={() => {
				setTimeout(() => {
					props.setShow((state) => (state = false));
				}, 500);
			}}></FontAwesomeIcon>
	);
};

export default ShowPassword;
