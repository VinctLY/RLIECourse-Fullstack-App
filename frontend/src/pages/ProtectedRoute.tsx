import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
	const auth = useAuth();

	console.log(auth)

	return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
