import { Player } from "@lottiefiles/react-lottie-player";

import LoadingAnimation from "../assets/Animation - 1706118370833.json";

const PageNotFound = () => {
  return (
    <>
      <div>404 PAGE NOT FOUND</div>
      <Player src={LoadingAnimation} loop autoplay className="size-64" />
    </>
  );
};

export default PageNotFound;
