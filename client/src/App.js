import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';


import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import TaskDetails from './components/TaskDetails/TaskDetails';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <GoogleOAuthProvider clientId='639999822443-lgeeojeqb6s5lpieqp2epp6llfj5oq9s.apps.googleusercontent.com'>
            <BrowserRouter>
                <Container maxWidth="xl">
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={() => <Redirect to="/tasks" />} />
                        <Route path="/tasks" exact component={Home} />
                        <Route path="/tasks/search" exact component={Home} />
                        <Route path="/tasks/:id" exact component={TaskDetails} />
                        <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/tasks" />)}/>
                    </Switch>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;