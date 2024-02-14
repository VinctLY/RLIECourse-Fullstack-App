import { useContext } from "react";

import { LoggedInContext } from "../contexts/AuthContext";;

export default function useAuth() {
	return useContext(LoggedInContext);
}
