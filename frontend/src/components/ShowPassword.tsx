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
			className={`cursor-pointer ${props.className}`}
			onMouseDown={() => {
				props.setShow(!props.show);
			}}
			onMouseUp={() => {
				setTimeout(() => {
					props.setShow(!props.show);
				}, 500);
			}}></FontAwesomeIcon>
	);
};

export default ShowPassword;
