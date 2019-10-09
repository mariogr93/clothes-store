import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyCoJAsZGzALHea91_5Pt1-E_420ruZbwic",
	authDomain: "store-db-2c35f.firebaseapp.com",
	databaseURL: "https://store-db-2c35f.firebaseio.com",
	projectId: "store-db-2c35f",
	storageBucket: "",
	messagingSenderId: "853839152850",
	appId: "1:853839152850:web:e38a1c71e7c9c02d998f0b",
	measurementId: "G-DEPPBNLW6Z"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log("error creating user", error.message);
		}
	}

	return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
