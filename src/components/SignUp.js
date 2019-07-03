import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as firebase from 'firebase';
import firebaseApp from '../config/firebaseConfig';
import Loading from './common/Loading';
import {Redirect} from 'react-router-dom';
import {SignInWithGoogle} from './SignInWithGoogle';
// import PropTypes from 'prop-types';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
    const classes = useStyles();
    
    const [emailSignup, setEmailSignup] = useState('')
    const [passwordSignup, setPasswordSignup] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [error, setError] = useState('')
    const { from } = props.location.state || { from: { pathname: '/' } }

    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleChangeLastName = (e) => {
        setLastName(e.target.value)
    }

    const handleChangeEmailSignup = (e) => {
        setEmailSignup(e.target.value)
    }

    const handleChangePasswordSignup = (e) => {
        setPasswordSignup(e.target.value)
    }
    
    const signup = (e) => {
        e.preventDefault()
        setLoading(true)
        firebaseApp.auth().createUserWithEmailAndPassword(emailSignup, passwordSignup)
        .then((user) => {
            firebase.auth().currentUser.updateProfile({
              displayName: `${firstName} ${lastName}`,
            }).then((user) => {
              props.history.push('/home')
            }).catch(function(error) {
              console.log(error);
            });
        }).catch((error) => {
            setLoading(false)
            setError(error.message)
        })
    }
    
    const gLoginError = (message) => {
        setError(message)
    }

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
                    Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                value={firstName}
                                onChange={handleChangeFirstName}
                                autoFocus
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                value={lastName}
                                onChange={handleChangeLastName}
                                autoComplete="lname"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="emailSignup"
                                label="Email Address"
                                name="emailSignup"
                                value={emailSignup}
                                onChange={handleChangeEmailSignup}
                                autoComplete="email"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="passwordSignup"
                                label="Password"
                                type="password"
                                id="passwordSignup"
                                value={passwordSignup}
                                onChange={handleChangePasswordSignup}
                                autoComplete="current-password"
                            />
                            </Grid>
                        </Grid>
                        {error ?
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <div id="loginError" className="alert alert-danger border-danger mb-0 blink-border">{error}</div>
                            </Grid>
                        </Grid> : ''
                        }
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={signup}
                            >
                                Sign Up
                            </Button>
                            </Grid>  
                            <Grid item xs={12} sm={6}>
                            <SignInWithGoogle gLoginError={gLoginError} classes={classes.submit} history={props.history}/>
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end">
                        <Grid item>
                        <Link href="/login" variant="body2">
                            Already have an account? Sign in
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

/* SignUp.propTypes = {
  emailSignup: PropTypes.string.isRequired,
  passwordSignup: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
} */

/* class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      emailSignup: '',
      passwordSignup: '',
      firstName: '',
      lastName: '',
      loading: false,
      user: null,
      error: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  signup =(e) => {
    e.preventDefault();
    this.setState({loading: true});
    firebaseApp.auth().createUserWithEmailAndPassword(this.state.emailSignup, this.state.passwordSignup)
    .then((user) => {
        firebase.auth().currentUser.updateProfile({
          displayName: `${this.state.firstName} ${this.state.lastName}`,
        }).then((user) => {
          this.props.history.push('/home')
        }).catch(function(error) {
          console.log(error);
        });
    }).catch((error) => {
        this.setState({ 
          loading: false,
          error: error.message
        })
      })
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
        <SignUpForm
          emailSignup={this.state.emailSignup} 
          passwordSignup={this.state.passwordSignup}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          onChange={this.handleChange} 
          onSubmit={this.signup}
          history={this.props.history}
          error={this.state.error}
          gLoginError={this.gLoginError}
          /> : <Loading />
      }
      </div>
    )
  }
} */