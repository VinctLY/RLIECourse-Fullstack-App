import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	User,
} from "firebase/auth";
import { auth } from "../firebase";

export async function signUp(email: string, password: string) {
	return createUserWithEmailAndPassword(auth, email, password);
}

export async function signIn(email: string, password: string) {
	return signInWithEmailAndPassword(auth, email, password);
}

export async function getUser(callback: (user: User | null) => void) {
	return onAuthStateChanged(auth, (user) => {
		callback(user);
	});
}

export function getCurrentUser() {
	return auth.currentUser;
}
