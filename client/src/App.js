import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
 
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

const App = () => {

    return (
        <GoogleOAuthProvider clientId='639999822443-lgeeojeqb6s5lpieqp2epp6llfj5oq9s.apps.googleusercontent.com'>
            <BrowserRouter>
                <Container maxwidth="lg">
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/auth" exact component={Auth}/>
                    </Switch>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;