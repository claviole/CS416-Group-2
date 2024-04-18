import React, { useEffect, useState } from "react";
import {
	auth,
	signInWithGoogle,
	signOutUser,
	onAuthStateChanged,
} from "../../firebaseConfig"; // Adjust the path as necessary

const LoginButton = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setIsLoggedIn(!!user);
		});

		// Cleanup the listener on component unmount
		return () => unsubscribe();
	}, []);

	const handleAuthAction = async () => {
		try {
			if (isLoggedIn) {
				await signOutUser();
			} else {
				await signInWithGoogle();
			}
		} catch (error) {
			console.error(isLoggedIn ? "Logout error" : "Login error", error);
		}
	};

	return (
		<button onClick={handleAuthAction}>
			{isLoggedIn ? "Logout" : "Login with Google"}
		</button>
	);
};

export default LoginButton;
