/*eslint-env jquery*/
import React from 'react';
import {Redirect} from 'react-router-dom';
import * as firebase from 'firebase';
import firebaseApp from '../config/firebaseConfig';
import Button from '@material-ui/core/Button';

export const SignInWithGoogle = (props) => {
	console.log(props);
	const gAuth = () => {
	    let provider = new firebase.auth.GoogleAuthProvider();
	    firebaseApp.auth().signInWithPopup(provider).then((result) => {
	    	console.log(props.history,'gAuth history');
	    	props.history.push('/home');
	    }).catch((error) => props.gLoginError(error.message));
	}
	return (
		<Button
		    type="button"
		    fullWidth
		    variant="contained"
		    color="secondary"
		    id="glogin"
		    className={props.classes}
		    onClick={gAuth}>
		    Login with Google
		</Button>
	)
}