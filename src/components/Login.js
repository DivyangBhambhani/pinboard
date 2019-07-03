import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Loading from './common/Loading';
import firebaseApp from '../config/firebaseConfig';
import {Redirect} from 'react-router-dom';
import {SignInWithGoogle} from './SignInWithGoogle';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
    const classes = useStyles();
    
    const [emailLogin, setEmailLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [error, setError] = useState('')
    
    const handleEmailLogin = (e) => {
        setEmailLogin(e.target.value)
    }

    const handlePasswordLogin = (e) => {
        setPasswordLogin(e.target.value)
    }

    const login = (e) => {
        e.preventDefault();
        setLoading(true)
        firebaseApp.auth().signInWithEmailAndPassword(emailLogin, passwordLogin)
            .then((user)=>{
                console.log(user,'userlogin');
                setUser(user)
                setLoading(false)
                props.history.push('/home');
            }).catch((error) => {
                setLoading(false)
                setError(error.message)
                console.log(error,'login');
            });
    }


    const gLoginError = (message) => {
        setError(message)
    }

    const { from } = props.location.state || { from: { pathname: '/' } }
    if (props.isAuthed === true) {
      return (from.pathname == "/") ? <Redirect to="/home" /> : <Redirect to={from} />
    }

    return (
        <div>
        { loading === false ? 
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="emailLogin"
                            label="Email Address"
                            name="emailLogin"
                            value={emailLogin}
                            onChange={handleEmailLogin}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="passwordLogin"
                            label="Password"
                            type="password"
                            id="passwordLogin"
                            value={passwordLogin}
                            onChange={handlePasswordLogin}
                            autoComplete="current-password"
                        />

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        {error ? 
                            <div id="loginError" className="alert alert-danger">{error}</div> : ''
                        }
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={login}
                            >
                                Sign In
                            </Button>
                            </Grid>  
                            <Grid item xs={12} sm={6}>
                            <SignInWithGoogle gLoginError={gLoginError} classes={classes.submit} history={props.history}/>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                            </Grid>
                            <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            : <Loading />
        }
        </div>
  );
}

/* class Login extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        emailLogin: '',
        passwordLogin: '',
        loading: false,
        user: null,
        error: ''
      };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // googleLogin(e) {
    
    // e.preventDefault();
    // var provider = new firebase.auth.GoogleAuthProvider();
    // firebaseApp.auth().signInWithPopup(provider).then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   // var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   // var user = result.user;
    //   this.setState({
    //     user: result.user,
    //     loading:false,
    //   });
    //   this.props.history.push('/home');
    // }).catch((error) => {
    //   this.setState({ 
    //     loading: false,
    //     error: error.message
    //   })
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // The email of the user's account used.
      // var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // console.log(errorCode, errorMessage, email, credential);
    // });
  // }

  login = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    firebaseApp.auth().signInWithEmailAndPassword(this.state.emailLogin, this.state.passwordLogin)
        .then((user)=>{
            console.log(user,'userlogin');
            this.setState({
            user: user,
            loading:false,
            });
            this.props.history.push('/home');
        }).catch((error) => {
            this.setState({ 
                loading: false,
                error: error.message
            })
            console.log(error,'login');
        });
  }


  gLoginError = (message) => {
    this.setState({error: message});
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (this.props.isAuthed === true) {
      return (from.pathname == "/") ? <Redirect to="/home" /> : <Redirect to={from} />
    }
    return(
      <div>
      { this.state.loading === false ? 
          <SignIn 
            emailLogin={this.state.emailLogin} 
            passwordLogin={this.state.passwordLogin} 
            onChange={this.handleChange} 
            onSubmit={this.login}
            history={this.props.history}
            error={this.state.error}
            gLoginError={this.gLoginError}
            /> : <Loading />
      }
      </div>
    )
  }
}

export default Login; */