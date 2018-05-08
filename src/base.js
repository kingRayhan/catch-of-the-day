import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyDzFVj4AGV4Gmfq_OiC6vjGM5_e6538vEE",
	authDomain: "catch-of-the-day-c6c01.firebaseapp.com",
	databaseURL: "https://catch-of-the-day-c6c01.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;