import React, { useEffect, useState } from "react";
import { User } from "firebase/auth";

import { getUser } from "../utils/firebaseAuth";

import LoadingAnimation from "../components/Animations/LoadingAnimation";

interface AuthContext {
	user: User | null;
}

export const LoggedInContext = React.createContext<AuthContext>({
	user: null,
});

const AuthContext = ({ children }: React.PropsWithChildren) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const value = {
		user,
		loading,
	};

	useEffect(() => {
		async function userListener() {
			try {
				const unsubscribe = await getUser((currentUser) => {
					setUser(currentUser);
					setLoading(false);
				});

				return unsubscribe;
			} catch (error: any) {
				console.log(error.message);
				setLoading(false);
			}
		}

		userListener();
	}, []);

	if (loading) return <LoadingAnimation caption="Please wait.." />;

	return <LoggedInContext.Provider value={value}>{children}</LoggedInContext.Provider>;
};

export default AuthContext;
