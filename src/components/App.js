import React from 'react';
import '../assets/css/App.css';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Landing from './Landing';
import Login from './Login';
import Loading from './common/Loading';
import SignUp from './SignUp';
import Home from './dashboard/Home';
import firebaseApp from '../config/firebaseConfig';
import history from './history';
import Pins from './Pins';

const PrivateRoute = ({ component: Component, userObj, isAuthed, ...rest }) => (
  <Route {...rest} render={function(props) {
    console.log(isAuthed, userObj,'PrivateRoute');
    return isAuthed === true
      ? <Component isAuthed={isAuthed} user={userObj} {...props} {...rest} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  }} />
)

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: null,
            auth: false
        }
        this.authListener = this.authListener.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    componentDidMount() {
        this.authListener();
    }
    
    authListener() {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('User authed');
                this.setState({ user: user, auth: true, loading:false });
            } else {
                console.log('No User authed');
                this.setState({ user: null, loading:false });
            }
        });
    }

    handleLogout(e) {
        e.preventDefault();
        firebaseApp.auth().signOut();
        this.setState({
            user: null,
            auth: false
        });
    }

    render() {
        let {auth, user, loading} = this.state;
        if (auth === false && user == null && loading === true) {
            console.log('App Loading');
            return <Loading />
        }
        console.log(user,'userapp');
        return (
            <div className="App">
                <BrowserRouter history={history}>
                    <Switch>
                        <Route exact path = '/' render={(props) => <Landing {...props} isAuthed={auth} />} />
                        <Route path = '/login' render={(props) => <Login {...props} isAuthed={auth} />} />
                        <Route path = '/signup' render={(props) => <SignUp {...props} isAuthed={auth} />} />
                        <PrivateRoute path='/home' userObj={user} onLogout={this.handleLogout} isAuthed={auth} component={Home} />
                        <PrivateRoute path='/pins' userObj={user} onLogout={this.handleLogout} isAuthed={auth} component={Pins} />
                        <Route render = {() => (<p>Not Found</p>) } />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
