import React, {Component} from 'react';

import {Provider} from 'react-redux';

import Router from './app/config/routes' //./app/index
import myStore from './app/redux/store'

export default class App extends Component {
    render() {
        return (
            <Provider store= {myStore}>
                <Router/>
            </Provider>
        );
    }
}