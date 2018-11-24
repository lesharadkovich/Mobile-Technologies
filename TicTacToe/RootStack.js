import { createStackNavigator } from 'react-navigation';

import WelcomePage from './components/Welcome';
import GamePage from './components/Game';

export default createStackNavigator(
    {
        Welcome: WelcomePage,
        Game: GamePage,
    },
    {
        initialRouteName: 'Welcome',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#eaf1fb',
            },
            headerTintColor: '#006ef4',
        },
    },
);
