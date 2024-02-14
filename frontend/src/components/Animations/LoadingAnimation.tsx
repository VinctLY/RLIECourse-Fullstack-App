import { Player } from "@lottiefiles/react-lottie-player";

import src from "../../assets/LoadingAnimation.json";

interface LoadingAnimationProps {
	caption?: string;
	size?: string | "screen";
}

const LoadingAnimation = ({ caption, size, ...props }: LoadingAnimationProps) => {
	return (
		<div className="grid gap-1 justify-center items-center w-full h-screen">
			<div className="text-center">
				<Player src={src} className="size-32" style={{ margin: 0 }} autoplay loop {...props} />
				{caption && <p>{caption}</p>}
			</div>
		</div>
	);
};

export default LoadingAnimation;
