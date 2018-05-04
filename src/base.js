import Rebase from 're-base'
import firebase from 'firebase'

var config = {
	apiKey: "AIzaSyDzFVj4AGV4Gmfq_OiC6vjGM5_e6538vEE",
	authDomain: "catch-of-the-day-c6c01.firebaseapp.com",
	databaseURL: "https://catch-of-the-day-c6c01.firebaseio.com"
}
const base = Rebase.createClass(firebase.initializeApp(config).database())

export { firebase }

export default base