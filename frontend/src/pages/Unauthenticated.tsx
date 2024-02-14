import { Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Unauthenticated = () => {
	const auth = useAuth();

	return !auth.user ? <Outlet /> : <p>You have already signed in..</p>;
};

export default Unauthenticated;
