import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ExercisesNav from './exercises/ExercisesNav';
import Exercises from './exercises/Exercises';
import Home from './Home';
import Settings from './common/settings/Settings';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/exercises" component={ExercisesNav} />
        <Route path="/exercises/:lesson" component={Exercises} />
        <Route path="/settings" component={Settings} />
    </Switch>
);

export default Routes;