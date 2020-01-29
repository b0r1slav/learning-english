import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ExercisesNav from './exercises/ExercisesNav';
import Exercises from './exercises/Exercises';
import Home from './Home';
import Settings from './common/settings/Settings';
import Expressions from './expressions/Expressions';
import LearnWords from './words/LearnWords';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/exercises" component={ExercisesNav} />
        <Route path="/exercises/:lesson" component={Exercises} />
        <Route path="/settings" component={Settings} />
        <Route path="/expressions" component={Expressions} />
        <Route path="/learn-words" component={LearnWords} />
    </Switch>
);

export default Routes;