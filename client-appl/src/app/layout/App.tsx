import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Redirect, Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/Errors/TestErrors';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/Errors/NotFound';
import { Router } from 'react-router-dom'
import history from './History'



function App() {

    return (
        <>
            <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
            <Router history={history }>
            <Route exact path='/' component={HomePage} />

            <Route
                path={'/(.+)'}
                render={() => (
                    <>
                        <NavBar />
                        <Container style={{ marginTop: '7em' }}>
                            <Route exact path='/activities' component={ActivityDashboard} />
                            <Route path='/activities/:id' component={ActivityDetails} />
                            <Route path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                            <Route path='/errors' component={TestErrors} />
                            <Route path='/not-found' component={NotFound} />
                            <Route path='*'>
                                <Redirect to="/not-found" />
                            </Route>
                        </Container>
                    </>
                )}
            />
            </Router>
        </>
    );
}

export default observer(App);
