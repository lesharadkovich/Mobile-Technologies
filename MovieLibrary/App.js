import React, { Component } from 'react';

import RootStack from './RootStack';

export default class App extends Component {
    state = {
        isReady: false,
        infoText: 'Looking for a closest node server...',
    };

    render() {
        return <RootStack />;
    }
}
